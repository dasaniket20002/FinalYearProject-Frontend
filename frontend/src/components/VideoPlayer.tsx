import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InputField from "./misc/InputField";
import axios from "axios";

const serverURL = "http://localhost:5000/";
const userUpdateLink = `${serverURL}users/update`;

const VideoPlayer = () => {
	const {
		id,
		title,
		description,
		channelTitle,
		channelThumbnail,
		tags,
		topicDetails,
		publishedAt,
		channelId,
	} = useLocation().state;

	const [chatInput, setChatInput] = useState<string>("");

	useEffect(() => {
		axios.post(userUpdateLink, {
			sub: sessionStorage.getItem("sub"),
			channel: channelId,
			tags: tags,
			topics: topicDetails,
		}).then().catch(err => {});
	}, [tags, topicDetails, channelId]);

	return (
		<div className="pt-[8rem] min-h-[calc(50vh+6rem)] p-4 md:px-16 grid md:grid-cols-3 gap-8">
			<div className="md:col-span-2 min-h-full relative overflow-hidden">
				<iframe
					title={title}
					className="h-[50vh] md:h-[70vh] w-full rounded"
					src={`https://www.youtube.com/embed/${id}?autoplay=0&mute=0&controls=1&loop=0&rel=0`}
				/>
				<section className="py-8 flex flex-col gap-4">
					<h1 className="text-2xl text-amber-600 font-semibold">
						{title}
					</h1>
					<span className="flex justify-between items-center text-sm font-semibold text-gray-400">
						<span className="flex gap-1 items-center">
							<section className="rounded-full overflow-hidden aspect-square w-max h-max transition p-1">
								<img
									className="w-10 rounded-full"
									src={channelThumbnail.url}
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
						{topicDetails[0] && (
							<p className="capitalize">
								{topicDetails[0].replaceAll("_", " ")}
							</p>
						)}
					</span>
				</section>
			</div>
			<form className="md:col-start-3 max-h-full bg-gradient-to-b to-black from-white-transp rounded pt-8 px-4">
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
				<ul className="max-h-[calc(100vh-6rem)] overflow-y-scroll flex flex-col gap-8 mt-6 px-4"></ul>
			</form>
		</div>
	);
};

export default VideoPlayer;
