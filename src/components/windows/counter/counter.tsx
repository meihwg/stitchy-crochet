import React from 'react';
import './counter.scss';

import { PencilSimple, PencilSimpleLine, PlusCircle, Trash } from '@phosphor-icons/react';

interface CounterProps {
    title: string;
    description: string;
    value: number;
    onIncrement: (value?: number) => void;
    onDecrement: (value?: number) => void;
    onReset: () => void;
    onDelete: () => void;
}

const Counter: React.FC<CounterProps> = ({ title, description, value, onIncrement, onDecrement, onReset, onDelete }) => {
    return <div className="counter">
        <div className="counter-header">
            <div className="counter-header-spacer"></div>
            <h2>{title}</h2>
            <button className="delete-button" onClick={onDelete}>
                <Trash size={20} weight="bold" />
            </button>
        </div>
        <p>{description}</p>
        <div className="counter-value">{value}</div>
        <div>
            <div className="counter-buttons">
                <button onClick={onReset}>Reset</button>
                <button onClick={() => onDecrement()}>-</button>
                <button onClick={() => onIncrement()}>+</button>
            </div>
            <div className="counter-buttons-secondary">
                <button onClick={() => onDecrement(5)}>-5</button>
                <button onClick={() => onDecrement(10)}>-10</button>
                <button onClick={() => onDecrement(50)}>-50</button>
                <button onClick={() => onIncrement(5)}>+5</button>
                <button onClick={() => onIncrement(10)}>+10</button>
                <button onClick={() => onIncrement(50)}>+50</button>
            </div>
        </div>
    </div>;
};

export default Counter;