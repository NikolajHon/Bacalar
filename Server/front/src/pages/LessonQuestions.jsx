import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/LessonQuestions.css';
import AppBar from '../components/AppBar';
import { UserContext } from '../contexts/UserContext';
import QuestionTable from '../components/QuestionTable';

const LessonQuestions = () => {
    const { lessonId } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [highlightedQuestion, setHighlightedQuestion] = useState(null);

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
        let correctAnswersCount = 0;
        const newFeedback = {};

        questions.forEach((question) => {
            if (answers[question.id] && answers[question.id].trim().toLowerCase() === question.answer.toLowerCase()) {
                newFeedback[question.id] = "Correct!";
                correctAnswersCount++;
            } else {
                newFeedback[question.id] = `Incorrect! Correct answer: ${question.answer}`;
            }
        });

        setFeedback(newFeedback);

        const ratingIncrease = correctAnswersCount * 5;
        const newRating = ratingIncrease;

        axios.post(`http://localhost:8080/api/users/changeRating?userId=${user.id}&ratingChange=${ratingIncrease}`)
            .then((response) => {
                setUser({ ...user, rating: newRating });
                console.log('Rating updated:', newRating);
            })
            .catch((error) => {
                console.error('Error updating rating:', error.response || error.message);
            });

    };

    const handleHighlight = (questionId) => {
        setHighlightedQuestion(questionId);
        setTimeout(() => {
            setHighlightedQuestion(null);
        }, 2000);
    };

    return (
        <div className='main-questions'>
            <div className='app-bar'>
                <AppBar />
            </div>
            <div className="navigation">
                <h3>Навигация в тесте</h3>
                <QuestionTable questions={questions} answers={answers} feedback={feedback} onHighlight={handleHighlight} />
            </div>
            <div className="questions-section">
                <h2>Questions for Lesson {lessonId}</h2>
                {questions.map((question) => (
                    <div key={question.id} id={`question-${question.id}`} className={`question-item ${highlightedQuestion === question.id ? 'highlight' : ''}`}>
                        <h3>{question.text}</h3>
                        <input
                            type="text"
                            value={answers[question.id] || ''}
                            onChange={(e) => handleChange(e, question.id)}
                        />
                        {feedback[question.id] && (
                            <p className="feedback">{feedback[question.id]}</p>
                        )}
                    </div>
                ))}
                <button onClick={checkAnswers}>Check Answers</button>
            </div>
        </div>
    );
};

export default LessonQuestions;
