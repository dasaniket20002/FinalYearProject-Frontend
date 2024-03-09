import React from 'react'
import { OptionalClassnameType, TranslateHoverElementType } from '../../ts/Types'
import { twMerge } from 'tailwind-merge'

const TranslateHoverElement = ({ className, elementInside, innerChildUnderlineElement, outerChildUnderlineElement }: TranslateHoverElementType & OptionalClassnameType) => {
    return (
        <>
            <span className={
                twMerge(
                    'stagger flex flex-col h-8 overflow-hidden',
                    className
                )
            }>
                <span className='transition-transform group-hover:-translate-y-1/2'>
                    <p className='flex gap-8 items-center'>{elementInside}</p>
                    <p className='opacity-90 flex gap-8 items-center'>{elementInside}</p>
                </span>
                {innerChildUnderlineElement}
            </span>
            {outerChildUnderlineElement}
        </>
    )
}

export default TranslateHoverElement