import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const SignUp = () => {
	const navigate = useNavigate();

	const login = useGoogleLogin({
		onSuccess: (tokenResponse: TokenResponse) => {
			navigate("/home", {
				state: {
					access_token: tokenResponse.access_token,
					token_type: tokenResponse.token_type,
				},
			});
		},
		onError: (err) => console.log(err),
	});

	const ellipsisStaggerRef = useRef<HTMLSpanElement>(null);
	useGSAP(
		() => {
			gsap.fromTo(
				"p",
				{
					duration: 1,
					opacity: 0,
					repeat: -1,
					yoyo: false,
					ease: "linear",
					stagger: 0.5,
				},
				{
					duration: 1,
					opacity: 1,
					repeat: -1,
					yoyo: false,
					ease: "linear",
					stagger: 0.5,
					delay: 1,
				}
			);
			gsap.to("p", {
				duration: 1,
				opacity: 0,
				repeat: -1,
				yoyo: false,
				ease: "linear",
				stagger: 0.5,
				delay: 2,
			});
		},
		{ scope: ellipsisStaggerRef }
	);

	return (
		<div className="flex flex-col items-center justify-between h-screen py-10">
			<h1 className="text-8xl font-semibold tracking-widest p-8">
				LOGIN
				<span
					ref={ellipsisStaggerRef}
					className="w-full flex justify-center text-2xl"
				>
					<p>.</p>
					<p>.</p>
					<p>.</p>
				</span>
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

			<section>
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

export default SignUp;
