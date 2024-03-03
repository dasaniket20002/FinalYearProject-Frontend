import React, { useEffect, useRef } from 'react'
import { getUniqueRandomNumbers } from '../ts/Utils';
import { twMerge } from 'tailwind-merge';
import { OptionalClassnameType, LandingPage_VideoElementType, LandingPage_VideoScrollBannerType } from '../ts/Types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useWindowDimensions from '../hooks/WindowSizeHook';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {

    const { width } = useWindowDimensions();

    return (
        <>
            <div className='pt-[8rem] h-screen grid grid-rows-3 overflow-hidden'>
                <VideoScrollBanner numberOfVideos={width < 768 ? 5 : 10} className='row-start-1 col-start-1 row-span-2' />
                <div className='hidden md:block row-start-1 col-start-1 row-span-2 w-full h-full bg-gradient-to-r from-black to-transparent z-10' />
                <TextScrollBanner />
            </div>
            <div className='h-screen bg-blue-400'></div>
        </>
    )
}

const VideoScrollBanner = ({ animationDuration, className, numberOfVideos }: LandingPage_VideoScrollBannerType) => {

    const numVideos = numberOfVideos ? numberOfVideos : 6;

    const randomNumbersInRange: number[] = getUniqueRandomNumbers(1, 13, numVideos);

    const videoElements = Array.from({ length: numVideos }, (_, index) => (
        <VideoElement videoNumber={randomNumbersInRange[index]} key={index} />
    ));

    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (containerRef.current && animationDuration) containerRef.current.style.setProperty('--speed', `${animationDuration}s`);
    }, [animationDuration]);

    return (
        <div ref={containerRef} className={
            twMerge(
                'h-full w-full relative overflow-hidden',
                className
            )
        }>
            <div className='w-min h-full flex'>
                <section className={
                    twMerge(
                        'w-fit h-full flex',
                        animationDuration ? 'animate-swiper-variable-speed' : 'animate-swiper-120'
                    )
                }>
                    {videoElements.map((elem) => (elem))}
                </section>
                <section className={
                    twMerge(
                        'w-fit h-full flex',
                        animationDuration ? 'animate-swiper-variable-speed' : 'animate-swiper-120'
                    )
                }>
                    {videoElements.map((elem) => (elem))}
                </section>
            </div>
        </div>
    )
}

const VideoElement = ({ videoNumber }: LandingPage_VideoElementType) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        videoRef.current?.load();
    })

    return (
        <div className='relative aspect-video h-full flex justify-center'>
            <video ref={videoRef} autoPlay muted loop className='aspect-video h-full self-center'>
                <source src={process.env.PUBLIC_URL + '/assets/videos/' + videoNumber + '.mp4'} type="video/mp4" />
                Your browser does not support the <code>video</code> element.
            </video>
            <div className='absolute top-0 bottom-0 left-0 right-0 scale-110 shadow-dark-vignette' />
        </div>
    )
}

const TextScrollBanner = ({ className }: OptionalClassnameType) => {

    const parentContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(
            parentContainerRef.current,
            {
                scrollTrigger: {
                    trigger: parentContainerRef.current,
                    start: 'center 80%',
                    scrub: true,
                    snap: 1
                },
                duration: 5,
                opacity: 0,
                y: -500
            }
        )
    })

    return (
        <div ref={parentContainerRef} className='z-10 w-screen h-full flex flex-col md:justify-center justify-end'>
            <div className='w-full flex justify-between px-16'>
                <p>Relax.</p>
                <p>Watch.</p>
                <p>Chill.</p>
            </div>
            <div className='flex py-5 items-center overflow-hidden'>
                <h1 className={
                    twMerge(
                        'text-8xl md:text-[11rem] px-16 font-semibold whitespace-nowrap animate-swiper-30',
                        className
                    )
                }>
                    Find your next <span className='font-dancing-script'>adventure</span>, no matter the <span className='font-dancing-script'>genre</span>.
                </h1>
                <h1 className={
                    twMerge(
                        'text-8xl md:text-[11rem] px-16 font-semibold whitespace-nowrap animate-swiper-30',
                        className
                    )
                }>
                    Find your next <span className='font-dancing-script'>adventure, </span>no matter the <span className='font-dancing-script'>genre. </span>
                </h1>
            </div>
        </div>
    );
}

export default LandingPage