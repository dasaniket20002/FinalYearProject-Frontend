import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { ServerResponseJWTDecoded, VideosResponse } from "../ts/Types";
import InputField from "./misc/InputField";
import axios from "axios";

const Home = () => {
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
