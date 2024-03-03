import React, { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import useWindowDimensions from '../hooks/WindowSizeHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHandHoldingHeart, faHouse, faUserGroup, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

interface NavProps {
    LinkToHome: string,
    LinkToService: string,
    LinkToAboutUs: string,
    LinkToSignUp: string
}

const Nav = (props: NavProps): JSX.Element => {

    const { width } = useWindowDimensions();
    const [isNavOpen, setNavOpen] = useState<boolean>(false);

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
        <>
            {
                width > 768 ?
                    <nav className='fixed p-4 w-full grid grid-cols-5 justify-center items-center text-center font-medium z-50'>
                        <Link to={props.LinkToHome} className='group relative flex flex-col justify-center items-center w-full h-full'>
                            <span className='flex flex-col h-7 overflow-hidden'>
                                <span className='transition-all group-hover:-translate-y-1/2'>
                                    <p>Home</p>
                                    <p className='opacity-90'>Home</p>
                                </span>
                            </span>
                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                        </Link>

                        <Link to={props.LinkToService} className='group relative flex flex-col justify-center items-center w-full h-full'>
                            <span className='flex flex-col h-7 overflow-hidden'>
                                <span className='transition-all group-hover:-translate-y-1/2'>
                                    <p>Services</p>
                                    <p className='opacity-90'>Services</p>
                                </span>
                            </span>
                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                        </Link>

                        <img src={process.env.PUBLIC_URL + '/assets/logo/ShortLogo.svg'} alt="" className='place-self-center' />

                        <Link to={props.LinkToAboutUs} className='group relative flex flex-col justify-center items-center w-full h-full'>
                            <span className='flex flex-col h-7 overflow-hidden'>
                                <span className='transition-all group-hover:-translate-y-1/2'>
                                    <p>About&nbsp;Us</p>
                                    <p className='opacity-90'>About&nbsp;Us</p>
                                </span>
                            </span>
                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                        </Link>

                        <Link to={props.LinkToSignUp} className='group relative flex flex-col justify-center items-center w-full h-full'>
                            <span className='flex flex-col h-7 overflow-hidden'>
                                <span className='transition-all group-hover:-translate-y-1/2'>
                                    <p>Sign&nbsp;Up</p>
                                    <p className='opacity-90'>Sign&nbsp;Up</p>
                                </span>
                            </span>
                            <span className='absolute bottom-0 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-full' />
                        </Link>
                    </nav>
                    :
                    <nav className='fixed w-full flex items-center justify-between py-4 px-8 z-50'>
                        <img src={process.env.PUBLIC_URL + '/assets/logo/ShortLogo.svg'} alt="" />
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
                                    <Link to={props.LinkToHome} className='group relative flex flex-col justify-center w-full'>
                                        <span className='flex flex-col h-8 overflow-hidden'>
                                            <span className='transition-all group-hover:-translate-y-1/2'>
                                                <p className='flex gap-8'><FontAwesomeIcon icon={faHouse} />Home</p>
                                                <p className='opacity-90 flex gap-8'><FontAwesomeIcon icon={faHouse} />Home</p>
                                            </span>
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        </span>
                                    </Link>

                                    <Link to={props.LinkToService} className='group relative flex flex-col justify-center w-full'>
                                        <span className='flex flex-col h-8 overflow-hidden'>
                                            <span className='transition-all group-hover:-translate-y-1/2'>
                                                <p className='flex gap-8'><FontAwesomeIcon icon={faHandHoldingHeart} />Services</p>
                                                <p className='opacity-90 flex gap-8'><FontAwesomeIcon icon={faHandHoldingHeart} />Services</p>
                                            </span>
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        </span>
                                    </Link>

                                    <Link to={props.LinkToAboutUs} className='group relative flex flex-col justify-center w-full'>
                                        <span className='flex flex-col h-8 overflow-hidden'>
                                            <span className='transition-all group-hover:-translate-y-1/2'>
                                                <p className='flex gap-8'><FontAwesomeIcon icon={faUserGroup} />About&nbsp;Us</p>
                                                <p className='opacity-90 flex gap-8'><FontAwesomeIcon icon={faUserGroup} />About&nbsp;Us</p>
                                            </span>
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        </span>
                                    </Link>

                                    <Link to={props.LinkToSignUp} className='group relative flex flex-col justify-center w-full'>
                                        <span className='flex flex-col h-8 overflow-hidden'>
                                            <span className='transition-all group-hover:-translate-y-1/2'>
                                                <p className='flex gap-8'><FontAwesomeIcon icon={faUserPlus} />Sign&nbsp;Up</p>
                                                <p className='opacity-90 flex gap-8'><FontAwesomeIcon icon={faUserPlus} />Sign&nbsp;Up</p>
                                            </span>
                                            <span className='absolute -bottom-4 w-0 h-0.5 bg-white opacity-80 transition-all group-hover:w-2/3' />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        }

                    </nav>
            }

            <Outlet />
        </>
    )
}

export default Nav