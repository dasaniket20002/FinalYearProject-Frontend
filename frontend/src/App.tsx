import React from 'react';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App bg-black min-h-screen text-white font-montserrat">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Nav />}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
