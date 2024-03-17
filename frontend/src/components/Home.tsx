import React, { useEffect, useState } from "react";
import InputField from "./misc/InputField";
import axios from "axios";
import LoadingIcon from "./misc/LoadingIcon";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import {
	MandatoryParameterlessFunction,
	VideoElement,
	VideosResponse,
} from "../ts/Types";

const Home = () => {
	const [videosList, setVideosList] = useState<VideoElement[]>();
	const [search, setSearch] = useState<string>("");

	const access_token = localStorage.getItem("access_token");
	const token_type = localStorage.getItem("token_type");
	const name = localStorage.getItem("name")
		? localStorage.getItem("name")
		: "Guest";

	const [isLoading, setLoading] = useState<boolean>(access_token !== null);

	const serverURL = "http://localhost:5001/";
	const apiCalls = {
		trending: serverURL + "youtube/trending",
		trendingPage: serverURL + "youtube/trending/page",
		search: serverURL + "youtube/search",
		searchPage: serverURL + "youtube/search/page",
	};

	const fetchVideos = () => {
		setLoading(true);
		axios
			.get(apiCalls.trending, {
				params: {
					access_token: access_token,
					token_type: token_type,
				},
			})
			.then((res) => {
				const videoResponse = res.data as VideosResponse;
				if (videoResponse.video_list)
					setVideosList(videoResponse.video_list);
				console.log(videoResponse);

				setLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (access_token) fetchVideos();
		// eslint-disable-next-line
	}, [access_token]);

	return (
		<div className="pt-[6rem] min-h-[calc(50vh+6rem)]">
			<form
				className="w-full px-4 flex justify-center"
				onSubmit={() => {}}
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
				<span className="text-sm font-medium">Trending</span>
			</h1>

			{videosList && videosList.length !== 0 ? (
				<>List of Videos</>
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
					elementInside={
						<>
							<FontAwesomeIcon icon={faRotateRight} />
							&nbsp; Fetch
						</>
					}
				/>
			</button>
		</div>
	);
};

export default Home;
