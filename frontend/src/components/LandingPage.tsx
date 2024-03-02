import React from 'react'
import "video-react/dist/video-react.css";
import { randomNumberInRange } from '../ts/Utils';

const LandingPage = () => {

    return (
        <div className='h-[calc(100vh-8rem)] grid grid-rows-3 overflow-hidden'>
            <VideoScrollBanner />
            <VideoScrollBanner />
        </div>
    )
}

const VideoScrollBanner = () => {

    const videoElements: JSX.Element[] = [
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={1} />,
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={2} />,
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={3} />,
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={4} />,
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={5} />,
        <VideoElement videoNumber={randomNumberInRange(1, 13)} className='w-96' key={6} />,
    ]

    return (
        <div className="h-full relative w-full overflow-hidden">
            <div className="w-[calc(2*6*(24rem+1.25rem))] h-full flex">
                <section className='w-[calc(6*(24rem+1.25rem))] flex gap-5 animate-swiper'>
                    {videoElements.map((elem) => (elem))}
                </section>
                <section className='w-[calc(6*(24rem+1.25rem))] flex gap-5 animate-swiper'>
                    {videoElements.map((elem) => (elem))}
                </section>
            </div>
        </div>
    )
}

const VideoElement = (props: { videoNumber: number, className?: string }) => {
    return (
        <video autoPlay muted loop className={props.className} >
            <source src={process.env.PUBLIC_URL + '/assets/videos/' + props.videoNumber + '.mp4'} type="video/mp4" />
            Your browser does not support the <code>video</code> element.
        </video>
    )
}

export default LandingPage