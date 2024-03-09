import React, { useRef } from 'react'
import { InputField_Props, OptionalClassnameType } from '../ts/Types'
import { twMerge } from 'tailwind-merge'
import axios from 'axios';

const InputField = ({ id, type, placeholder, errorMessage, value, setterFunction, validateLink, validatorFunction, className }: InputField_Props & OptionalClassnameType) => {
    const errorDisplay = useRef<HTMLParagraphElement>(null);
    const validate = (value: string) => {
        axios
            .post(validateLink as string, { value: value })
            .then((res) => {
                if (res.status === 202) triggerErrorDisplay(res.data.err);
                else if (res.status === 200) hideErrorDisplay();
            })
    }
    const triggerErrorDisplay = (htmlText: string) => {
        if (errorDisplay.current) {
            errorDisplay.current.style.opacity = '1';
            errorDisplay.current.innerHTML = htmlText;
        }
    }
    const hideErrorDisplay = () => {
        if (errorDisplay.current) {
            errorDisplay.current.style.opacity = '0';
        }
    }

    return (
        <section className={
            twMerge('relative w-full',
                className
            )}>
            <input
                type={type}
                id={id}
                placeholder=''
                className='h-12 w-full px-4 rounded outline-none bg-transparent peer border-gray-600 border-b focus:border-gray-400'
                value={value}
                onChange={(e) => {
                    setterFunction(e.target.value);
                }}
                onBlur={(e) => {
                    if (validateLink) validate(e.target.value);
                    if (validatorFunction) {
                        if (validatorFunction()) triggerErrorDisplay(errorMessage as string);
                        else hideErrorDisplay();
                    }
                }}
            />
            <label
                htmlFor={id}
                className='absolute top-0 left-0 font-medium scale-75 h-12 w-full px-4 flex items-center pointer-events-none origin-[0] transition -translate-y-9 peer-focus:-translate-y-9 peer-focus:text-white peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100'
            >
                {placeholder}
            </label>
            <p ref={errorDisplay} className='transition opacity-0 text-red-600 text-sm text-right px-4'>{errorMessage ? errorMessage : 'NULL'}</p>
        </section>
    )
}

export default InputField