import React from 'react';
import './reminder.scss';

import { Trash } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';

interface ReminderProps {
    title: string;
    description: string;
    value: number;
    frequency: number;
    counterID: number;
    counterTitle: string;
    onFrequencyChange: (change: number) => void;
    onDelete: () => void;
    counterTranslation: boolean;
}

const Reminder: React.FC<ReminderProps> = ({ 
    title, 
    description, 
    value, 
    frequency, 
    counterID, 
    counterTitle, 
    onFrequencyChange,
    onDelete,
    counterTranslation
}) => {
    const { t } = useTranslation();

    return (
        <div className={`reminder ${value === 0 ? 'alert' : ''}`}>
            <div className="reminder-header">
                <h3>{title}</h3>
                <button className="delete-button" onClick={onDelete}>
                    <Trash size={20} weight="bold" />
                </button>
            </div>
            <p>{description}</p>
            <div className="reminder-info">
                <div className="frequency-control">
                    <button onClick={() => onFrequencyChange(-1)} disabled={frequency <= 1}>-</button>
                    <span>{t('each')} <p>{frequency}</p> {counterTranslation ? t(counterTitle) : counterTitle}</span>
                    <button onClick={() => onFrequencyChange(1)}>+</button>
                </div>
                <span className="reminder-value">{value}</span>
            </div>
        </div>
    );
};

export default Reminder;
