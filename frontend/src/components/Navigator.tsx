import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from '../hooks/WindowSizeHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHandHoldingHeart, faHouse, faUserGroup, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import LogoSVG from './LogoSVG';
import { Navigator_NavProps } from '../ts/Types';
import TranslateHoverElement from '../misc/TranslateHoverElement';
import { faFacebook, faGithub, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';


const Navigator = ({ LinkToHome, LinkToAboutUs, LinkToService, LinkToSignUp, LinkToSignOut }: Navigator_NavProps) => {
    return (
        <>
            <Nav LinkToHome={LinkToHome} LinkToAboutUs={LinkToAboutUs} LinkToService={LinkToService} LinkToSignUp={LinkToSignUp} LinkToSignOut={LinkToSignOut} />
            <Outlet />
            <Footer />
        </>
    )
}

const Nav = ({ LinkToHome, LinkToAboutUs, LinkToService, LinkToSignUp, LinkToSignOut }: Navigator_NavProps) => {
    const { width } = useWindowDimensions();
    const [isNavOpen, setNavOpen] = useState<boolean>(false);

    const jwtToken = localStorage.getItem('JWT');

    const expandableDivRef = useRef<HTMLDivElement>(null);
    const mobileNavMenuButtonSpan = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (isNavOpen) {
            if (expandableDivRef.current) expandableDivRef.current.style.left = '25%';
            if (mobileNavMenuButtonSpan.current) mobileNavMenuButtonSpan.current.style.transform = 'translateY(-50%)';
        } else {
            if (expandableDivRef.current) expandableDivRef.current.style.left = '100%';
            if (mobileNavMenuButtonSpan.current) mobileNavMenuButtonSpan.current.style.transform = 'translateY(0%)';
        }

        const html = document.querySelector("html");
        if (html) {
            html.style.overflow = isNavOpen ? "hidden" : "auto";
        }
    }, [isNavOpen]);
    return (
        <>{
            width > 768 ?
                <nav className='fixed p-4 w-full grid grid-cols-5 justify-center items-center text-center font-medium z-50 bg-gradient-to-b from-black to-transparent'>
                    <Link to={LinkToHome} className='group relative flex flex-col justify-center items-center w-full h-full'>
                        <TranslateHoverElement
                            className='h-7'
                            elementInside={
                                <>Home</>
                            }
                            outerChildUnderlineElement={
                                <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                            }
                        />
                    </Link>

                    <Link to={LinkToService} className='group relative flex flex-col justify-center items-center w-full h-full'>
                        <TranslateHoverElement
                            className='h-7'
                            elementInside={
                                <>Services</>
                            }
                            outerChildUnderlineElement={
                                <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                            }
                        />
                    </Link>

                    <LogoSVG className='place-self-center' />

                    <Link to={LinkToAboutUs} className='group relative flex flex-col justify-center items-center w-full h-full'>
                        <TranslateHoverElement
                            className='h-7'
                            elementInside={
                                <>About&nbsp;Us</>
                            }
                            outerChildUnderlineElement={
                                <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                            }
                        />
                    </Link>

                    <Link to={jwtToken ? LinkToSignOut : LinkToSignUp} className='group relative flex flex-col justify-center items-center w-full h-full'>
                        <TranslateHoverElement
                            className='h-7'
                            elementInside={
                                jwtToken ?
                                    <>Sign&nbsp;Out</>
                                    :
                                    <>Sign&nbsp;Up</>
                            }
                            outerChildUnderlineElement={
                                <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                            }
                        />
                    </Link>
                </nav>
                :
                <nav className='fixed w-full flex items-center justify-between py-4 px-8 z-50'>

                    <LogoSVG />

                    <button
                        className='z-50 flex flex-col items-center h-8 w-8 overflow-hidden'
                        onClick={(e) => {
                            e.preventDefault();
                            setTimeout(() => {
                                setNavOpen(!isNavOpen)
                            }, 150);
                        }}>
                        <span ref={mobileNavMenuButtonSpan} className='transition-all'>
                            <FontAwesomeIcon icon={faBars} className='text-3xl' />
                            <FontAwesomeIcon icon={faXmark} className='text-3xl' />
                        </span>
                    </button>
                    {
                        <div ref={expandableDivRef} className='fixed right-0 left-full bottom-0 top-0 z-40 transition-all bg-blur-transp border-blur-transp border-2 backdrop-blur-sm'>
                            <div className='py-32 px-8 flex flex-col gap-16 h-full text-2xl'>
                                <Link to={LinkToHome} className='group relative flex flex-col justify-center w-full'>
                                    <TranslateHoverElement
                                        elementInside={
                                            <><FontAwesomeIcon icon={faHouse} />Home</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        }
                                    />
                                </Link>

                                <Link to={LinkToService} className='group relative flex flex-col justify-center w-full'>
                                    <TranslateHoverElement
                                        elementInside={
                                            <><FontAwesomeIcon icon={faHandHoldingHeart} />Services</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        }
                                    />
                                </Link>

                                <Link to={LinkToAboutUs} className='group relative flex flex-col justify-center w-full'>
                                    <TranslateHoverElement
                                        elementInside={
                                            <><FontAwesomeIcon icon={faUserGroup} />About&nbsp;Us</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        }
                                    />
                                </Link>

                                <Link to={jwtToken ? LinkToSignOut : LinkToSignUp} className='group relative flex flex-col justify-center w-full'>
                                    <TranslateHoverElement
                                        elementInside={
                                            <>
                                                <FontAwesomeIcon icon={faUserPlus} />
                                                {
                                                    jwtToken ?
                                                        <>Sign&nbsp;Out</>
                                                        :
                                                        <>Sign&nbsp;Up</>
                                                }
                                            </>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        }
                                    />
                                </Link>
                            </div>
                        </div>
                    }
                </nav>
        }</>
    )
}

const Footer = () => {
    return (
        <>
            <div className='h-[calc(50vh-6rem)] px-8 pt-8'>
                <div className='flex flex-col justify-between h-full'>
                    <hr />
                    <div className='h-full grid grid-cols-3 md:grid-cols-2'>
                        <div className='place-self-center flex gap-16 items-center col-start-1'>
                            <LogoSVG className='scale-150' />
                            <h1 className='text-3xl font-semibold hidden md:inline'>WATCH.IT</h1>
                        </div>
                        <div className='flex gap-2 md:gap-16 p-2 md:p-0 items-center justify-center col-start-2 col-span-2'>
                            <section className='grid grid-rows-3 gap-3'>
                                <Link to={'/'} className='group relative flex flex-col justify-center w-min'>
                                    <TranslateHoverElement
                                        className='h-6 md:h-7 w-min text-sm md:text-base'
                                        elementInside={
                                            <>Content</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                                        }
                                    />
                                </Link>
                                <Link to={'/'} className='group relative flex flex-col justify-center w-min'>
                                    <TranslateHoverElement
                                        className='h-6 md:h-7 w-min text-sm md:text-base'
                                        elementInside={
                                            <>Explore</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                                        }
                                    />
                                </Link>
                                <Link to={'/'} className='group relative flex flex-col justify-center w-min'>
                                    <TranslateHoverElement
                                        className='h-6 md:h-7 w-min text-sm md:text-base'
                                        elementInside={
                                            <>Terms&nbsp;&&nbsp;Services</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                                        }
                                    />
                                </Link>
                            </section>
                            <section className='grid grid-rows-3 gap-3'>
                                <Link to={'/'} className='group relative flex flex-col justify-center w-min'>
                                    <TranslateHoverElement
                                        className='h-6 md:h-7 w-min text-sm md:text-base'
                                        elementInside={
                                            <>Help&nbsp;&&nbsp;Support</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                                        }
                                    />
                                </Link>
                                <Link to={'/'} className='group relative flex flex-col justify-center w-min'>
                                    <TranslateHoverElement
                                        className='h-6 md:h-7 w-min text-sm md:text-base'
                                        elementInside={
                                            <>Suggestions</>
                                        }
                                        innerChildUnderlineElement={
                                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                                        }
                                    />
                                </Link>
                            </section>
                        </div>
                    </div>
                    <hr />
                    <div className='flex justify-between items-center py-4'>
                        <p className='font-thin text-sm'>WATCH.IT. ALL RIGHTS RESERVED</p>
                        <section className='w-1/3 flex justify-between text-xl'>
                            <Link to={'/'}><FontAwesomeIcon icon={faInstagram} /></Link>
                            <Link to={'/'}><FontAwesomeIcon icon={faGithub} /></Link>
                            <Link to={'/'}><FontAwesomeIcon icon={faLinkedin} /></Link>
                            <Link to={'/'}><FontAwesomeIcon icon={faFacebook} /></Link>
                            <Link to={'/'}><FontAwesomeIcon icon={faXTwitter} /></Link>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigator