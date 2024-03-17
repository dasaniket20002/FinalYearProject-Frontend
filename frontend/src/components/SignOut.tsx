import React, { useEffect } from "react";
import { SignOut_Props } from "../ts/Types";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const SignOut = ({ navigateAfterSignOut }: SignOut_Props) => {
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem("email");
		localStorage.removeItem("name");
		localStorage.removeItem("picture");
		localStorage.removeItem("sub");
		localStorage.removeItem("access_token");
		localStorage.removeItem("token_type");

		googleLogout();
		navigate(navigateAfterSignOut);
	}, [navigate, navigateAfterSignOut]);

	return <div>SignOut</div>;
};

export default SignOut;
