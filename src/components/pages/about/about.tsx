import React from 'react';
import './about.scss';

import { useTranslation } from 'react-i18next';

import { GithubLogo, TwitterLogo, Envelope, Link, InstagramLogo } from '@phosphor-icons/react';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="about">
            <div className="about-container">
                <h2>{t('about')}</h2>
                <p className="about-description" dangerouslySetInnerHTML={{ __html: t('about_description') }} />
                <h4>{t('contact')}</h4>
                <p>
                    Here's my contact information :
                    <br />
                    <a href="https://github.com/meihwg" className="contact-link"><GithubLogo className="icon" size={20} /> Github</a> 
                    <a href="#" className="contact-link"><TwitterLogo className="icon" size={20} /> Twitter</a> 
                    <a href="#" className="contact-link"><InstagramLogo className="icon" size={20} /> {t('instagram')}</a> 
                    <a href="#" className="contact-link"><Link className="icon" size={20} /> {t('website')}</a> 
                    <a href="mailto:laureenbelgrand.dev@gmail.com" className="contact-link"><Envelope className="icon" size={20} /> Mail : laureenbelgrand.dev@gmail.com</a> 
                </p>
            </div>
        </div>
    );
}

export default About; 