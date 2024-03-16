import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ServerResponseJWTDecoded, VideosResponse } from "../ts/Types";
import InputField from "./misc/InputField";
import axios from "axios";

const Home = () => {
	const jwtToken = localStorage.getItem("JWT");
	const accessToken = localStorage.getItem("ACCESS_TOKEN");
	const UserObject: ServerResponseJWTDecoded = jwtToken
		? jwtDecode(jwtToken)
		: {
				_id: "default",
				name: "Guest",
				email: "default",
		  };

	const [search, setSearch] = useState<string>("");

	const [videosList, setVideosList] = useState<VideosResponse>();

	useEffect(() => {
		const serverIP = "http://localhost:5001/";
		const youtubeFunctionLinks = {
			trending: serverIP + "youtube/trending",
			search: serverIP + "youtube/search",
		};

		let link = youtubeFunctionLinks.trending;
		if (accessToken) {
			link += "?access_token=" + accessToken;
		}
		console.log(link);
		axios.get(link).then((res) => {
			console.log(res);
			setVideosList(res.data);
		});
	}, [accessToken]);

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
					className="text-white w-full md:w-1/2"
				/>
			</form>

			{videosList?.video_list?.map((item) => item.id)}
		</div>
	);
};

export default Home;
