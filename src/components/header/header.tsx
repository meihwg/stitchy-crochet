import React from 'react';
import './header.scss';
import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";

// Import des composants de pages
import Home from '../pages/home/home';
import Counters from '../pages/counters/counters';
import Sheets from '../pages/sheets/sheets';
import Settings from '../pages/settings/settings';
import About from '../pages/about/about';

const Header: React.FC = () => {
    return (
        <Router>
            <header>
                <div className="header-title">
                    <h1>Stitchy</h1> -
                    <h4>Your crochet friend</h4>
                </div>
                <div className="header-nav">
                    <ul>
                        <li><NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            Home</NavLink>
                        </li>
                        <li><NavLink to="/counters" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            Counters</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sheets" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            Cheat sheets</NavLink>
                        </li>
                        <li><NavLink to="/settings" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            Settings</NavLink>
                        </li>
                        <li><NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            About</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/counters" element={<Counters />} />
                <Route path="/sheets" element={<Sheets />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default Header;
