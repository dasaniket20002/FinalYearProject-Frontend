import React, { useCallback, useEffect, useRef, useState } from "react";
import InputField from "./misc/InputField";
import axios from "axios";
import LoadingIcon from "./misc/LoadingIcon";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import {
	Home_HomeProps,
	MandatoryParameterlessFunction,
	VideoBrowser_Type,
	VideoElement_Type,
	VideosResponse_Type,
} from "../ts/Types";
import { checkSubsetForVideos, convertYTDuration } from "../ts/Utils";
import { Link } from "react-router-dom";

const serverURL = "http://localhost:5000/";
const apiCalls = {
	trending: serverURL + "youtube/trending",
	trendingPage: serverURL + "youtube/trending/page",
	search: serverURL + "youtube/search",
	searchPage: serverURL + "youtube/search/page",
	getRecommendations: serverURL + "/youtube/getAllRecommendations",
};

const Home = ({ LinkToVideoPlayer }: Home_HomeProps) => {
	const access_token = sessionStorage.getItem("access_token");
	const token_type = sessionStorage.getItem("token_type");
	const name = sessionStorage.getItem("name")
		? sessionStorage.getItem("name")
		: "Guest";

	const videoResponse = useRef<VideosResponse_Type>();
	const videoListKind = useRef<string>("youtube#videoListResponse");
	const videosList = useRef<VideoElement_Type[]>();
	const [search, setSearch] = useState<string>("");

	const [isLoading, setLoading] = useState<boolean>(access_token !== null);

	const processVideoResponse = () => {
		if (videoResponse.current?.kind !== videoListKind.current) {
			videosList.current = [];
		}
		videoListKind.current = videoResponse.current?.kind as string;

		if (videoResponse.current?.video_list)
			if (
				videosList.current &&
				!checkSubsetForVideos(
					videosList.current,
					videoResponse.current.video_list
				)
			)
				videosList.current = videosList.current.concat(
					videoResponse.current.video_list
				);
			else videosList.current = videoResponse.current.video_list;
	};

	const fetchVideos = (callLink?: string, params?: any) => {
		setLoading(true);

		if (params) {
			params["accessToken"] = access_token;
			params["tokenType"] = token_type;
		} else {
			params = {
				accessToken: access_token,
				tokenType: token_type,
			};
		}

		axios
			.get(callLink ? callLink : apiCalls.trending, {
				params: params,
			})
			.then((res) => {
				videoResponse.current = res.data as VideosResponse_Type;
				processVideoResponse();
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};

	const loadMoreVideos = () => {
		if (
			isLoading ||
			(videosList.current && videosList.current.length > 120)
		)
			return;

		if (videoListKind.current === "youtube#videoListResponse")
			fetchVideos(apiCalls.trendingPage, {
				pageToken: videoResponse.current?.nextPageToken,
			});
		else if (videoListKind.current === "youtube#searchListResponse")
			fetchVideos(apiCalls.searchPage, {
				pageToken: videoResponse.current?.nextPageToken,
				q: search,
			});
	};

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const scrollHeight = document.documentElement.scrollHeight;
		const clientHeight = document.documentElement.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight - 50) {
			loadMoreVideos();
		}
	};

	useEffect(() => {
		if (access_token) {
			fetchVideos(apiCalls.trending);
			// fetchVideos(apiCalls.trending);
		}

		// const params = {
		// 	access_token: access_token,
		// 	token_type: token_type,
		// };
		// axios
		// 	.post(
		// 		apiCalls.trending,
		// 		{ sub: sessionStorage.getItem("sub") },
		// 		{ params: params }
		// 	)
		// 	.then((res) => {
		// 		console.log(res.data);
		// 	});

		// eslint-disable-next-line
	}, [access_token]);

	useEffect(() => {
		window.onscroll = handleScroll;
		return () => {
			window.onscroll = null; // Remove listener on cleanup
		};
	}, [handleScroll]);

	return (
		<div className="pt-[6rem] min-h-[calc(50vh+6rem)]">
			<form
				className="w-full px-4 flex justify-center"
				onSubmit={(e) => {
					e.preventDefault();
					videosList.current = [];
					fetchVideos(apiCalls.search, { q: search });
				}}
			>
				<InputField
					id="search"
					type="text"
					placeholder="Search..."
					value={search}
					setterFunction={setSearch}
					className="text-gray-200 w-full md:w-1/2"
				/>
			</form>

			<p className="px-4 md:px-32 py-1 text-gray-500 text-xl">
				Hi <span className="font-dancing-script">{name}!</span>
			</p>
			<h1 className="px-4 md:px-32 py-1 text-gray-400 font-semibold text-2xl flex items-center">
				BROWSE&nbsp;•&nbsp;
				<span className="text-sm font-medium">
					{videoListKind.current === "youtube#searchListResponse"
						? "Search"
						: videoListKind.current === "youtube#videoListResponse"
						? "Trending"
						: "Trending"}
				</span>
			</h1>

			{videosList.current && videosList.current.length !== 0 ? (
				<VideoBrowser
					elements={videosList.current}
					LinkToVideoPlayer={LinkToVideoPlayer}
				/>
			) : (
				access_token === null && <TryFetchAgain method={fetchVideos} />
			)}

			{isLoading && <LoadingIcon className="text-9xl" />}
		</div>
	);
};

const TryFetchAgain = ({ method }: MandatoryParameterlessFunction) => {
	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<h1 className="text-gray-600">You are not Signed In.</h1>
			<button
				className="group px-6 py-2 border border-white-transp rounded transition hover:border-amber-600 hover:text-amber-600"
				onClick={() => method()}
			>
				<TranslateHoverElement
					className="h-6"
					elementInsideClassname="gap-3"
					elementInside={
						<>
							<FontAwesomeIcon icon={faRotateRight} />
							Fetch
						</>
					}
				/>
			</button>
		</div>
	);
};

const VideoBrowser = ({
	elements,
	LinkToVideoPlayer,
}: VideoBrowser_Type & Home_HomeProps) => {
	return (
		<div className="mx-4 my-12 md:mx-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-16 py-4">
			{elements.map((item, index) => (
				<VideoElement
					key={index}
					channelId={item.channelId}
					channelTitle={item.channelTitle}
					channelThumbnail={item.channelThumbnail}
					publishedAt={item.publishedAt}
					description={item.description}
					defaultAudioLanguage={item.defaultAudioLanguage}
					defaultLanguage={item.defaultLanguage}
					definition={item.definition}
					duration={item.duration}
					id={item.id}
					kind={item.kind}
					tags={item.tags}
					thumbnail={item.thumbnail}
					title={item.title}
					topicDetails={item.topicDetails}
					LinkToVideoPlayer={LinkToVideoPlayer}
				/>
			))}
		</div>
	);
};

const VideoElement = ({
	channelId,
	channelTitle,
	channelThumbnail,
	publishedAt,
	description,
	defaultAudioLanguage,
	defaultLanguage,
	definition,
	duration,
	id,
	kind,
	tags,
	thumbnail,
	title,
	topicDetails,
	LinkToVideoPlayer,
}: VideoElement_Type & Home_HomeProps) => {
	return (
		<Link
			to={LinkToVideoPlayer}
			state={{
				id,
				title,
				description,
				channelTitle,
				channelThumbnail,
				tags,
				topicDetails,
				publishedAt,
				channelId,
			}}
		>
			<section className="relative flex flex-col gap-2 p-2 pb-6 items-center group rounded transition cursor-pointer hover:bg-white-transp hover:scale-110">
				<section className="relative rounded aspect-video overflow-hidden">
					<img
						className="w-96 -my-[10%] scale-105"
						src={thumbnail.url}
						alt=""
					/>
					<p className="absolute uppercase text-white text-xs font-bold bottom-2 left-2 py-1 px-2 bg-blur-transp rounded">
						{definition}
					</p>
					<p className="absolute text-white text-xs font-bold bottom-2 right-2 py-1 px-2 bg-blur-transp rounded">
						{convertYTDuration(duration)}
					</p>
				</section>
				<h1 className="relative font-medium line-clamp-2 w-full px-2 py-1 rounded transition group-hover:bg-white-transp">
					{title}
				</h1>
				<section className="px-2 flex gap-3 w-full items-center">
					<section className="rounded-full overflow-hidden aspect-square w-max h-max transition p-1 group-hover:bg-white-transp">
						<img
							className="w-6 rounded-full"
							src={channelThumbnail.url}
							alt=""
						/>
					</section>
					<p className="text-xs font-semibold p-1 group-hover:bg-white-transp rounded">
						{channelTitle}
					</p>
				</section>
				<p className="text-xs font-medium text-right text-gray-500 w-full px-2">
					{new Date(publishedAt).toDateString()}
				</p>
			</section>
		</Link>
	);
};

export default Home;
