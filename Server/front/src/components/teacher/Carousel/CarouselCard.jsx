import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import StudentList from '../StudentList'; 
import './CarouselCard.css';

const Slider = () => {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStudentListOpen, setIsStudentListOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/groups')
            .then(response => setData(response.data))
            .catch(error => console.error('Ошибка при получении данных:', error));
    }, []);
  
    const handleClick = (index) => {
        if (index === currentIndex) {
            setIsStudentListOpen(true); 
        } else {
            setCurrentIndex(index); 
        }
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
            <h1>List of Cards</h1>
            <div className="slider-container">
                <button className="slider-button prev" onClick={prevSlide}>
                    &lt;
                </button>
                <div className="slider">
                    {data.map((item, index) => (
                        <div
                            key={item.id}
                            className={`slider-card group-card ${  
                                index === currentIndex
                                    ? 'active'
                                    : index === getPrevIndex()
                                    ? 'prev'
                                    : index === getNextIndex()
                                    ? 'next'
                                    : 'hidden'
                            }`}
                            onClick={() => handleClick(index)}
                        >
                            <div className="group-title">{item.content}</div>
                            <div className="group-meta">
                                <span>Index: {index + 1}</span>
                                <span>Card ID: {item.id}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="slider-button next" onClick={nextSlide}>
                    &gt;
                </button>
            </div>
            {isStudentListOpen && (
                <StudentList groupId={data[currentIndex].id} onClose={closeStudentList} />
            )}
        </div>
    );
};
  
export default Slider;
