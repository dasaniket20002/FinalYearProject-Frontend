export type LandingPage_PropsType = {
	LinkToSignUp: string;
	LinkToHome: string;
};

export type LandingPage_VideoScrollBannerType = {
	animationDuration?: number;
	className?: string;
	numberOfVideos?: number;
};

export type LandingPage_VideoElementType = {
	videoNumber: number;
};

export type OptionalClassnameType = {
	className?: string;
};

export type MandatoryClassnameType = {
	className: string;
};

export type OptionalParameterlessFunction = {
	method?: () => void;
};

export type MandatoryParameterlessFunction = {
	method: () => void;
};

export type LandingPage_CardElementType = {
	child?: JSX.Element;
	children?: JSX.Element[];
};

export type LogoSVG_PropType = {
	fillColor?: string;
};

export type Navigator_NavProps = {
	LinkToHome: string;
	LinkToService: string;
	LinkToAboutUs: string;
	LinkToSignUp: string;
	LinkToSignOut: string;
};

export type TranslateHoverElementType = {
	elementInside: JSX.Element;
	innerChildUnderlineElement?: JSX.Element;
	outerChildUnderlineElement?: JSX.Element;

	elementInsideClassname?: string;
};

export type InputField_Props = {
	id: string;
	type: string;
	placeholder: string;
	errorMessage?: string;
	value: string | undefined;
	setterFunction: React.Dispatch<React.SetStateAction<string>>;
	validateLink?: string;
	validatorFunction?: () => boolean;
};

export type SignIn_Props = {
	navigateAfterSignIn: string;
};
export type SignOut_Props = {
	navigateAfterSignOut: string;
};

export type VideosResponse_Type = {
	kind: string;
	nextPageToken?: string;
	prevPageToken?: string;
	video_list?: VideoElement_Type[];
};
export type VideoElement_Type = {
	channelId: string;
	channelTitle: string;
	channelThumbnail: VideoThumbnail_Type;
	publishedAt: string;
	defaultAudioLanguage: string;
	defaultLanguage: string;
	definition: string;
	duration: string;
	id: string;
	kind: string;
	tags: string[];
	thumbnail: VideoThumbnail_Type;
	title: string;
	topicDetails: string[];
};
export type VideoThumbnail_Type = {
	height: number;
	width: number;
	url: string;
};

export type VideoBrowser_Type = {
	elements: VideoElement_Type[];
};
