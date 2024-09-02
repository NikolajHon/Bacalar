import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import '../styles/teacher/MainScreenTeacher.css'; // Создайте или измените существующий CSS файл

const TopicListTeacher = () => {
    return (
        <div className="topic-list fade-in">
            <div className='colon'>
                <h1>Skills Progress</h1>
                <h4>The following courses should be taken in order</h4>
            </div>
            {data.map((element, index) => {
                return (
                    <div className="topic-item" key={index}>
                        {/* Удален блок с кругом прогресса */}
                        <div className="topic-content">
                            <h3>{element.h3}</h3>
                            <p>{element.p}</p>
                            <div className="link-container">
                                <Link to={`/teacher/lessons/${element.Link}`} className="lesson-link">
                                    Перейти к уроку
                                </Link>
                                <Link to={`/teacher/lessons/test/${index}`} className="test-link">
                                    Check your knowledge
                                </Link>
                                <Link to={`/teacher/lessons/tasks/${index}`} className="test-link">
                                    Tasks                    
                                </Link>
                                <Link to={`/teacher/lessons/practice/${index}`} className="test-link">
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

export default TopicListTeacher;
