import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../styles/Tasks.css';
import AppBar from '../../components/AppBar';
import { UserContext } from '../../contexts/UserContext';
import MonacoEditor from "@monaco-editor/react";

// Import Material-UI components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';

// Import react-toastify components and styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [solutions, setSolutions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        publicationTime: '', // Removed from UI, set dynamically
        deadline: '',
        lessonId: id
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/tasks?lessonId=${id}`)
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении заданий:', error);
                toast.error('Ошибка при получении заданий.');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateTask = () => {
        if (!newTask.title || !newTask.description || !newTask.deadline) {
            toast.error('Пожалуйста, заполните все поля.');
            return;
        }

        const currentTime = new Date().toISOString();
        axios.post('http://localhost:8080/api/tasks', { ...newTask, publicationTime: currentTime })
            .then(response => {
                toast.success('Задание создано успешно');
                setTasks([...tasks, response.data]);
                setShowModal(false);
                setNewTask({
                    title: '',
                    description: '',
                    publicationTime: '',
                    deadline: '',
                    lessonId: id
                });
            })
            .catch(error => {
                console.error('Ошибка при создании задания:', error);
                toast.error('Не удалось создать задание.');
            });
    };

    const handleDeleteClick = (taskId) => {
        setSelectedTaskId(taskId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        setOpenDialog(false);
        axios.delete(`http://localhost:8080/api/tasks/${selectedTaskId}`)
            .then(response => {
                toast.success('Задание удалено успешно');
                setTasks(tasks.filter(task => task.id !== selectedTaskId));
                setOpenSnackbar(true);
            })
            .catch(error => {
                console.error('Ошибка при удалении задания:', error);
                toast.error('Не удалось удалить задание.');
            });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <div className='main-container'>
            <AppBar />
            <div className='task-container'>
                <h1>{user.role === 'teacher' ? `Задания для урока ${id}` : `Questions for Lesson ${id}`}</h1>

                {tasks.map(task => (
                    <div key={task.id} className='task-item'>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>

                        {user.role === 'ROLE_TEACHER' ? (
                            <>
                                <div className='button-container'>
                                    <button
                                        className="custom-delete-button"
                                        onClick={() => handleDeleteClick(task.id)}
                                    >
                                        DELETE TASK
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <MonacoEditor
                                    height="200px"
                                    language="javascript"
                                    theme="vs-dark"
                                    value={solutions[task.id] || ''}
                                    onChange={(value) => handleSolutionChange(task.id, value)}
                                    options={{ minimap: { enabled: false } }}
                                />
                                <button onClick={() => handleSubmitSolution(task.id)}>Check Answers</button>
                            </>
                        )}
                    </div>
                ))}

                {user.role === 'ROLE_TEACHER' && (
                    <>
                        <button onClick={() => setShowModal(true)}>Добавить новое задание</button>

                        {showModal && (
                            <div className='modal'>
                                <div className='modal-content'>
                                    <h2 style={{ textAlign: 'center', color: '#fff' }}>Добавить новое задание</h2>
                                    <div className="form-group">
                                        <input
                                            type='text'
                                            name='title'
                                            placeholder='Заголовок'
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name='description'
                                            placeholder='Описание'
                                            value={newTask.description}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type='datetime-local'
                                            name='deadline'
                                            placeholder='Крайний срок'
                                            value={newTask.deadline}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <button onClick={handleCreateTask} className="modal-button">
                                        Создать задание
                                    </button>
                                    <button onClick={() => setShowModal(false)} className="modal-button">
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        )}

                        <Dialog
                            open={openDialog}
                            onClose={() => setOpenDialog(false)}
                        >
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this task?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                            </DialogActions>
                        </Dialog>

                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={6000}
                            onClose={handleCloseSnackbar}
                            message="Task deleted successfully"
                        />

                        <ToastContainer />
                    </>
                )}
            </div>
        </div>
    );
};

export default Tasks;
