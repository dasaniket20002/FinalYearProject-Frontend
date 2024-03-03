import React, { useEffect } from 'react';
import './App.css';
import Navigator from './components/Navigator';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';
import { grained } from './ts/grained';

function App() {

    const LinkToHome = 'home';
    const LinkToService = 'services';
    const LinkToAboutUs = 'aboutus';
    const LinkToSignUp = 'signup';

    useEffect(() => {
        var options = {
            "animate": true,
            "patternWidth": 256,
            "patternHeight": 256,
            "grainOpacity": 0.1,
            "grainDensity": 2,
            "grainWidth": 2,
            "grainHeight": 1
        }
        setTimeout(() => grained('#grainedContainer', options), 150);
    }, [])


    return (
        <div className="App bg-black min-h-screen text-white font-montserrat">
            <div id='grainedContainer' className='fixed w-screen h-screen pointer-events-none z-[100]' />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigator LinkToHome={LinkToHome} LinkToService={LinkToService} LinkToAboutUs={LinkToAboutUs} LinkToSignUp={LinkToSignUp} />} >
                        <Route path='/' element={<LandingPage />} />
                        <Route path={LinkToHome} element={<Home />} />
                        <Route path={LinkToService} element={<Services />} />
                        <Route path={LinkToAboutUs} element={<AboutUs />} />
                        <Route path={LinkToSignUp} element={<SignUp />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div >
    );
}

export default App;
