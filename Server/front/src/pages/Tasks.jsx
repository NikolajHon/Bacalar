import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/LessonQuestions.css';
import AppBar from '../components/AppBar';
import { UserContext } from '../contexts/UserContext';
import MonacoEditor from "@monaco-editor/react";

const Tasks = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [solutions, setSolutions] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tasks?lessonId=${id}`)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении заданий:', error);
            });
    }, [id]);

    const handleSolutionChange = (taskId, value) => {
        setSolutions(prevSolutions => ({
            ...prevSolutions,
            [taskId]: value
        }));
    };

    const handleSubmitSolution = (taskId) => {
        if (!user.id) {
            alert("Необходимо войти в систему для отправки решения.");
            return;
        }

        const solution = {
            content: solutions[taskId] || '',
            creationTime: new Date().toISOString(),
            taskId: taskId,
            userId: user.id
        };

        axios.post('http://localhost:8080/api/solutions', solution)
            .then(response => {
                alert('Решение отправлено успешно');
                setSolutions(prevSolutions => ({
                    ...prevSolutions,
                    [taskId]: ''
                }));
            })
            .catch(error => {
                console.error('Ошибка при отправке решения:', error);
                alert('Не удалось отправить решение.');
            });
    };

    return (
        <div className='main-container'>
            <div>
                <AppBar />
            </div>
            
            <div className='questions-container'>
                <h1>Questions for Lesson {id}</h1>
                {tasks.map(task => (
                    <div key={task.id} className='question-item'>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <MonacoEditor
                            height="200px"
                            language="javascript"
                            theme="vs-dark"
                            value={solutions[task.id] || ''}
                            onChange={(value) => handleSolutionChange(task.id, value)}
                            options={{ minimap: { enabled: false } }}
                        />
                        <button onClick={() => handleSubmitSolution(task.id)}>Check Answers</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
