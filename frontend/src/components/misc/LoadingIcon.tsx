import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { OptionalClassnameType } from "../../ts/Types";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

const LoadingIcon = ({ className }: OptionalClassnameType) => {
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
		<span
			ref={ellipsisStaggerRef}
			className={twMerge(
				"w-full flex justify-center text-2xl",
				className
			)}
		>
			<p>.</p>
			<p>.</p>
			<p>.</p>
		</span>
	);
};

export default LoadingIcon;
