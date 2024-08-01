import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import '../styles/MainScreen.css'; // Make sure to link to the appropriate CSS file

const TopicList = () => {
    return (
        <div className="topic-list fade-in">
            <div className='colon'>
                <h1>Skills Progress</h1>
                <h4>The following courses should be taken in order</h4>
            </div>
            {data.map((element, index) => {
                const progress = element.progress || 0; // Use progress from data or default to 0
                return (
                    <div className="topic-item" key={index}>
                        <div className="progress-circle">
                            <svg viewBox="0 0 36 36">
                                <path
                                    className="circle-bg"
                                    d="M18 2.0845
                                       a 15.9155 15.9155 0 0 1 0 31.831
                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="circle"
                                    strokeDasharray={`${progress}, 100`}
                                    d="M18 2.0845
                                       a 15.9155 15.9155 0 0 1 0 31.831
                                       a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className="percentage">{progress}%</span>
                        </div>
                        <div className="topic-content">
                            <h3>{element.h3}</h3>
                            <p>{element.p}</p>
                            <div className="link-container">
                                <Link to={`/lessons/${element.Link}`} className="lesson-link">
                                    Перейти к уроку
                                </Link>
                                <Link to={`/lessons/test/${index}`} className="test-link">
                                    Check your knowledge
                                </Link>
                                <Link to={`/lessons/tasks/${index}`} className="test-link">
                                    Tasks                    
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TopicList;
