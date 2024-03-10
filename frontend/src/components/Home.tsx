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
                _id: 'default',
                name: 'Guest',
                email: 'default'
            };

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('ACCESS_TOKEN');
    //     const url = new URL('http://localhost:5000/youtube/trending');
    //     url.searchParams.set('regionCode', 'IN');
    //     url.searchParams.set('maxResults', '10');
    //     if (accessToken) url.searchParams.set('accessToken', accessToken);

    //     axios.get(url.toString())
    //         .then(res => {
    //             console.log(res.data);
    //         })
    // }, []);

    return (
        <div className='pt-[6rem] min-h-screen'>
            {UserObject.name}
        </div>
    )
}

export default Home