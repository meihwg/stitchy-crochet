import React, { useEffect, useState } from 'react';
import './counters.scss';

import Counter from '../../windows/counter/counter';
import Reminder from '../../windows/reminders/reminder';
import Modal from '../../modal/modal';
import { defaultCounters, defaultReminders } from '../../../data/data';
import { useTranslation } from 'react-i18next';

interface CounterItem {
    id: number;
    title: string;
    description: string;
    value: number;
    translation: boolean;
}

interface ReminderItem {
    id: number;
    title: string;
    description: string;
    value: number;
    frequency: number;
    counterID: number;
    translation: boolean;
}

const Counters: React.FC = () => {
    const [counters, setCounters] = useState<CounterItem[]>([]);
    const [reminders, setReminders] = useState<ReminderItem[]>([]);
    const [isAddCounterModalOpen, setIsAddCounterModalOpen] = useState(false);
    const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
    const [newCounter, setNewCounter] = useState<{ title: string; description: string; translation: boolean }>({
        title: '',
        description: '',
        translation: false
    });
    const [newReminder, setNewReminder] = useState<{
        title: string;
        description: string;
        frequency: number;
        counterID: number;
        translation: boolean;
    }>({
        title: '',
        description: '',
        frequency: 1,
        counterID: -1,
        translation: false
    });

    /**
     * Ajoute un nouveau compteur
     * 
     * @param e : événement de soumission du formulaire
     */
    const handleAddCounter = (e: React.FormEvent) => {
        e.preventDefault();
        setCounters([...counters, { ...newCounter, value: 0, id: counters.length }]);
        setNewCounter({ title: '', description: '', translation: false });
        setIsAddCounterModalOpen(false);
    }

    /**
     * Supprime un compteur
     * 
     * @param index : index du compteur à supprimer
     */
    const removeCounter = (index: number) => {
        if (window.confirm('Are you sure you want to delete this counter and its associated reminders ?')) {
            setCounters(counters.filter((_, i) => i !== index));
            setReminders(reminders.filter(reminder => reminder.counterID !== counters[index].id));
        }
    }

    /**
     * Supprime un rappel
     * 
     * @param reminderId : id du rappel à supprimer
     */
    const removeReminder = (reminderId: number) => {
        if (window.confirm('Are you sure you want to delete this reminder ?')) {
            setReminders(reminders.filter(reminder => reminder.id !== reminderId));
        }
    }

    /**
     * Ajoute un nouveau rappel
     * 
     * @param e : événement de soumission du formulaire
     */
    const handleAddReminder = (e: React.FormEvent) => {
        e.preventDefault();
        setReminders([...reminders, { 
            ...newReminder, 
            value: newReminder.frequency - 1, 
            id: reminders.length 
        }]);
        setNewReminder({
            title: '',
            description: '',
            frequency: 1,
            counterID: -1,
            translation: false
        });
        setIsAddReminderModalOpen(false);
    }

    /**
     * Incrémente un compteur
     * 
     * @param index : index du compteur à incrémenter
     * @param value : valeur à incrémenter
     */
    const increment = (index: number, value: number = 1) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: counter.value + value } : counter));
        
        const counter = counters[index];
        setReminders(reminders.map(reminder => {
            if (reminder.counterID === counter.id) {
                const newValue = reminder.value - value;
                return { 
                    ...reminder, 
                    value: newValue < 0 ? reminder.frequency -1 : newValue
                };
            }
            return reminder;
        }));
    }

    /**
     * Décrémente un compteur
     * 
     * @param index : index du compteur à décrémenter
     * @param value : valeur à décrémenter
     */
    const decrement = (index: number, value: number = 1) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: counter.value - value } : counter));
        
        const counter = counters[index];
        setReminders(reminders.map(reminder => {
            if (reminder.counterID === counter.id) {
                const newValue = reminder.value + value;
                return { 
                    ...reminder, 
                    value: newValue > reminder.frequency -1 ? 0 : newValue
                };
            }
            return reminder;
        }));
    }

    /**
     * Met à jour la valeur d'un compteur
     * 
     * @param index : index du compteur à mettre à jour
     * @param value : valeur cible
     */
    const onUpdateCounter = (index: number, value: number) => {
        const oldValue = counters[index].value;
        const difference = value - oldValue;
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: value } : counter));
        
        const counter = counters[index];
        setReminders(reminders.map(reminder => {
            if (reminder.counterID === counter.id) {
                const newValue = reminder.value - difference;
                return { 
                    ...reminder, 
                    value: newValue < 0 ? reminder.frequency - 1 : (newValue > reminder.frequency - 1 ? 0 : newValue)
                };
            }
            return reminder;
        }));
    }

    /**
     * Réinitialise un compteur
     * 
     * @param index : index du compteur à réinitialiser
     */
    const reset = (index: number) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: 0 } : counter));

        const counter = counters[index];
        setReminders(reminders.map(reminder => {
            if (reminder.counterID === counter.id) {
                return { ...reminder, value: reminder.frequency - 1 };
            }
            return reminder;
        }));
    }

    /**
     * Met à jour la fréquence d'un rappel
     * 
     * @param reminderId : id du rappel à mettre à jour
     * @param change : valeur à changer
     */
    const updateReminderFrequency = (reminderId: number, change: number) => {
        setReminders(reminders.map(reminder => 
            reminder.id === reminderId 
                ? { ...reminder, frequency: Math.max(1, reminder.frequency + change), value: Math.max(1, reminder.frequency-1 + change) }
                : reminder
        ));
    }

    /**
     * Sauvegarde les compteurs dans le localStorage
     */
    const saveCounters = () => {
        localStorage.setItem('counters', JSON.stringify(counters));
    }

    /**
     * Charge les compteurs depuis le localStorage
     * si aucun compteur n'est trouvé, on initialise les compteurs par défaut
     */
    const loadCounters = () => {
        const savedCounters = localStorage.getItem('counters');
        if (savedCounters) {
            const parsedCounters = JSON.parse(savedCounters);
            if (parsedCounters && parsedCounters.length > 0) {
                setCounters(parsedCounters);
            } else {
                setCounters(defaultCounters);
            }
        } else {
            setCounters(defaultCounters);
        }
    }

    /**
     * Sauvegarde les rappels dans le localStorage
     */
    const saveReminders = () => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }

    /**
     * Charge les rappels depuis le localStorage
     * si aucun rappel n'est trouvé, on initialise les rappels par défaut
     */
    const loadReminders = () => {
        const savedReminders = localStorage.getItem('reminders');
        if (savedReminders) {
            const parsedReminders = JSON.parse(savedReminders);
            if (parsedReminders && parsedReminders.length > 0) {
                setReminders(parsedReminders);
            } else {
                setReminders(defaultReminders);
            }
        } else {
            setReminders(defaultReminders);
        }
    }

    /**
     * Charge les compteurs et les rappels depuis le localStorage lorsque le composant est monté
     */
    useEffect(() => {
        loadCounters();
        loadReminders();
    }, []);

    /**
     * Sauvegarde les compteurs dans le localStorage lorsque leurs valeurs changent
     */
    useEffect(() => {
        saveCounters();
    }, [counters]);

    /**
     * Sauvegarde les rappels dans le localStorage lorsque leurs valeurs changent
     */
    useEffect(() => {
        saveReminders();
    }, [reminders]);

    const { t } = useTranslation();

    return (
        <div className="dashboard">
            <div className="nav-secondary">
                <button onClick={() => setIsAddCounterModalOpen(true)} className="action-button">
                    {t('add_counter')}
                </button>
                <button onClick={() => setIsAddReminderModalOpen(true)} className="action-button">
                    {t('add_reminder')}
                </button>
            </div>
            <div className="counters-container">
                {counters.map((counter, index) => (
                    <div key={index} className="counter-group">
                        {counter.translation ?
                            <Counter 
                                title={t(counter.title)} 
                                description={t(counter.description)} 
                                value={counter.value} 
                                onIncrement={(value) => increment(index, value)} 
                                onDecrement={(value) => decrement(index, value)} 
                                onReset={() => reset(index)} 
                                onDelete={() => removeCounter(index)} 
                                onUpdate={(value) => onUpdateCounter(index, value)}
                            />
                            :
                            <Counter 
                                title={counter.title} 
                                description={counter.description} 
                                value={counter.value} 
                                onIncrement={(value) => increment(index, value)} 
                                onDecrement={(value) => decrement(index, value)} 
                                onReset={() => reset(index)} 
                                onDelete={() => removeCounter(index)} 
                                onUpdate={(value) => onUpdateCounter(index, value)}
                            />
                        }
                        {reminders
                            .filter(reminder => reminder.counterID === counter.id)
                            .map((reminder, reminderIndex) => (
                                reminder.translation ?
                                <Reminder 
                                    key={reminderIndex} 
                                    title={t(reminder.title)} 
                                    description={t(reminder.description)} 
                                    value={reminder.value}
                                    frequency={reminder.frequency}
                                    counterID={reminder.counterID}
                                    counterTitle={counter.title}
                                    onFrequencyChange={(change) => updateReminderFrequency(reminder.id, change)}
                                    onDelete={() => removeReminder(reminder.id)}
                                    counterTranslation={counter.translation}
                                />
                                : 
                                <Reminder 
                                    key={reminderIndex} 
                                    title={reminder.title} 
                                    description={reminder.description} 
                                    value={reminder.value}
                                    frequency={reminder.frequency}
                                    counterID={reminder.counterID}
                                    counterTitle={counter.title}
                                    onFrequencyChange={(change) => updateReminderFrequency(reminder.id, change)}
                                    onDelete={() => removeReminder(reminder.id)}
                                    counterTranslation={counter.translation}
                                />
                            ))
                        }
                    </div>
                ))}
            </div>

            <Modal 
                isOpen={isAddCounterModalOpen}
                onClose={() => setIsAddCounterModalOpen(false)}
                title={t('add_counter')}
            >
                <form onSubmit={handleAddCounter}>
                    <p>{t('add_counter_description')}
                        <br />
                        <br />
                        {t('add_counter_description_2')}
                    </p>
                    <div className="form-group">
                        <label htmlFor="counter-title">{t('counter_name')}</label>
                        <input
                            type="text"
                            id="counter-title"
                            value={newCounter.title}
                            onChange={(e) => setNewCounter({ ...newCounter, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="counter-description">{t('counter_description')}</label>
                        <textarea
                            id="counter-description"
                            value={newCounter.description}
                            onChange={(e) => setNewCounter({ ...newCounter, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-buttons">
                        <button 
                            type="button" 
                            className="secondary"
                            onClick={() => setIsAddCounterModalOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button type="submit" className="primary">
                            {t('add_counter')}
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal 
                isOpen={isAddReminderModalOpen}
                onClose={() => setIsAddReminderModalOpen(false)}
                title={t('add_reminder')}
            >
                <form onSubmit={handleAddReminder}>
                    <p>{t('add_reminder_description')}
                        <br />
                        <br />
                        {t('add_reminder_description_2')}
                    </p>
                    <div className="form-group">
                        <label htmlFor="reminder-title">{t('reminder_name')}</label>
                        <input
                            type="text"
                            id="reminder-title"
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder-description">{t('reminder_description')}</label>
                        <textarea
                            id="reminder-description"
                            value={newReminder.description}
                            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder-frequency">{t('reminder_frequency')}</label>
                        <input
                            type="number"
                            id="reminder-frequency"
                            min="1"
                            value={newReminder.frequency}
                            onChange={(e) => setNewReminder({ ...newReminder, frequency: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder-counter">{t('reminder_counter')}</label>
                        <select
                            id="reminder-counter"
                            value={newReminder.counterID}
                            onChange={(e) => setNewReminder({ ...newReminder, counterID: parseInt(e.target.value) })}
                            required
                        >
                            <option value="-1">{t('select_counter')}</option>
                            {counters.map((counter, index) => (
                                <option key={index} value={index}>
                                    {counter.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-buttons">
                        <button 
                            type="button" 
                            className="secondary"
                            onClick={() => setIsAddReminderModalOpen(false)}
                        >
                            {t('cancel')}
                        </button>
                        <button 
                            type="submit" 
                            className="primary"
                            disabled={newReminder.counterID === -1}
                        >
                            {t('add_reminder')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Counters; 