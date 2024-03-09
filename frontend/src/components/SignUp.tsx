import React, { useRef, useState } from 'react'
import InputField from '../misc/InputField'
import TranslateHoverElement from '../misc/TranslateHoverElement'
import { twMerge } from 'tailwind-merge';
import LogoSVG from './LogoSVG';
import axios from 'axios';
import { SignInPayload, SignUpPayload, SignUp_Props } from '../ts/Types';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ navigateAfterSignIn }: SignUp_Props) => {

    const [isLogin, setLogin] = useState<boolean>(true);

    const [signupUsername, setSignupUsername] = useState<string>('');
    const [signupEmail, setSignupEmail] = useState<string>('');
    const [signupPassword, setSignupPassword] = useState<string>('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState<string>('');

    const [signinUsername, setSigninUsername] = useState<string>('');
    const [signinEmail, setSigninEmail] = useState<string>('');
    const [signinPassword, setSigninPassword] = useState<string>('');

    const signupStatusDisplay = useRef<HTMLParagraphElement>(null);
    const signinStatusDisplay = useRef<HTMLParagraphElement>(null);

    const navigate = useNavigate();

    const serverIP = "http://localhost:5000/"
    const userLinks = {
        signup: serverIP + 'users/register',
        signin: serverIP + 'users/login'
    }
    const validationLinks = {
        username: serverIP + 'validation/username',
        email: serverIP + 'validation/email',
        password: serverIP + 'validation/password'
    }

    const toggleIsLogin = () => {
        setLogin(!isLogin);
    }

    const SignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (signupPassword !== signupConfirmPassword) {
            return;
        }

        const connection = userLinks.signup;
        const payload: SignUpPayload = {
            username: signupUsername as string,
            email: signupEmail as string,
            password: signupPassword as string
        }

        axios
            .post(connection, payload)
            .then((res) => {
                if (res.status === 202) {
                    if (signupStatusDisplay.current) {
                        signupStatusDisplay.current.style.opacity = '1';
                        signupStatusDisplay.current.style.color = 'rgb(220 38 38)'
                        signupStatusDisplay.current.innerHTML = res.data.err;
                    }
                } else if (res.status === 200) {
                    if (signupStatusDisplay.current) {
                        signupStatusDisplay.current.style.opacity = '1';
                        signupStatusDisplay.current.style.color = 'rgb(22 163 74)'
                        signupStatusDisplay.current.innerHTML = res.data.msg;
                    }
                }
            });
    }

    const SignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const connection = userLinks.signin;
        const payload: SignInPayload = {
            username: signinUsername as string,
            email: signinEmail as string,
            password: signinPassword as string
        }

        axios
            .post(connection, payload)
            .then((res) => {
                if (res.status === 202) {
                    if (signinStatusDisplay.current) {
                        signinStatusDisplay.current.style.opacity = '1';
                        signinStatusDisplay.current.style.color = 'rgb(220 38 38)'
                        signinStatusDisplay.current.innerHTML = res.data.err;
                    }
                } else if (res.status === 200) {
                    if (signinStatusDisplay.current) {
                        signinStatusDisplay.current.style.opacity = '1';
                        signinStatusDisplay.current.style.color = 'rgb(22 163 74)'
                        signinStatusDisplay.current.innerHTML = res.data.msg;
                    }

                    localStorage.setItem('JWT', res.data.jwt);

                    navigate('/' + navigateAfterSignIn);
                }
            });
    }

    const resetAllFields = () => {
        setSignupUsername('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupConfirmPassword('');

        setSigninUsername('');
        setSigninEmail('');
        setSigninPassword('');

        if (signinStatusDisplay.current) signinStatusDisplay.current.style.opacity = '0';
        if (signupStatusDisplay.current) signupStatusDisplay.current.style.opacity = '0';
    }

    return (
        <div className='relative flex flex-col md:flex-row justify-center items-center min-h-screen md:h-screen gap-8 md:gap-16 py-24'>
            <LogoSVG className='absolute top-4 left-1/2 -translate-x-1/2' />
            <form
                id='signup-form'
                className='h-[40rem] md:h-5/6 w-2/3 md:w-1/3 p-12 rounded-xl flex flex-col justify-between items-center bg-white-transp border-white-transp border-2'
                onSubmit={(e) => {
                    SignUp(e);
                }}
            >

                <h1 className='text-4xl font-semibold text-amber-600 pb-8'>SIGN UP</h1>

                <section className='relative h-full w-full'>
                    <span className={
                        twMerge(
                            'absolute flex flex-col justify-between w-full h-full transition',
                            !isLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        )
                    }>
                        <InputField
                            id='signup-name'
                            type='text'
                            placeholder='Username'
                            value={signupUsername}
                            setterFunction={setSignupUsername}
                            validateLink={validationLinks.username} />
                        <InputField
                            id='signup-email'
                            type='email'
                            placeholder='Email'
                            value={signupEmail}
                            setterFunction={setSignupEmail}
                            validateLink={validationLinks.email} />
                        <InputField
                            id='signup-password'
                            type='password'
                            placeholder='Password'
                            value={signupPassword}
                            setterFunction={setSignupPassword}
                            validateLink={validationLinks.password} />
                        <InputField
                            id='signup-confirm-password'
                            type='password'
                            placeholder='Confirm Password'
                            value={signupConfirmPassword}
                            setterFunction={setSignupConfirmPassword}
                            validatorFunction={() => (signupPassword !== signupConfirmPassword)}
                            errorMessage='Passwords doesn&apos;t match'
                        />

                        <span>
                            <button type="submit" className='bg-amber-600 rounded py-4 w-full cursor-pointer group'>
                                <TranslateHoverElement className='w-full h-6 items-center font-bold' elementInside={<>Sign Up</>} />
                            </button>
                            <p ref={signupStatusDisplay} className='opacity-0 text-red-600 text-sm transition text-right px-4'>NULL</p>
                        </span>
                    </span>
                    <span className={
                        twMerge(
                            'absolute flex flex-col justify-between w-full h-full transition',
                            !isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                        )
                    }>
                        <p className='py-16'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus laudantium magnam obcaecati vitae quisquam animi!</p>
                        <span>
                            <button onClick={() => { toggleIsLogin(); resetAllFields(); }} type='button' className='bg-amber-600 rounded py-4 w-full cursor-pointer group'>
                                <TranslateHoverElement className='w-full h-6 items-center font-bold' elementInside={<>Sign Up</>} />
                            </button>
                            <p className='opacity-0 text-sm'>NULL</p>
                        </span>
                    </span>
                </section>
            </form>

            <div className='outline outline-white-transp outline-1 h-5/6 hidden md:block' />

            <form
                id='signin-form'
                className='h-[40rem] md:h-5/6 w-2/3 md:w-1/3 p-12 rounded-xl flex flex-col justify-between items-center bg-white-transp border-white-transp border-2'
                onSubmit={(e) => {
                    SignIn(e);
                }}
            >

                <h1 className='text-4xl font-semibold text-amber-600 pb-8'>SIGN IN</h1>

                <section className='relative h-full w-full'>
                    <span className={
                        twMerge(
                            'absolute flex flex-col justify-between w-full h-full transition',
                            isLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        )
                    }>
                        <InputField
                            id='signin-name'
                            type='text'
                            placeholder='Username'
                            value={signinUsername}
                            setterFunction={setSigninUsername} />
                        <InputField
                            id='signin-email'
                            type='email'
                            placeholder='Email'
                            value={signinEmail}
                            setterFunction={setSigninEmail} />
                        <InputField
                            id='signin-password'
                            type='password'
                            placeholder='Password'
                            value={signinPassword}
                            setterFunction={setSigninPassword} />

                        <span>
                            <button type="submit" className='bg-amber-600 rounded py-4 w-full cursor-pointer group'>
                                <TranslateHoverElement className='w-full h-6 items-center font-bold' elementInside={<>Sign In</>} />
                            </button>
                            <p ref={signinStatusDisplay} className='opacity-0 text-red-600 text-sm transition text-right px-4'>NULL</p>
                        </span>
                    </span>
                    <span className={
                        twMerge(
                            'absolute flex flex-col justify-between w-full h-full transition',
                            isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
                        )
                    }>
                        <p className='py-16'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus laudantium magnam obcaecati vitae quisquam animi!</p>
                        <span>
                            <button onClick={() => { toggleIsLogin(); resetAllFields(); }} type='button' className='bg-amber-600 rounded py-4 w-full cursor-pointer group'>
                                <TranslateHoverElement className='w-full h-6 items-center font-bold' elementInside={<>Sign In</>} />
                            </button>
                            <p className='opacity-0 text-sm'>NULL</p>
                        </span>
                    </span>
                </section>
            </form>
        </div>
    )
}

export default SignUp