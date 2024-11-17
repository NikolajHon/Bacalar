import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import { FaArrowRight, FaBook, FaCheckCircle, FaTasks, FaFlask } from 'react-icons/fa'; // Импорт иконок
import '../styles/teacher/TopicListTeacher.css';

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
                        <div className="topic-content">
                            <h3>{element.h3}</h3>
                            <p>{element.p}</p>
                            <div className="link-container">
                                <Link to={`/lessons/${element.Link}`} className="lesson-link">
                                    <FaBook /> Go to Lesson
                                </Link>
                                <Link to={`/lessons/test/${index}`} className="test-link">
                                    <FaCheckCircle /> Check your knowledge
                                </Link>
                                <Link to={`/lessons/tasks/${index}`} className="test-link">
                                    <FaTasks /> Tasks
                                </Link>
                                <Link to={`/lessons/practice/${index}`} className="test-link">
                                    <FaFlask /> Practise
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
