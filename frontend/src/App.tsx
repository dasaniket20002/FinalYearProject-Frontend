import React from 'react';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import SignUp from './components/SignUp';
import LandingPage from './components/LandingPage';

function App() {

    const LinkToHome = 'home';
    const LinkToService = 'services';
    const LinkToAboutUs = 'aboutus';
    const LinkToSignUp = 'signup';

    return (
        <div className="App bg-black min-h-screen text-white font-montserrat">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Nav LinkToHome={LinkToHome} LinkToService={LinkToService} LinkToAboutUs={LinkToAboutUs} LinkToSignUp={LinkToSignUp} />} >
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
