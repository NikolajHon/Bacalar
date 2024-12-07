import React, { useState } from 'react';
import StudentList from '../StudentList';
import buchek from '../../../images/buchek.jpg';
import other from '../../../images/logo.png';
import './CarouselCard.css';

const Slider = () => {
    const [data, setData] = useState([
        {
            id: 1,
            content: 'Math Group 101',
            teacher: {
                username: 'Buchek',
            },
        },
        {
            id: 2,
            content: 'Physics Group 201',
            teacher: {
                username: 'Smith',
            },
        },
        {
            id: 3,
            content: 'Chemistry Group 301',
            teacher: {
                username: 'Johnson',
            },
        },
        {
            id: 4,
            content: 'Biology Group 401',

            teacher: {
                username: 'Williams',
            },
        },
    ]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStudentListOpen, setIsStudentListOpen] = useState(false);

    const handleClick = (index) => {
        if (index === currentIndex) {
            setIsStudentListOpen(true);
        } else {
            setCurrentIndex(index);
        }
        console.log(`ID группы: ${data[index].id}, Преподаватель: ${data[index].teacher.username}`);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const getPrevIndex = () => {
        return currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    };

    const getNextIndex = () => {
        return currentIndex === data.length - 1 ? 0 : currentIndex + 1;
    };

    const closeStudentList = () => {
        setIsStudentListOpen(false);
    };

    const [isDarkTheme, setIsDarkTheme] = useState(false); // Темная тема

    return (
        <div className={`groups-carousel ${isDarkTheme ? 'dark-theme' : ''}`}>
            <div className="slider-container">
                <div className="slider">
                    {data.map((item, index) => (
                        <div
                            key={item.id}
                            className={`slider-card group-card ${index === currentIndex
                                ? 'active'
                                : index === getPrevIndex()
                                    ? 'prev'
                                    : index === getNextIndex()
                                        ? 'next'
                                        : 'hidden'
                            }`}
                            onClick={() => handleClick(index)}
                        >
                            <img
                                src={
                                    item.teacher.username === 'Buchek'
                                        ? buchek
                                        : other
                                }
                                alt={item.teacher.username}
                                className="teacher-image"
                            />
                            <div className="group-title">{item.content}</div>
                            <div className="group-meta">
                                <strong>Index: {index + 1}</strong>
                                <strong>Card ID: {item.id}</strong>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isStudentListOpen && (
                <StudentList
                    groupId={data[currentIndex].id}
                    onClose={closeStudentList}
                />
            )}
        </div>
    );
};

export default Slider;
