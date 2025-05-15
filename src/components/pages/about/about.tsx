import React from 'react';
import './about.scss';

import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="about">
            <div className="about-container">
                <h2>{t('about')}</h2>
                <p>{t('about_description')}</p>
            </div>
        </div>
    );
}

export default About; 