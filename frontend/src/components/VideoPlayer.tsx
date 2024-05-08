import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "./misc/InputField";
import axios from "axios";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRightToBracket,
	faPlus,
} from "@fortawesome/free-solid-svg-icons";
import YouTubePlayer from "youtube-player";
import { VideoElement_Type, VideoThumbnail_Type } from "../ts/Types";
import { YouTubePlayer as YTPlayer } from "youtube-player/dist/types";
import { io } from "socket.io-client";

const serverURL = "http://localhost:5000/";
const userUpdateLink = `${serverURL}users/update`;

const VideoPlayer = () => {
	const s_loc = useLocation().state;
	const {
		s_id,
		s_title,
		s_description,
		s_channelTitle,
		s_channelThumbnail,
		s_tags,
		s_topicDetails,
		s_publishedAt,
		s_channelId,
	} = s_loc
		? s_loc
		: {
				s_id: undefined,
				s_title: undefined,
				s_description: undefined,
				s_channelTitle: undefined,
				s_channelThumbnail: undefined,
				s_tags: undefined,
				s_topicDetails: undefined,
				s_publishedAt: undefined,
				s_channelId: undefined,
		  };

	const socket = useRef(io("http://localhost:5000"));

	const [id, setId] = useState<string>(s_id);
	const [title, setTitle] = useState<string>(s_title);
	const [description, setDescription] = useState<string>(s_description);
	const [channelTitle, setChannelTitle] = useState<string>(s_channelTitle);
	const [channelThumbnail, setChannelThumbnail] =
		useState<VideoThumbnail_Type>(s_channelThumbnail);
	const [tags, setTags] = useState<string[]>(s_tags);
	const [topicDetails, setTopicDetails] = useState<string[]>(s_topicDetails);
	const [publishedAt, setPublishedAt] = useState<string>(s_publishedAt);
	const [channelId, setchannelId] = useState<string>(s_channelId);
	const [time, setTime] = useState<number>(-1);
	const [liveTime, setLiveTime] = useState<number>(-1);

	const [player, setPlayer] = useState<YTPlayer>();
	const [roomCode, setRoomCode] = useState<string>("");
	const isJoinedRoom = useRef<boolean>(false);

	const [chatInput, setChatInput] = useState<string>("");
	const [chatList, setChatList] = useState<
		{ username: string; message: string }[]
	>([]);

	useEffect(() => {
		axios
			.post(userUpdateLink, {
				sub: sessionStorage.getItem("sub"),
				channel: channelId,
				tags: tags,
				topics: topicDetails
					? (topicDetails as string[]).map((topicDetail) => {
							if (topicDetail.length > 30)
								return topicDetail.substring(30);
							return topicDetail;
					  })
					: topicDetails,
			})
			.then()
			.catch((_) => {});
	}, [tags, topicDetails, channelId]);

	useEffect(() => {
		const player = YouTubePlayer("video-player", {
			playerVars: {
				controls: isJoinedRoom.current ? 0 : 1,
			},
		});
		setPlayer(player);

		if (id) player.loadVideoById(id);

		return () => {
			player?.destroy();
		};
	}, [isJoinedRoom.current]);

	useEffect(() => {
		player?.loadVideoById(id);
	}, [id]);

	useEffect(() => {
		if (isJoinedRoom.current) {
			player?.getCurrentTime().then((time) => {
				if (Math.abs(time - liveTime) > 2) {
					console.log(
						"adjusting time",
						time,
						liveTime,
						Math.abs(time - liveTime)
					);
					player
						?.seekTo(liveTime, true)
						.then(() => player.playVideo());
				}
			});
		} else {
			player?.seekTo(time + 2, true).then(() => player.playVideo());
		}
	}, [player, liveTime, time]);

	useEffect(() => {
		player?.on("stateChange", (e) => {
			if (isJoinedRoom.current) return;

			if (e.data === 1) {
				socket.current.emit("play", roomCode);
			} else if (e.data === 2 || e.data === 3) {
				socket.current.emit("pause", roomCode);
			}
		});
	}, [player, roomCode]);

	const [intervalFunc, setIntervalFunc] = useState<NodeJS.Timer>();
	useEffect(() => {
		if (isJoinedRoom.current && intervalFunc) clearInterval(intervalFunc);

		if (roomCode !== "" && !isJoinedRoom.current) {
			if (intervalFunc) clearInterval(intervalFunc);

			const interval = setInterval(async () => {
				const time = await player?.getCurrentTime();
				if (roomCode !== "") {
					socket.current.emit("timeline", roomCode, time);
				}
			}, 1000);
			setIntervalFunc(interval);
		}
		if (isJoinedRoom.current) {
			if (intervalFunc) clearInterval(intervalFunc);

			socket.current.on("liveTime", (lt) => {
				setLiveTime(lt);
			});

			const interval = setInterval(async () => {
				socket.current.emit("getLiveTime", roomCode);
			}, 2000);
			setIntervalFunc(interval);
		}
	}, [roomCode, isJoinedRoom.current]);

	useEffect(() => {
		if (isJoinedRoom.current) {
			socket.current.on("play", () => {
				player?.playVideo();
			});

			socket.current.on("pause", () => {
				player?.pauseVideo();
			});
		}

		socket.current.on("chat recieve", (chatPacket) => {
			setChatList([chatPacket, ...chatList]);
		});
	});

	const onCreateRoom = () => {
		const roomId = crypto.randomUUID();
		setRoomCode(roomId);

		socket.current.emit("create", roomId, {
			id,
			title,
			description,
			channelTitle,
			channelThumbnail,
			tags,
			topicDetails,
			publishedAt,
			channelId,
		});
	};

	const onJoinRoom = async () => {
		if (roomCode === "") return;

		socket.current.emit("join", roomCode);

		const promise = new Promise((resolve, reject) => {
			socket.current.on("joined", (videoElem) => {
				if (videoElem === undefined) reject(undefined);
				resolve(videoElem);
			});
		});
		const videoElem = (await promise) as VideoElement_Type & {
			time: number;
		};

		if (!videoElem) {
			console.log("Room Code incorrect");
			return;
		}

		isJoinedRoom.current = true;

		setId(videoElem.id);
		setTitle(videoElem.title);
		setDescription(videoElem.description);
		setChannelTitle(videoElem.channelTitle);
		setChannelThumbnail(videoElem.channelThumbnail);
		setTags(videoElem.tags);
		setTopicDetails(videoElem.topicDetails);
		setPublishedAt(videoElem.publishedAt);
		setchannelId(videoElem.channelId);
		setTime(videoElem.time);
	};

	const onChatSubmit = () => {
		if (!roomCode) {
			setChatInput("");
			return;
		}
		socket.current.emit(
			"chat broadcast",
			roomCode,
			sessionStorage.getItem("name"),
			chatInput
		);
	};

	return (
		<div className="pt-[8rem] min-h-[calc(50vh+6rem)] p-4 md:px-16 grid md:grid-cols-3 gap-8">
			<div className="md:col-span-2 min-h-full relative overflow-hidden">
				<div
					id="video-player"
					className="h-[50vh] md:h-[70vh] w-full rounded"
				></div>
				<section className="py-8 flex flex-col gap-4">
					<h1 className="text-2xl text-amber-600 font-semibold">
						{title}
					</h1>
					<span className="flex justify-between items-center text-sm font-semibold text-gray-400">
						<span className="flex gap-1 items-center">
							<section className="rounded-full overflow-hidden aspect-square w-max h-max transition p-1">
								<img
									className="w-10 rounded-full"
									src={channelThumbnail?.url}
									alt=""
								/>
							</section>
							<p className="p-1">{channelTitle}</p>
						</span>
						<p className="">
							{new Date(publishedAt).toDateString()}{" "}
							{new Date(publishedAt).toTimeString()}
						</p>
					</span>
					<span>
						<p className="text-md text-gray-500">{description}</p>
					</span>
				</section>
				<section className="grid md:grid-cols-2 gap-8 text-gray-400 font-medium">
					<span className="bg-white-transp p-10 rounded flex flex-col gap-4">
						{tags && tags[0] && (
							<p>
								{"#"}
								{tags[0].replaceAll(" ", "_")}
							</p>
						)}
						{tags && tags[1] && (
							<p>
								{"#"}
								{tags[1].replaceAll(" ", "_")}
							</p>
						)}
						{tags && tags[2] && (
							<p>
								{"#"}
								{tags[2].replaceAll(" ", "_")}
							</p>
						)}
					</span>
					<span className="bg-white-transp p-10 rounded flex items-center">
						{topicDetails && topicDetails[0] && (
							<p className="capitalize">
								{topicDetails[0].length > 30
									? topicDetails[0]
											.replaceAll("_", " ")
											.substring(30)
									: topicDetails[0].replaceAll("_", " ")}
							</p>
						)}
					</span>
				</section>
			</div>
			<div className="md:col-start-3 max-h-full">
				<section className="pb-4 flex flex-col gap-2">
					<span className="flex gap-4">
						<InputField
							id="roomCode"
							type="text"
							placeholder="Room Code..."
							value={roomCode}
							setterFunction={setRoomCode}
						/>
						<button
							className="group px-6 py-2 border border-white-transp rounded transition hover:border-amber-600 hover:text-amber-600"
							onClick={async (e) => {
								e.preventDefault();
								await onJoinRoom();
							}}
						>
							<TranslateHoverElement
								className="h-6"
								elementInsideClassname="gap-3"
								elementInside={
									<>
										<FontAwesomeIcon
											icon={faArrowRightToBracket}
										/>
										Join&nbsp;Room
									</>
								}
							/>
						</button>
					</span>
					<button
						className="group px-6 py-2 w-full border border-white-transp rounded transition hover:border-amber-600 hover:text-amber-600"
						onClick={(e) => {
							e.preventDefault();
							onCreateRoom();
						}}
					>
						<TranslateHoverElement
							className="h-6 items-center"
							elementInsideClassname="gap-3"
							elementInside={
								<>
									<FontAwesomeIcon icon={faPlus} />
									Create&nbsp;Room
								</>
							}
						/>
					</button>
				</section>
				<form
					className="max-h-full bg-gradient-to-b to-black from-white-transp rounded pt-8 px-4"
					onSubmit={(e) => {
						e.preventDefault();
						onChatSubmit();
						setChatInput("");
					}}
				>
					<InputField
						id="chat"
						type="text"
						placeholder="Send Chat..."
						value={chatInput}
						setterFunction={setChatInput}
					/>
					<p className="text-xs font-medium text-gray-600 -mt-4 text-right">
						Be respectful guys!
					</p>
					<ul className="max-h-[calc(100vh-6rem)] overflow-y-auto flex flex-col gap-4 mt-6 px-4">
						{chatList.map((elem) => (
							<li>
								<span className="text-xs font-light">
									{elem.username ? elem.username : "unknown"}
								</span>
								<br />
								<span className="text-xl">{elem.message}</span>
							</li>
						))}
					</ul>
				</form>
			</div>
		</div>
	);
};

export default VideoPlayer;
