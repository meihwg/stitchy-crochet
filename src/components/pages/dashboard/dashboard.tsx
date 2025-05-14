import React, { useEffect, useState } from 'react';
import './dashboard.scss';

import Counter from '../../windows/counter/counter';
import Reminder from '../../windows/reminders/reminder';
import Modal from '../../modal/modal';
import { defaultCounters, defaultReminders } from '../../../data/data';

interface CounterItem {
    id: number;
    title: string;
    description: string;
    value: number;
}

interface ReminderItem {
    id: number;
    title: string;
    description: string;
    value: number;
    frequency: number;
    counterID: number;
}

const Dashboard: React.FC = () => {
    const [counters, setCounters] = useState<CounterItem[]>([]);
    const [reminders, setReminders] = useState<ReminderItem[]>([]);
    const [isAddCounterModalOpen, setIsAddCounterModalOpen] = useState(false);
    const [isAddReminderModalOpen, setIsAddReminderModalOpen] = useState(false);
    const [newCounter, setNewCounter] = useState<{ title: string; description: string }>({
        title: '',
        description: ''
    });
    const [newReminder, setNewReminder] = useState<{
        title: string;
        description: string;
        frequency: number;
        counterID: number;
    }>({
        title: '',
        description: '',
        frequency: 1,
        counterID: -1
    });

    const handleAddCounter = (e: React.FormEvent) => {
        e.preventDefault();
        setCounters([...counters, { ...newCounter, value: 0, id: counters.length }]);
        setNewCounter({ title: '', description: '' });
        setIsAddCounterModalOpen(false);
    }

    const removeCounter = (index: number) => {
        setCounters(counters.filter((_, i) => i !== index));
    }

    const handleAddReminder = (e: React.FormEvent) => {
        e.preventDefault();
        setReminders([...reminders, { ...newReminder, value: 2, id: reminders.length }]);
        setNewReminder({
            title: '',
            description: '',
            frequency: 1,
            counterID: -1
        });
        setIsAddReminderModalOpen(false);
    }

    const increment = (index: number, value: number = 1) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: counter.value + value } : counter));
        
        const counter = counters[index];
        setReminders(reminders.map(reminder => {
            if (reminder.counterID === counter.id) {
                const newValue = reminder.value - value;
                return { 
                    ...reminder, 
                    value: newValue < 0 ? reminder.frequency : newValue 
                };
            }
            return reminder;
        }));
    }

    const decrement = (index: number, value: number = 1) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: counter.value - value } : counter));
        
        const counter = counters[index];
        setReminders(reminders.map(reminder => 
            reminder.counterID === counter.id 
                ? { ...reminder, value: Math.min(reminder.frequency, reminder.value + value) }
                : reminder
        ));
    }

    const reset = (index: number) => {
        setCounters(counters.map((counter, i) => i === index ? { ...counter, value: 0 } : counter));
    }

    const updateReminderFrequency = (reminderId: number, change: number) => {
        setReminders(reminders.map(reminder => 
            reminder.id === reminderId 
                ? { ...reminder, frequency: Math.max(1, reminder.frequency + change), value: Math.max(1, reminder.frequency + change) }
                : reminder
        ));
    }

    const saveCounters = () => {
        localStorage.setItem('counters', JSON.stringify(counters));
    }

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

    const saveReminders = () => {
        localStorage.setItem('reminders', JSON.stringify(reminders));
    }

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

    useEffect(() => {
        loadCounters();
        loadReminders();
    }, []);

    useEffect(() => {
        saveCounters();
    }, [counters]);

    useEffect(() => {
        saveReminders();
    }, [reminders]);

    return (
        <div className="dashboard">
            <div className="dashboard-actions">
                <button onClick={() => setIsAddCounterModalOpen(true)} className="action-button">
                    Ajouter un compteur
                </button>
                <button onClick={() => setIsAddReminderModalOpen(true)} className="action-button">
                    Ajouter un rappel
                </button>
            </div>
            <div className="counters-container">
                {counters.map((counter, index) => (
                    <div key={index} className="counter-group">
                        <Counter 
                            title={counter.title} 
                            description={counter.description} 
                            value={counter.value} 
                            onIncrement={(value) => increment(index, value)} 
                            onDecrement={(value) => decrement(index, value)} 
                            onReset={() => reset(index)} 
                            onDelete={() => removeCounter(index)} 
                        />
                        {reminders
                            .filter(reminder => reminder.counterID === counter.id)
                            .map((reminder, reminderIndex) => (
                                <Reminder 
                                    key={reminderIndex} 
                                    title={reminder.title} 
                                    description={reminder.description} 
                                    value={reminder.value}
                                    frequency={reminder.frequency}
                                    counterID={reminder.counterID}
                                    counterTitle={counter.title}
                                    onFrequencyChange={(change) => updateReminderFrequency(reminder.id, change)}
                                />
                            ))
                        }
                    </div>
                ))}
            </div>

            <Modal 
                isOpen={isAddCounterModalOpen}
                onClose={() => setIsAddCounterModalOpen(false)}
                title="Ajouter un compteur"
            >
                <form onSubmit={handleAddCounter}>
                    <div className="form-group">
                        <label htmlFor="counter-title">Nom du compteur</label>
                        <input
                            type="text"
                            id="counter-title"
                            value={newCounter.title}
                            onChange={(e) => setNewCounter({ ...newCounter, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="counter-description">Description</label>
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
                            Annuler
                        </button>
                        <button type="submit" className="primary">
                            Ajouter
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal 
                isOpen={isAddReminderModalOpen}
                onClose={() => setIsAddReminderModalOpen(false)}
                title="Ajouter un rappel"
            >
                <form onSubmit={handleAddReminder}>
                    <div className="form-group">
                        <label htmlFor="reminder-title">Nom du rappel</label>
                        <input
                            type="text"
                            id="reminder-title"
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder-description">Description</label>
                        <textarea
                            id="reminder-description"
                            value={newReminder.description}
                            onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reminder-frequency">Fréquence (nombre de rangs)</label>
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
                        <label htmlFor="reminder-counter">Compteur associé</label>
                        <select
                            id="reminder-counter"
                            value={newReminder.counterID}
                            onChange={(e) => setNewReminder({ ...newReminder, counterID: parseInt(e.target.value) })}
                            required
                        >
                            <option value="-1">Sélectionnez un compteur</option>
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
                            Annuler
                        </button>
                        <button 
                            type="submit" 
                            className="primary"
                            disabled={newReminder.counterID === -1}
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Dashboard; 