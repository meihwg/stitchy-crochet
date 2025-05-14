import React from 'react';
import './header.scss';

const Header: React.FC = () => {
    return (
        <>
            <header>
                <h1>Stitchy</h1>
                -
                <h4>Your crochet friend</h4>
            </header>
            <div className="header-nav">
                <ul>
                    <li>
                        <button>Add a counter</button>
                    </li>
                    <li>
                        <button>Add a counter</button>
                    </li>
                    <li>
                        <button>Add a counter</button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Header;
