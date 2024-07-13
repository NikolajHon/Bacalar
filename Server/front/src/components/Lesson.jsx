// src/components/Lesson.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Lesson = () => {
    const { id } = useParams();
    const [lessonContent, setLessonContent] = useState('');

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/topics/${id}`);
                setLessonContent(response.data.content);
            } catch (error) {
                console.error('Error fetching lesson', error);
            }
        };

        fetchLesson();
    }, [id]);

    return (
        <div className="lesson">
            <h2>Lesson {id}</h2>
            <p>{lessonContent}</p>
        </div>
    );
};

export default Lesson;
