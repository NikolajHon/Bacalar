import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/LessonQuestions.css';
import AppBar from '../components/AppBar'

const LessonQuestions = () => {
    const { lessonId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/lesson/${lessonId}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [lessonId]);

    const handleChange = (e, questionId) => {
        setAnswers({
            ...answers,
            [questionId]: e.target.value
        });
    };

    const checkAnswers = () => {
        const newFeedback = {};
        questions.forEach((question) => {
            if (answers[question.id] && answers[question.id].trim().toLowerCase() === question.answer.toLowerCase()) {
                newFeedback[question.id] = "Correct!";
            } else {
                newFeedback[question.id] = `Incorrect! Correct answer: ${question.answer}`;
            }
        });
        setFeedback(newFeedback);
    };

    return (
        <div className="questions-container">
            <AppBar/>
            <h2>Questions for Lesson {lessonId}</h2>
            {questions.map((question, index) => (
                <div key={index} className="question-item">
                    <h3>{question.text}</h3>
                    <input
                        type="text"
                        value={answers[question.id] || ''}
                        onChange={(e) => handleChange(e, question.id)}
                    />
                    {feedback[question.id] && (
                        <p>{feedback[question.id]}</p>
                    )}
                </div>
            ))}
            <button onClick={checkAnswers}>Check Answers</button>
        </div>
    );
};

export default LessonQuestions;
