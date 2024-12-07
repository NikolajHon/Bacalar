import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import { UserContext } from '../../contexts/UserContext';
import QuestionTable from '../../components/QuestionTable';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/LessonQuestions.module.css';

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
                console.error('Chyba pri načítaní otázok:', error);
            }
        };

        fetchQuestions();

        // Nastavenie počiatočnej témy
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
                newFeedback[question.id] = 'Správne!';
                correctAnswersCount++;
            } else {
                newFeedback[question.id] = `Nesprávne! Správna odpoveď: ${question.answer}`;
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
                console.log('Hodnotenie bolo aktualizované:', newRating);
            })
            .catch((error) => {
                console.error('Chyba pri aktualizácii hodnotenia:', error.response || error.message);
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
        } catch (error) {
            console.error('Chyba pri odstraňovaní otázky:', error);
        }
    };

    const handleAddQuestion = async () => {
        if (!newQuestion.text || !newQuestion.answer) {
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
        } catch (error) {
            console.error('Chyba pri pridávaní otázky:', error);
        }
    };

    return (
        <div className={styles.lessonQuestions}>
            <AppBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <div className={styles.mainContent}>
                <div className={styles.navigation}>
                    <h3>Navigácia po teste</h3>
                    <QuestionTable
                        questions={questions}
                        answers={answers}
                        feedback={feedback}
                        onHighlight={handleHighlight}
                    />
                </div>
                <div className={styles.questionsSection}>
                    <h2>Otázky pre lekciu {+lessonId+1}</h2>
                    {questions.map((question) => (
                        <div
                            key={question.id}
                            id={`question-${question.id}`}
                            className={`${styles.questionItem} ${
                                highlightedQuestion === question.id ? styles.highlight : ''
                            }`}
                        >
                            <h3>{question.text}</h3>
                            {role === 'null' ? (
                                <>
                                    <input
                                        className={styles.inputField}
                                        type="text"
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(e, question.id)}
                                    />
                                    {showAnswers && feedback[question.id] && (
                                        <p className={styles.feedback}>{feedback[question.id]}</p>
                                    )}
                                </>
                            ) : (
                                <>
                                    <p>Odpoveď: {question.answer}</p>
                                    {role === 'ROLE_TEACHER' && (
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDelete(question.id)}
                                        >
                                            Odstrániť úlohu
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    {role === 'null' && (
                        <button className={styles.checkAnswersButton} onClick={checkAnswers}>
                            Skontrolovať odpovede
                        </button>
                    )}
                    {role === 'ROLE_TEACHER' && (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setShowAddModal(true)}
                                className={styles.addQuestionButton}
                            >
                                Pridať novú otázku
                            </Button>

                            <Dialog open={showAddModal} onClose={() => setShowAddModal(false)}>
                                <DialogTitle>Pridať novú otázku</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        name="text"
                                        label="Otázka"
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
                                        label="Odpoveď"
                                        type="text"
                                        fullWidth
                                        value={newQuestion.answer}
                                        onChange={(e) =>
                                            setNewQuestion({ ...newQuestion, answer: e.target.value })
                                        }
                                    />
                                </DialogContent>
                                <DialogActions className={styles.dialogActions}>
                                    <Button onClick={() => setShowAddModal(false)}>Zrušiť</Button>
                                    <Button onClick={handleAddQuestion}>Pridať otázku</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LessonQuestions;
