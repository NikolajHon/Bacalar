import React from 'react';
import data from '../data/TopicListData';
import '../styles/Forum.css';

const TopicSwitcher = ({ selectedTopic, onSelectTopic }) => {
    return (
        <div className="topic-switcher">
            <ul className="topic-list">
                {data.map((topic, index) => {
                    const id = index + 1;
                    return (
                        <li key={id} className="topic-item-switch">
                            <button
                                className={`topic-button ${selectedTopic === id ? 'selected' : ''} id-${id}`}
                                onClick={() => onSelectTopic(id)}
                            >
                                {topic.h3}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TopicSwitcher;
