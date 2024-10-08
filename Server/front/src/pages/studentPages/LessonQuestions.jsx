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
    const [newQuestion, setNewQuestion] = useState({ text: '', answer: '', lessonId: lessonId });
    const [showAnswers, setShowAnswers] = useState(false);  // Добавляем состояние для отображения ответов
    const [isDarkMode, setIsDarkMode] = useState(false); // Состояние для переключения темы

    const role = user?.role;  // Получаем роль пользователя из контекста

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

        // Устанавливаем начальную тему в зависимости от сохраненных настроек пользователя
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            setIsDarkMode(true);
        }
    }, [lessonId]);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

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
        setShowAnswers(true);  // Показать ответы после проверки

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

    const handleDelete = async (questionId) => {
        if (role !== 'ROLE_TEACHER') return; // Только учитель может удалять

        try {
            await axios.delete(`http://localhost:8080/api/questions/${questionId}`);
            setQuestions(questions.filter(question => question.id !== questionId));
            toast.success('Вопрос удален успешно');
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error('Не удалось удалить вопрос.');
        }
    };

    const handleAddQuestion = async () => {
        if (!newQuestion.text || !newQuestion.answer) {
            toast.error('Пожалуйста, заполните все поля.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/questions`, [{
                text: newQuestion.text,
                answer: newQuestion.answer,
                lessonId: lessonId
            }]);

            setQuestions([...questions, ...response.data]);
            setNewQuestion({ text: '', answer: '', lessonId: lessonId });
            setShowAddModal(false);
            toast.success('Вопрос добавлен успешно');
        } catch (error) {
            console.error('Error adding question:', error);
            toast.error('Не удалось добавить вопрос.');
        }
    };

    return (
        <div className='main-questions'>
            <AppBar />
            <div className="navigation">
                <h3>Навигация в тесте</h3>
                <QuestionTable questions={questions} answers={answers} feedback={feedback} onHighlight={handleHighlight} />
            </div>
            <div className="questions-section">
                <h2>Questions for Lesson {lessonId}</h2>
                {questions.map((question) => (
                    <div key={question.id} id={`question-${question.id}`} className={`question-item ${highlightedQuestion === question.id ? 'highlight' : ''}`}>
                        <h3>{question.text}</h3>
                        {role === 'null' ? (
                            <>
                                <input
                                    type="text"
                                    value={answers[question.id] || ''}
                                    onChange={(e) => handleChange(e, question.id)}
                                />
                                {showAnswers && feedback[question.id] && (  // Показываем ответ только после нажатия кнопки "Check Answers"
                                    <p className="feedback">{feedback[question.id]}</p>
                                )}
                            </>
                        ) : (
                            <>
                                <p>Ответ: {question.answer}</p>
                                {role === 'ROLE_TEACHER' && (
                                    <button
                                    className='custom-delete-button'
                                        onClick={() => handleDelete(question.id)}>
                                        DELETE TASK
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                ))}
                {role === 'null' && (
                    <button onClick={checkAnswers}>Check Answers</button>
                )}
                {role === 'ROLE_TEACHER' && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowAddModal(true)}
                            style={{ margin: '5px', padding: '5px 10px' }}
                        >
                            ADD NEW QUESTION
                        </Button>

                        <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
                            <DialogTitle>ADD NEW QUESTION</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="text"
                                    label="Вопрос"
                                    type="text"
                                    fullWidth
                                    value={newQuestion.text}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                />
                                <TextField
                                    margin="dense"
                                    name="answer"
                                    label="Ответ"
                                    type="text"
                                    fullWidth
                                    value={newQuestion.answer}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setShowAddModal(false)} color="primary">
                                    Отмена
                                </Button>
                                <Button onClick={handleAddQuestion} color="primary">
                                    ADD NEW QUESTION
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>

        </div>
    );
};

export default LessonQuestions;
