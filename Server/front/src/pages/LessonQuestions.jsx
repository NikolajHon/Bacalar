import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LessonQuestions = () => {
    const { lessonId } = useParams(); 
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/lesson/${lessonId}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [lessonId]);

    return (
        <div className="questions-container">
            <h2>Questions for Lesson {lessonId}</h2>
            {questions.map((question, index) => (
                <div key={index} className="question-item">
                    <h3>{question.text}</h3>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default LessonQuestions;
