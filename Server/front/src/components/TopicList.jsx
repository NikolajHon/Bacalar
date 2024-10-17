import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import { toast } from 'react-toastify';
import '../styles/MainScreenStudent.css';

const TopicList = () => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const updatedData = data.map((element, index) => {
            const lessonId = `lessonProgress_${element.Link}`;
            const savedProgress = localStorage.getItem(lessonId);
            let progress = 0;

            if (savedProgress) {
                const { percent } = JSON.parse(savedProgress); // Извлекаем процент
                progress = percent;
            }

            return {
                ...element,
                progress: parseInt(progress, 10),
            };
        });
        setProgressData(updatedData);
    }, []); // Обновление при монтировании

    return (
        <div className="topic-list fade-in">
            <div className='colon'>
                <h1>Skills Progress</h1>
                <h4>The following courses should be taken in order</h4>
            </div>
            {progressData.map((element, index) => {
                const progress = element.progress || 0;
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
                                    strokeDasharray={`${progress}, 100`} // Используем процент прогресса
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
                                    Go to lesson
                                </Link>
                                <Link to={`/lessons/test/${index}`} className="test-link">
                                    Check your knowledge
                                </Link>
                                <Link to={`/lessons/tasks/${index}`} className="test-link">
                                    Tasks                    
                                </Link>
                                <Link to={`lessons/practice/${index}`} className="test-link">
                                    Practise
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
