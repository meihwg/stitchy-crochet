import React, { useState, useMemo } from 'react';
import './sheets.scss';

import { sheets } from '../../../data/datasheets';

interface Sheet {
    id: number;
    abbreviation: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
}

const Sheets: React.FC = () => {
    // État pour les tags sélectionnés
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    // État pour la recherche
    const [searchQuery, setSearchQuery] = useState('');

    // Filtrer les sheets en fonction des tags sélectionnés et de la recherche
    const filteredSheets = useMemo(() => {
        return sheets.filter(sheet => {
            // Filtre par tags
            const matchesTags = selectedTags.length === 0 || 
                selectedTags.every(tag => sheet.tags.includes(tag));
            
            // Filtre par recherche
            const matchesSearch = searchQuery === '' || 
                sheet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sheet.abbreviation.toLowerCase().includes(searchQuery.toLowerCase());
            
            return matchesTags && matchesSearch;
        });
    }, [selectedTags, searchQuery]);

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
                    Type :
                    <button key="stitch" className={`action-button ${selectedTags.includes("stitch") ? 'active' : ''}`}
                            onClick={() => toggleTag("stitch")}> Stitch </button>
                    <button key="technic" className={`action-button ${selectedTags.includes("technic") ? 'active' : ''}`}
                            onClick={() => toggleTag("technic")}> Technic </button>
                </div>
                <div className="nav-secondary-buttons"> 
                    Difficulty :
                    <button key="basic" className={`action-button ${selectedTags.includes("basic") ? 'active' : ''}`}
                            onClick={() => toggleTag("basic")}> Basic </button>
                    <button key="intermediate" className={`action-button ${selectedTags.includes("intermediate") ? 'active' : ''}`}
                            onClick={() => toggleTag("intermediate")}> Intermediate </button>
                </div>
            </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            <div className="sheets-container">
                {filteredSheets.map((sheet) => (
                    <div key={sheet.id} className="sheet">
                        <div className="sheet-header">
                            <h2>{sheet.title}</h2>
                            <span className="sheet-abbreviation">{sheet.abbreviation}</span>
                        </div>
                        <div className="sheet-description">
                            <div dangerouslySetInnerHTML={{ __html: sheet.description }} />
                        </div>
                        <div className="sheet-image">
                            <img src={sheet.image} alt={sheet.title} />
                        </div>
                        <div className="sheet-tags">
                            {sheet.tags.map((tag) => (
                                <span 
                                    key={tag} 
                                    className={selectedTags.includes(tag) ? 'active' : ''}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
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