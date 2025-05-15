import React, { useState, useMemo, useEffect } from 'react';
import './sheets.scss';

import { sheets } from '../../../data/datasheets';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface Sheet {
    id: number;
    abbreviation: {
        [key: string]: string;
    };
    title: string;
    description: string;
    image: string;
    tags: string[];
}

const Sheets: React.FC = () => {
    const { t, i18n } = useTranslation();

    // État pour les tags sélectionnés
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // État pour la recherche
    const [searchQuery, setSearchQuery] = useState('');
    // État pour la notation
    const [notation, setNotation] = useState<'us' | 'uk' | 'fr'>(i18n.language === 'fr' ? 'fr' : 'uk');

    // Mettre à jour la notation quand la langue change
    useEffect(() => {
        setNotation(i18n.language === 'fr' ? 'fr' : 'us');
    }, [i18n.language]);

    // Filtrer les sheets en fonction des tags sélectionnés et de la recherche
    const filteredSheets = useMemo(() => {
        return sheets.filter(sheet => {
            // Filtre par tags
            const matchesTags = selectedTags.length === 0 || 
                selectedTags.every(tag => sheet.tags.includes(tag));

            const searchLower = searchQuery.toLowerCase();
            
            // Filtre par recherche
            const matchesSearch = searchQuery === '' || 
                t(sheet.title).toLowerCase().includes(searchLower) ||
                (sheet.abbreviation[notation]?.toLowerCase() || '').includes(searchLower);
            
            return matchesTags && matchesSearch;
        });
    }, [selectedTags, searchQuery, notation, t, i18n.language]);

    // Gérer la sélection/désélection des tags
    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    return (
        <div className="sheets">
            <div className="nav-secondary">
                <div className="nav-secondary-buttons"> 
                    {t('type')} :
                    <button key="stitch" className={`action-button ${selectedTags.includes("stitch") ? 'active' : ''}`}
                            onClick={() => toggleTag("stitch")}> {t('stitch')} </button>
                    <button key="technic" className={`action-button ${selectedTags.includes("technic") ? 'active' : ''}`}
                            onClick={() => toggleTag("technic")}> {t('technic')} </button>
                </div>
                <div className="nav-secondary-buttons"> 
                    {t('difficulty')} :
                    <button key="basic" className={`action-button ${selectedTags.includes("basic") ? 'active' : ''}`}
                            onClick={() => toggleTag("basic")}> {t('basic')} </button>
                    <button key="intermediate" className={`action-button ${selectedTags.includes("intermediate") ? 'active' : ''}`}
                            onClick={() => toggleTag("intermediate")}> {t('intermediate')} </button>
                </div>
                <div className="nav-secondary-buttons">
                    {t('notation')} :
                    <button className={`action-button ${notation === 'us' ? 'active' : ''}`}
                            onClick={() => setNotation('us')}>US</button>
                    <button className={`action-button ${notation === 'uk' ? 'active' : ''}`}
                            onClick={() => setNotation('uk')}>UK</button>
                    <button className={`action-button ${notation === 'fr' ? 'active' : ''}`}
                            onClick={() => setNotation('fr')}>FR</button>
                </div>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder={t('search_by_name')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="sheets-container">
                {filteredSheets.map((sheet) => (
                    <div key={sheet.id} className="sheet">
                        <div className="sheet-header">
                            <h2>{t(sheet.title)}</h2>
                            <span className="sheet-abbreviation">{sheet.abbreviation[notation] || ''}</span>
                        </div>
                        <div className="sheet-description">
                            <div dangerouslySetInnerHTML={{ __html: t(sheet.description) }} />
                        </div>
                        <div className="sheet-image">
                            <img src={sheet.image} alt={t(sheet.title)} />
                        </div>
                        <div className="sheet-tags">
                            {sheet.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className={selectedTags.includes(tag) ? 'active' : ''}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {t(tag)}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sheets;