import React from 'react';
import './home.scss';

import { WarningCircle } from '@phosphor-icons/react';

const Home: React.FC = () => {
    return (
        <div className="home">
            <div className="home-container">
           
                <h2><div className="icon-uk"></div>Welcome to Stitchy!</h2>
                <h4>Your friendly crochet assistant</h4>
                <p className="description">
                    Stitchy is a useful crochet tool. It provides you with a set of tools to help you in your crochet journey.
                    <br />
                    With Stitchy, you can:
                    <ul>
                        <li>Create how many counters you want, it can helps you count rows or stitches.</li>
                        <li>Create reminders for your counters, for exemple you can use it to remind you to do increases/decreases each X stitches.</li>
                        <li>... More features coming soon !</li>
                    </ul>
                </p>
                
                <h2><div className="icon-fr"></div>Bienvenue sur Stitchy ! </h2>
                <h4>Votre super assistant crochet</h4>
                <p className="description">
                    Stitchy est un outil multifonction pour le crochet. Il vous fournit un ensemble d'outils pour vous aider dans votre passion du crochet.
                    <br />
                    Avec Stitchy, vous pouvez:
                    <ul>
                        <li>Créer autant de compteurs que vous voulez, pour vous aider à compter les rangs ou les mailles.</li>
                        <li>Créer des rappels pour vos compteurs, par exemple vous pouvez l'utiliser pour vous rappeler de faire des augmentations/diminutions toutes les X mailles.</li>
                        <li>... Plus de fonctionnalités à venir !</li>
                    </ul>
                </p>

                <hr />
                            
                <h3>What's new ?</h3>
                <p>
                    <span><span><WarningCircle size={24} weight="duotone" color="var(--color-primary)" className="warning-icon" />14/05/2025 </span> - Created the cheat sheet page</span>
                    <span><span><WarningCircle size={24} weight="duotone" color="var(--color-primary)" className="warning-icon" />14/05/2025 </span> - Created the counters page</span>
                    <span><span><WarningCircle size={24} weight="duotone" color="var(--color-primary)" className="warning-icon" />14/05/2025 </span> - Added all the pages</span>
                    <span><span><WarningCircle size={24} weight="duotone" color="var(--color-primary)" className="warning-icon" />14/05/2025 </span> - Created the base code</span>
                </p>
            </div>
        </div>
    );
}

export default Home; 