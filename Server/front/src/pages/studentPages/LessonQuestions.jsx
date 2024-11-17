import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/LessonQuestions.css';
import AppBar from '../../components/AppBar';
import { UserContext } from '../../contexts/UserContext';
import QuestionTable from '../../components/QuestionTable';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LessonQuestions = () => {
    const { lessonId } = useParams();
    const { user, setUser } = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [feedback, setFeedback] = useState({});
    const [highlightedQuestion, setHighlightedQuestion] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ text: '', answer: '', lessonId });
    const [showAnswers, setShowAnswers] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const role = user?.role;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/lesson/${lessonId}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке вопросов:', error);
            }
        };

        fetchQuestions();

        // Устанавливаем начальную тему
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            setIsDarkMode(true);
        }
    }, [lessonId]);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    const handleAnswerChange = (e, questionId) => {
        setAnswers({
            ...answers,
            [questionId]: e.target.value,
        });
    };

    const checkAnswers = () => {
        let correctAnswersCount = 0;
        const newFeedback = {};

        questions.forEach((question) => {
            if (
                answers[question.id] &&
                answers[question.id].trim().toLowerCase() === question.answer.toLowerCase()
            ) {
                newFeedback[question.id] = 'Верно!';
                correctAnswersCount++;
            } else {
                newFeedback[question.id] = `Неверно! Правильный ответ: ${question.answer}`;
            }
        });

        setFeedback(newFeedback);
        setShowAnswers(true);

        const ratingIncrease = correctAnswersCount * 5;
        const newRating = user.rating + ratingIncrease;

        axios
            .post(`http://localhost:8080/api/users/changeRating?userId=${user.id}&ratingChange=${ratingIncrease}`)
            .then(() => {
                setUser({ ...user, rating: newRating });
                console.log('Рейтинг обновлен:', newRating);
            })
            .catch((error) => {
                console.error('Ошибка при обновлении рейтинга:', error.response || error.message);
            });
    };

    const handleHighlight = (questionId) => {
        setHighlightedQuestion(questionId);
        setTimeout(() => {
            setHighlightedQuestion(null);
        }, 2000);
    };

    const handleDelete = async (questionId) => {
        if (role !== 'ROLE_TEACHER') return;

        try {
            await axios.delete(`http://localhost:8080/api/questions/${questionId}`);
            setQuestions(questions.filter((question) => question.id !== questionId));
            toast.success('Вопрос успешно удален');
        } catch (error) {
            console.error('Ошибка при удалении вопроса:', error);
            toast.error('Не удалось удалить вопрос.');
        }
    };

    const handleAddQuestion = async () => {
        if (!newQuestion.text || !newQuestion.answer) {
            toast.error('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/questions`, [
                {
                    text: newQuestion.text,
                    answer: newQuestion.answer,
                    lessonId: lessonId,
                },
            ]);

            setQuestions([...questions, ...response.data]);
            setNewQuestion({ text: '', answer: '', lessonId: lessonId });
            setShowAddModal(false);
            toast.success('Вопрос успешно добавлен');
        } catch (error) {
            console.error('Ошибка при добавлении вопроса:', error);
            toast.error('Не удалось добавить вопрос.');
        }
    };

    return (
        <div className="lesson-questions">
            <AppBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <div className="main-content">
                <div className="navigation">
                    <h3>Навигация по тесту</h3>
                    <QuestionTable
                        questions={questions}
                        answers={answers}
                        feedback={feedback}
                        onHighlight={handleHighlight}
                    />
                </div>
                <div className="questions-section">
                    <h2>Вопросы для урока {lessonId}</h2>
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            id={`question-${question.id}`}
                            className={`question-item ${highlightedQuestion === question.id ? 'highlight' : ''}`}
                        >
                            <h3>{question.text}</h3>
                            {role === 'null' ? (
                                <>
                                    <input
                                        type="text"
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(e, question.id)}
                                    />
                                    {showAnswers && feedback[question.id] && (
                                        <p className="feedback">{feedback[question.id]}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>Ответ: {question.answer}</p>
                                    {role === 'ROLE_TEACHER' && (
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(question.id)}
                                        >
                                            Удалить задачу
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    {role === 'null' && (
                        <button className="check-answers-button" onClick={checkAnswers}>
                            Проверить ответы
                        </button>
                    )}
                    {role === 'ROLE_TEACHER' && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowAddModal(true)}
                                className="add-question-button"
                            >
                                Добавить новый вопрос
                            </Button>

                            <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
                                <DialogTitle>Добавить новый вопрос</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="text"
                                        label="Вопрос"
                                        type="text"
                                        fullWidth
                                        value={newQuestion.text}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, text: e.target.value })
                                        }
                                    />
                                    <TextField
                                        margin="dense"
                                        name="answer"
                                        label="Ответ"
                                        type="text"
                                        fullWidth
                                        value={newQuestion.answer}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, answer: e.target.value })
                                        }
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setShowAddModal(false)} color="primary">
                                        Отмена
                                    </Button>
                                    <Button onClick={handleAddQuestion} color="primary">
                                        Добавить вопрос
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LessonQuestions;
