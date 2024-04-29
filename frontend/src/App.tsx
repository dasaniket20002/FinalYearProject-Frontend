import React, { useEffect } from "react";
import "./App.css";
import Navigator from "./components/Navigator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import SignIn from "./components/SignIn";
import LandingPage from "./components/LandingPage";
import { grained } from "./ts/grained";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SignOut from "./components/SignOut";
import VideoPlayer from "./components/VideoPlayer";
import ContactUs from "./components/ContactUs";

gsap.registerPlugin(ScrollTrigger);

const root = "/";
const LinkToHome = "home";
const LinkToContactUs = "contactus";
const LinkToAboutUs = "aboutus";
const LinkToSignUp = "signup";
const LinkToSignOut = "signout";
const LinkToVideoPlayer = "videoplayer";

function App() {
	useEffect(() => {
		var options = {
			animate: true,
			patternWidth: 256,
			patternHeight: 256,
			grainOpacity: 0.1,
			grainDensity: 2,
			grainWidth: 2,
			grainHeight: 1,
		};
		setTimeout(() => grained("#grainedContainer", options), 150);
	}, []);

	useGSAP(() => {
		ScrollTrigger.batch(".stagger", {
			onEnter: (elements) => {
				gsap.from(elements, {
					autoAlpha: 0,
					y: 60,
					stagger: 0.15,
					delay: 0.25,
				});
			},
		});
	});

	return (
		<div className="App bg-black min-h-screen text-gray-200 font-montserrat">
			<div
				id="grainedContainer"
				className="fixed w-screen h-screen pointer-events-none z-[100]"
			/>
			<BrowserRouter>
				<Routes>
					<Route
						path={root}
						element={
							<Navigator
								LinkToHome={LinkToHome}
								LinkToContactUs={LinkToContactUs}
								LinkToAboutUs={LinkToAboutUs}
								LinkToSignUp={LinkToSignUp}
								LinkToSignOut={LinkToSignOut}
							/>
						}
					>
						<Route
							path={root}
							element={
								<LandingPage
									LinkToSignUp={LinkToSignUp}
									LinkToHome={LinkToHome}
								/>
							}
						/>
						<Route
							path={LinkToHome}
							element={
								<Home LinkToVideoPlayer={LinkToVideoPlayer} />
							}
						/>

						<Route path={LinkToContactUs} element={<ContactUs />} />
						<Route path={LinkToAboutUs} element={<AboutUs />} />
						<Route
							path={`${LinkToHome}/${LinkToVideoPlayer}`}
							element={<VideoPlayer />}
						/>
					</Route>
					<Route
						path={LinkToSignUp}
						element={<SignIn navigateAfterSignIn={LinkToHome} />}
					/>
					<Route
						path={LinkToSignOut}
						element={<SignOut navigateAfterSignOut={root} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
