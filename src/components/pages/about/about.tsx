import React from 'react';
import './about.scss';

const About: React.FC = () => {
    return (
        <div className="about">
            <h1>À propos de Stitchy</h1>
            <div className="about-content">
                <p>Stitchy est votre assistant de crochet qui vous aide à :</p>
                <ul>
                    <li>Suivre vos rangs avec des compteurs</li>
                    <li>Configurer des rappels pour vos motifs</li>
                    <li>Organiser vos projets de crochet</li>
                </ul>
            </div>
        </div>
    );
}

export default About; 