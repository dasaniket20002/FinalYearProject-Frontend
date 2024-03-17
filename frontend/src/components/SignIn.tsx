import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignIn_Props } from "../ts/Types";
import LoadingIcon from "./misc/LoadingIcon";

const SignIn = ({ navigateAfterSignIn }: SignIn_Props) => {
	const navigate = useNavigate();

	const login = useGoogleLogin({
		onSuccess: (tokenResponse: TokenResponse) => {
			localStorage.setItem("access_token", tokenResponse.access_token);
			localStorage.setItem("token_type", tokenResponse.token_type);
			console.log(tokenResponse.scope);

			axios
				.get("https://www.googleapis.com/oauth2/v3/userinfo", {
					headers: {
						Authorization: `${tokenResponse.token_type} ${tokenResponse.access_token}`,
					},
				})
				.then((res) => {
					localStorage.setItem("email", res.data.email);
					localStorage.setItem("name", res.data.name);
					localStorage.setItem("picture", res.data.picture);
					localStorage.setItem("sub", res.data.sub);
				})
				.catch((err) => console.log(err));

			navigate(`/${navigateAfterSignIn}`, {
				state: {
					access_token: tokenResponse.access_token,
					token_type: tokenResponse.token_type,
				},
			});
		},
		onError: (
			tokenResponse: Pick<
				TokenResponse,
				"error" | "error_description" | "error_uri"
			>
		) => console.log(tokenResponse.error),
		scope: "email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/youtube.force-ssl",
	});

	return (
		<div className="flex flex-col items-center justify-between h-screen py-10">
			<h1 className="text-8xl font-semibold tracking-widest p-8">
				LOGIN
				<LoadingIcon />
			</h1>

			<button
				id="google-login"
				onClick={() => {
					login();
				}}
				className="py-4 px-8 text-2xl bg-black border-white-transp border rounded mb-32 transition group hover:border-amber-600 hover:text-amber-600"
			>
				<TranslateHoverElement
					elementInside={
						<>
							<FontAwesomeIcon icon={faGoogle} />
							Login With Google
						</>
					}
				/>
			</button>

			<section className="px-4">
				<h1 className="text-gray-400">Google Login Required</h1>
				<p className="text-gray-600">
					This is because, your Google Account is used to generate a
					access token, that will be used to fetch videos from the
					YouTube servers.
				</p>
				<p className="text-gray-600">Happy Watching!</p>
			</section>
		</div>
	);
};

export default SignIn;
