import React, { useEffect } from "react";
import "./App.css";
import Navigator from "./components/Navigator";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Services from "./components/Services";
import AboutUs from "./components/AboutUs";
import SignUp from "./components/SignUp";
import LandingPage from "./components/LandingPage";
import { grained } from "./ts/grained";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SignOut from "./components/SignOut";

gsap.registerPlugin(ScrollTrigger);

function App() {
	const root = "/";
	const LinkToHome = "home";
	const LinkToService = "services";
	const LinkToAboutUs = "aboutus";
	const LinkToSignUp = "signup";
	const LinkToSignOut = "signout";

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
		<div className="App bg-black min-h-screen text-white font-montserrat">
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
								LinkToService={LinkToService}
								LinkToAboutUs={LinkToAboutUs}
								LinkToSignUp={LinkToSignUp}
								LinkToSignOut={LinkToSignOut}
							/>
						}
					>
						<Route
							path="/"
							element={
								<LandingPage LinkToSignUp={LinkToSignUp} />
							}
						/>
						<Route path={LinkToHome} element={<Home />} />
						<Route path={LinkToService} element={<Services />} />
						<Route path={LinkToAboutUs} element={<AboutUs />} />
					</Route>
					<Route path={LinkToSignUp} element={<SignUp />} />
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
