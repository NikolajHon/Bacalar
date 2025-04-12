import React, { useState, useEffect, useContext } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import ErrorMessage from '../components/Error/ErrorMessage';
import styles from '../styles/CodeExecution.module.css';

const CodeExecution = ({ practiceId }) => {
    const [code, setCode] = useState('');
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState('');
    const [taskText, setTaskText] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchTaskTextAndDifficulty = async () => {
            try {
                if (practiceId) {
                    const response = await axios.get(`http://localhost:8080/api/practices/${practiceId}`);
                    setTaskText(response.data.description);
                    setDifficulty(response.data.difficulty);
                } else {
                    console.error('practiceId is undefined');
                    setError('Practice ID не определен.');
                }
            } catch (error) {
                console.error('Error fetching task text', error);
                setError('Ошибка при получении текста задачи.');
            }
        };

        if (practiceId) {
            fetchTaskTextAndDifficulty();
        }
    }, [practiceId]);

    const handleSubmit = async () => {
        try {
            if (practiceId) {
                const response = await axios.post(`http://localhost:8080/api/execute/${practiceId}`, {
                    code,
                    userId: user.id,
                });

                const result = response.data;
                setResults(result);

                const allPassed = result.every(test => test.correct);
                if (allPassed) {
                    setStatus('Success: Все тесты пройдены успешно!');
                    awardPoints();
                } else {
                    setStatus('Error: Не все тесты пройдены. Проверьте свой код.');
                }
            } else {
                console.error('practiceId is undefined');
                setError('Practice ID не определен.');
            }
        } catch (error) {
            console.error('Error executing code!', error);
            setStatus('Error: Произошла ошибка при выполнении кода.');
            setError('Ошибка при выполнении кода. Попробуйте еще раз.');
        }
    };

    const awardPoints = async () => {
        let points = difficulty === 'EASY' ? 5 : difficulty === 'MEDIUM' ? 10 : 15;

        try {
            await axios.post('http://localhost:8080/api/users/changeRating', null, {
                params: {
                    userId: user.id,
                    ratingChange: points,
                },
            });
            console.log(`User awarded ${points} points`);
        } catch (error) {
            console.error('Error awarding points', error);
            setError('Ошибка при начислении очков пользователю.');
        }
    };

    return (
        <div className={styles.codeExecutionContainer}>
            <div className={styles.taskText}>
                <h2>Task Description:</h2>
                <p>{taskText}</p>
            </div>

            {error && <ErrorMessage message={error} type="error" />}

            <CodeMirror
                value={code}
                height="400px"
                extensions={[cpp()]}
                theme={vscodeDark}
                onChange={(value) => setCode(value)}
                className={styles.codeEditor}
            />

            <button onClick={handleSubmit} className={styles.runButton}>Run</button>

            <div className={styles.testResults}>
                <h2>Test Results:</h2>
                {results.map((result, index) => (
                    <div key={index} className={`${styles.testResult} ${result.correct ? styles.passed : styles.failed}`}>
                        <h3>Test {index + 1}: {result.correct ? 'Passed' : 'Failed'}</h3>
                        <p><strong>Input:</strong> {result.input}</p>
                        <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
                        <p><strong>Actual Output:</strong> {result.output}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodeExecution;
