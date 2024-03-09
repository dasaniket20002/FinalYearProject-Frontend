export type LandingPage_PropsType = {
    LinkToSignUp: string,
    LinkToServices: string
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
    username: string,
    email: string,
    password: string
}

export type SignInPayload = {
    username?: string,
    email?: string,
    password: string
}

export type ServerResponseJWTDecoded = {
    username: string,
    email: string
}