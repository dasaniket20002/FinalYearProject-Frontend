import React, { useEffect } from 'react'
import { SignOut_Props } from '../ts/Types'
import { useNavigate } from 'react-router-dom'

const SignOut = ({ navigateAfterSignOut }: SignOut_Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('JWT');
        navigate(navigateAfterSignOut);
    }, [navigate, navigateAfterSignOut]);

    return (
        <div>SignOut</div>
    )
}

export default SignOut