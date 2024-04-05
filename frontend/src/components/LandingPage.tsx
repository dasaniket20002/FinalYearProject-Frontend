import React, { useEffect, useRef } from "react";
import { getUniqueRandomNumbers } from "../ts/Utils";
import { twMerge } from "tailwind-merge";
import {
	OptionalClassnameType,
	LandingPage_VideoElementType,
	LandingPage_VideoScrollBannerType,
	LandingPage_PropsType,
} from "../ts/Types";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CardElement from "./misc/CardComponent";
import TranslateHoverElement from "./misc/TranslateHoverElement";
import { Link } from "react-router-dom";

const LandingPage = ({ LinkToSignUp, LinkToHome }: LandingPage_PropsType) => {
	const cardsContainer = useRef<HTMLDivElement>(null);
	const access_token = sessionStorage.getItem("access_token");

	return (
		<>
			<div className="pt-[6rem] h-screen grid grid-rows-3 overflow-hidden">
				<VideoScrollBanner className="row-start-1 col-start-1 row-span-2" />
				<div className="hidden md:block row-start-1 col-start-1 row-span-2 w-full h-full bg-gradient-to-r from-black to-transparent z-10" />
				<TextScrollBanner />
			</div>
			<div
				ref={cardsContainer}
				className="py-[6rem] min-h-screen px-16 min-[1900px]:px-48 grid grid-rows-3 xl:grid-rows-1 xl:grid-cols-3 gap-8 md:gap-16"
			>
				<CardElement className="flex flex-col gap-8 justify-around">
					<h1 className="text-4xl md:text-6xl font-bold text-center">
						Lorem ipsum dolor sit amet.
					</h1>
					<hr />
					<p className="text-xl md:text-2xl font-medium text-center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit cupiditate, libero exercitationem tempora corrupti
						facere!
					</p>
				</CardElement>
				<CardElement className="flex flex-col gap-8 justify-around">
					<h1 className="text-4xl md:text-6xl font-bold text-center">
						Lorem ipsum dolor sit amet.
					</h1>
					<hr />
					<p className="text-xl md:text-2xl font-medium text-center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit cupiditate, libero exercitationem tempora corrupti
						facere!
					</p>
				</CardElement>
				<CardElement className="flex flex-col gap-8 justify-around">
					<h1 className="text-4xl md:text-6xl font-bold text-center">
						Lorem ipsum dolor sit amet.
					</h1>
					<hr />
					<p className="text-xl md:text-2xl font-medium text-center">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Velit cupiditate, libero exercitationem tempora corrupti
						facere!
					</p>
				</CardElement>
			</div>
			<div className="h-[50vh] px-16 min-[1900px]:px-48 w-full">
				<CardElement className="grid grid-rows-4 lg:grid-rows-1 lg:grid-cols-3">
					<span className="flex flex-col gap-4 self-center row-span-3 lg:row-span-1 lg:col-span-2">
						<h1 className="text-4xl md:text-6xl font-bold text-center">
							Try Our Service Now!
						</h1>
						<hr />
						<p className="text-xl md:text-2xl font-medium text-center">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Nostrum placeat, quidem voluptate libero
							debitis suscipit.
						</p>
					</span>
					<Link
						to={access_token ? LinkToHome : LinkToSignUp}
						className="stagger bg-amber-600 m-4 h-full lg:h-36 self-center rounded flex items-center justify-center text-2xl md:text-4xl font-bold text-gray-200 group"
					>
						<TranslateHoverElement
							className="h-[2.25rem] md:h-[2.75rem]"
							elementInside={
								<>
									<FontAwesomeIcon icon={faAngleRight} />
									{access_token ? (
										<>Explore&nbsp;Now</>
									) : (
										<>Sign&nbsp;Up</>
									)}
									<FontAwesomeIcon icon={faAngleLeft} />
								</>
							}
						/>
					</Link>
				</CardElement>
			</div>
		</>
	);
};

const VideoScrollBanner = ({
	animationDuration,
	className,
	numberOfVideos,
}: LandingPage_VideoScrollBannerType) => {
	const numVideos = numberOfVideos ? numberOfVideos : 6;

	const randomNumbersInRange: number[] = getUniqueRandomNumbers(
		1,
		13,
		numVideos
	);

	const videoElements = Array.from({ length: numVideos }, (_, index) => (
		<VideoElement videoNumber={randomNumbersInRange[index]} key={index} />
	));

	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (containerRef.current && animationDuration)
			containerRef.current.style.setProperty(
				"--speed",
				`${animationDuration}s`
			);
	}, [animationDuration]);

	return (
		<div
			ref={containerRef}
			className={twMerge(
				"h-full w-full relative overflow-hidden",
				className
			)}
		>
			<div className="w-min h-full flex">
				<section
					className={twMerge(
						"w-fit h-full flex",
						animationDuration
							? "animate-swiper-variable-speed"
							: "animate-swiper-120"
					)}
				>
					{videoElements.map((elem) => elem)}
				</section>
				<section
					className={twMerge(
						"w-fit h-full flex",
						animationDuration
							? "animate-swiper-variable-speed"
							: "animate-swiper-120"
					)}
				>
					{videoElements.map((elem) => elem)}
				</section>
			</div>
		</div>
	);
};

const VideoElement = ({ videoNumber }: LandingPage_VideoElementType) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		videoRef.current?.load();
	});

	return (
		<div className="relative aspect-video h-full flex justify-center">
			<video
				preload="none"
				ref={videoRef}
				autoPlay
				muted
				loop
				className="aspect-video h-full self-center"
			>
				<source
					src={
						process.env.PUBLIC_URL +
						"/assets/videos/" +
						videoNumber +
						".mp4"
					}
					type="video/mp4"
				/>
				Your browser does not support the <code>video</code> element.
			</video>
			<div className="absolute top-0 bottom-0 left-0 right-0 scale-110 shadow-dark-vignette" />
		</div>
	);
};

const TextScrollBanner = ({ className }: OptionalClassnameType) => {
	const parentContainerRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		gsap.to(parentContainerRef.current, {
			scrollTrigger: {
				trigger: parentContainerRef.current,
				start: "center 80%",
				scrub: true,
				snap: 1,
			},
			duration: 5,
			opacity: 0,
			y: -500,
		});
	});

	return (
		<div
			ref={parentContainerRef}
			className="z-10 w-screen h-full flex flex-col justify-center"
		>
			<div className="w-full flex justify-between px-16">
				<p>Relax.</p>
				<p>Watch.</p>
				<p>Chill.</p>
			</div>
			<div className="flex py-5 items-center overflow-hidden">
				<h1
					className={twMerge(
						"text-8xl md:text-[11rem] px-16 font-semibold whitespace-nowrap animate-swiper-30",
						className
					)}
				>
					Find your next{" "}
					<span className="font-dancing-script">adventure, </span>no
					matter the{" "}
					<span className="font-dancing-script">genre. </span>
				</h1>
				<h1
					className={twMerge(
						"text-8xl md:text-[11rem] px-16 font-semibold whitespace-nowrap animate-swiper-30",
						className
					)}
				>
					Find your next{" "}
					<span className="font-dancing-script">adventure, </span>no
					matter the{" "}
					<span className="font-dancing-script">genre. </span>
				</h1>
			</div>
		</div>
	);
};

export default LandingPage;
