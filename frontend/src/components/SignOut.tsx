import React, { useEffect } from "react";
import { SignOut_Props } from "../ts/Types";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const SignOut = ({ navigateAfterSignOut }: SignOut_Props) => {
	const navigate = useNavigate();

	useEffect(() => {
		sessionStorage.clear();
		googleLogout();
		navigate(navigateAfterSignOut);
	}, [navigate, navigateAfterSignOut]);

	return <div>SignOut</div>;
};

export default SignOut;
