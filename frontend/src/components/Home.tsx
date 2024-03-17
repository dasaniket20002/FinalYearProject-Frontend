import React, { useState } from "react";
import InputField from "./misc/InputField";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
	const { state } = useLocation();
	if (state) {
		axios
			.get(
				"http://localhost:5001/youtube/trending?access_token=" +
					state.access_token +
					"&token_type=" +
					state.token_type
			)
			.then((res) => {
				console.log(res.data);
			});
	}

	const [search, setSearch] = useState<string>("");
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
		</div>
	);
};

export default Home;
