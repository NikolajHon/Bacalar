import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from '../StudentList';
import buchek from '../../../images/buchek.jpg'
import other from '../../../images/logo.png'
import './CarouselCard.css';

const Slider = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStudentListOpen, setIsStudentListOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/groups')
            .then(response => {
                console.log('Data received from backend:', response.data);
                setData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleClick = (index) => {
        if (index === currentIndex) {
            setIsStudentListOpen(true);
        } else {
            setCurrentIndex(index);
        }
        console.log(`ID группы: ${data[index].id}, ID учителя: ${data[index].teacher.username}`);
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

    return (
        <div className="groups-carousel dark-theme">
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
                                <span>Index: {index + 1}</span>
                                <span>Card ID: {item.id}</span>
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
