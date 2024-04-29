import React from "react";

const AboutUs = () => {
	return (
		<div className="pt-[6rem] px-8 md:px-32 min-h-[calc(50vh+6rem)]">
			<h1 className="text-gray-200 py-8">Welcome!</h1>
			<p className="text-gray-200">
				Welcome to Watch.it, where entertainment meets convenience. We
				are committed to providing a seamless streaming experience that
				caters to your diverse interests and preferences. Our platform
				offers a range of features designed to enhance your viewing
				pleasure and foster a sense of community among our users.
			</p>

			<ol className="list-decimal px-4 py-10 text-gray-200">
				<li>
					Sign up hassle-free through Google authentication or email,
					ensuring a quick and secure registration process.
				</li>
				<li>
					Access your saved preferences, playlists, and watch history
					for a personalized experience.
				</li>
				<li>
					Seamlessly search for videos across various genres and
					topics to find content that interests you.
				</li>
				<li>
					Discover new and exciting content through our integration
					with YouTube, which recommends videos from diverse topics
					based on your interests and viewing history.
				</li>
				<li>
					Engage with other users by creating public watch rooms where
					you can watch videos together in real-time.
				</li>
				<li>
					Chat in real-time with other users while watching videos in
					a watch room, fostering a sense of community and enabling
					lively discussions around the content.
				</li>
				<li>
					Enjoy the freedom to stream videos from anywhere at your
					convenience, whether you're using a desktop, laptop, tablet,
					or mobile device.
				</li>
			</ol>

			<p className="text-gray-400">
				At Watch.it, we strive to redefine the way you consume and
				interact with digital content. Join our growing community of
				users and embark on a journey of endless entertainment
				possibilities. Experience the future of streaming today!
			</p>
		</div>
	);
};

export default AboutUs;
