import React, { useEffect, useRef } from 'react'
import { getUniqueRandomNumbers } from '../ts/Utils';
import { twMerge } from 'tailwind-merge';

const LandingPage = () => {

    return (
        <div className='h-[calc(100vh-8rem)] grid grid-rows-3 overflow-hidden'>
            <VideoScrollBanner className='row-start-1 col-start-1 row-span-2' />
            <div className='row-start-1 col-start-1 row-span-2 w-full h-full bg-gradient-to-r from-black from-20% to-transparent to-80% z-10' />
        </div>
    )
}

const VideoScrollBanner = (props: { animationSpeed?: number, className?: string }) => {

    const randomNumbersInRange: number[] = getUniqueRandomNumbers(1, 13, 6);

    const videoElements: JSX.Element[] = [
        <VideoElement videoNumber={randomNumbersInRange[0]} key={1} />,
        <VideoElement videoNumber={randomNumbersInRange[1]} key={2} />,
        <VideoElement videoNumber={randomNumbersInRange[2]} key={3} />,
        <VideoElement videoNumber={randomNumbersInRange[3]} key={4} />,
        <VideoElement videoNumber={randomNumbersInRange[4]} key={5} />,
        <VideoElement videoNumber={randomNumbersInRange[5]} key={6} />,
    ]

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current) containerRef.current.style.setProperty('--speed', props.animationSpeed ? (props.animationSpeed + 's') : '120s');
    }, [props.animationSpeed]);

    return (
        <div ref={containerRef} className={
            twMerge(
                'h-full w-full relative overflow-hidden',
                props.className
            )
        }>
            <div className='w-min h-full flex'>
                <section className='w-fit h-full flex animate-swiper'>
                    {videoElements.map((elem) => (elem))}
                </section>
                <section className='w-fit h-full flex animate-swiper'>
                    {videoElements.map((elem) => (elem))}
                </section>
            </div>
        </div>
    )
}

const VideoElement = (props: { videoNumber: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.load();
    })

    return (
        <div className='relative aspect-video h-full flex justify-center'>
            <video ref={videoRef} autoPlay muted loop className='aspect-video h-full self-center'>
                <source src={process.env.PUBLIC_URL + '/assets/videos/' + props.videoNumber + '.mp4'} type="video/mp4" />
                Your browser does not support the <code>video</code> element.
            </video>
            <div className='absolute top-0 bottom-0 left-0 right-0 scale-110 shadow-dark-vignette' />
        </div>
    )
}

export default LandingPage