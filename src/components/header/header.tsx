import React from 'react';
import './header.scss';
import { HashRouter as Router, Route, Routes, NavLink } from "react-router-dom";

// Import des composants de pages
import Home from '../pages/home/home';
import Counters from '../pages/counters/counters';
import Sheets from '../pages/sheets/sheets';
import Settings from '../pages/settings/settings';
import About from '../pages/about/about';

import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();

    const switchTo = (lang: string) => i18n.changeLanguage(lang);

    return (
        <Router>
            <header>
                <div className="header-title">
                    <h1>Stitchy</h1> -
                    <h4>{t('description')}</h4>
                </div>
                <div className="header-nav">
                    <ul>
                        <li><NavLink to="/" end className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            {t('home')}</NavLink>
                        </li>
                        <li><NavLink to="/counters" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            {t('counters')}</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sheets" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            {t('sheets')}</NavLink>
                        </li>
                        <li><NavLink to="/settings" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            {t('settings')}</NavLink>
                        </li>
                        <li><NavLink to="/about" className={({ isActive }: { isActive: boolean }) => isActive ? 'active' : ''}>
                            {t('about')}</NavLink>
                        </li>
                        <li>
                            <div className="language-selector">
                                <button onClick={() => switchTo('en')} className={i18n.language === 'en' ? 'active' : ''} title="Switch to English"><div className="icon-uk"></div></button>
                                <button onClick={() => switchTo('fr')} className={i18n.language === 'fr' ? 'active' : ''} title="Passer à français"><div className="icon-fr"></div></button>
                            </div>
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
