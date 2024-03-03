import React from 'react'
import { LogoSVG_PropType, OptionalClassnameType } from '../ts/Types'

const LogoSVG = ({ fillColor, className }: LogoSVG_PropType & OptionalClassnameType) => {
    return (
        <svg width="58" height="56" viewBox="0 0 58 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path
                id="Vector"
                fillRule="evenodd"
                clipRule="evenodd"
                fill={fillColor}
                d="M42.4326 55.4343V0.565651H57.4364V55.4343H42.4326ZM31.8553 0.565651H37.1439V55.4343H31.8553V0.565651ZM21.2779 36.1995H26.5666V55.4343H21.2779V36.1995ZM10.5537 0.565651H15.9893V55.4343H10.5537V0.565651ZM0.563965 0.565651H5.26505V55.4343H0.563965V0.565651Z" />
        </svg>
    )
}

export default LogoSVG