import React, { useEffect, useRef } from 'react'
import { getUniqueRandomNumbers } from '../ts/Utils';

const LandingPage = () => {

    return (
        <div className='h-[calc(100vh-8rem)] grid grid-rows-3 overflow-hidden'>
            <VideoScrollBanner />
            <VideoScrollBanner animationSpeed={170} translateElement />
        </div>
    )
}

const VideoScrollBanner = (props: { animationSpeed?: number, translateElement?: boolean }) => {

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
        <div ref={containerRef} className='h-full w-full relative overflow-hidden'>
            <div className={`w-[calc(2*6*(24rem+1.25rem))] h-full flex ${props.translateElement ? '-translate-x-1/3' : 'translate-x-0'}`}>
                <section className='h-full flex gap-5 animate-swiper'>
                    {videoElements.map((elem) => (elem))}
                </section>
                <section className='h-full flex gap-5 animate-swiper'>
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
    }, []);

    return (
        <div className='relative w-96 h-full grid place-items-center'>
            <video ref={videoRef} autoPlay muted loop>
                <source src={process.env.PUBLIC_URL + '/assets/videos/' + props.videoNumber + '.mp4'} type="video/mp4" />
                Your browser does not support the <code>video</code> element.
            </video>
            <div className='absolute top-0 bottom-0 left-0 right-0 scale-110 shadow-vignette' />
        </div>
    )
}

export default LandingPage