import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { ServerResponseJWTDecoded } from '../ts/Types';

const Home = () => {
    const jwtToken = localStorage.getItem('JWT');
    const UserObject: ServerResponseJWTDecoded =
        jwtToken ?
            jwtDecode(jwtToken)
            :
            {
                username: 'Guest',
                email: 'default'
            };
    console.log(UserObject);
    return (
        <div className='pt-[6rem] h-screen'>
            {UserObject.username}
        </div>
    )
}

export default Home