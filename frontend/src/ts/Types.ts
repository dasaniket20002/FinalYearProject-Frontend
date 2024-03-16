export type LandingPage_PropsType = {
    LinkToSignUp: string
}

export type LandingPage_VideoScrollBannerType = {
    animationDuration?: number,
    className?: string,
    numberOfVideos?: number
}

export type LandingPage_VideoElementType = {
    videoNumber: number
}

export type OptionalClassnameType = {
    className?: string
}

export type MandatoryClassnameType = {
    className: string
}

export type LandingPage_CardElementType = {
    child?: JSX.Element,
    children?: JSX.Element[]
}

export type LogoSVG_PropType = {
    fillColor?: string
}

export type Navigator_NavProps = {
    LinkToHome: string,
    LinkToService: string,
    LinkToAboutUs: string,
    LinkToSignUp: string,
    LinkToSignOut: string
}

export type TranslateHoverElementType = {
    elementInside: JSX.Element,
    innerChildUnderlineElement?: JSX.Element,
    outerChildUnderlineElement?: JSX.Element
}

export type InputField_Props = {
    id: string,
    type: string,
    placeholder: string
    errorMessage?: string,
    value: string | undefined,
    setterFunction: React.Dispatch<React.SetStateAction<string>>,
    validateLink?: string,
    validatorFunction?: () => boolean
}

export type SignUp_Props = {
    navigateAfterSignIn: string
}
export type SignOut_Props = {
    navigateAfterSignOut: string
}

export type SignUpPayload = {
    name: string,
    email: string,
    password: string
}
export type SignUpPayloadWP = {
    name: string,
    email: string
}

export type SignInPayload = {
    name?: string,
    email?: string,
    password: string
}
export type SignInPayloadWP = {
    name?: string,
    email?: string
}

export type ServerResponseJWTDecoded = {
    _id: string,
    name: string,
    email: string
}

export type VideosResponse = {
    kind: string,
    nextPageToken?: string,
    prevPageToken?: string,
    video_list?: VideoResponse[]
}
export type VideoResponse = {
    channelId: string,
    channelTitle: string,
    defaultAudioLanguage: string,
    defaultLanguage: string,
    definition: string,
    duration: string,
    id: string,
    kind: string,
    tags: string[],
    thumbnail: VideoThumbnail,
    title: string,
    topicDetails: string[]
}
export type VideoThumbnail = {
    height: number,
    width: number,
    url: string
}