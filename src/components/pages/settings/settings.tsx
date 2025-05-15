import React from 'react';
import './settings.scss';

import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="settings">
            <div className="settings-container">
                <h2>{t('settings')}</h2>
                <p>{t('settings_description')}</p>
            </div>
        </div>
    );
}

export default Settings; 