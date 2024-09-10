import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../styles/Tasks.css";
import AppBar from "../../components/AppBar";
import { UserContext } from "../../contexts/UserContext";
import MonacoEditor from "@monaco-editor/react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [solutions, setSolutions] = useState({});
    const [grade, setGrade] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        publicationTime: "",
        deadline: "",
        lessonId: id,
    });
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        setLoading(true); // Включаем загрузку перед началом получения данных
        axios
            .get(`http://localhost:8080/api/tasks?lessonId=${id}`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false); // Отключаем загрузку после получения данных
            })
            .catch((error) => {
                console.error("Ошибка при получении заданий:", error);
                toast.error("Ошибка при получении заданий.");
                setLoading(false); // Отключаем загрузку даже в случае ошибки
            });
    
        if (user.id) {
            axios
                .get(`http://localhost:8080/api/solutions?userId=${user.id}&taskid=${id}`)
                .then((response) => {
                    const userSolutions = response.data;
                    const formattedSolutions = {};
                    const formattedGrade = {};
    
                    userSolutions.forEach((solution) => {
                        const taskId = solution.id;
                        if (taskId) {
                            formattedSolutions[taskId] = solution.content;
                            formattedGrade[taskId] = solution.grade;
                        }
                    });
                    setSolutions(formattedSolutions);
                    setGrade(formattedGrade);
                })
                .catch((error) => {
                    console.error("Ошибка при получении решений:", error);
                    toast.error("Ошибка при получении решений.");
                });
        }
    }, [id, user.id]); // Депенденси должны включать id и user.id
    
    const handleSolutionChange = (taskId, value) => {
        setSolutions((prevSolutions) => ({
            ...prevSolutions,
            [taskId]: value,
        }));
    };

    const handleSubmitSolution = (taskId) => {
        if (!user.id) {
            toast.error("Необходимо войти в систему для отправки решения.");
            return;
        }

        const solution = {
            content: solutions[taskId] || "",
            creationTime: new Date().toISOString(),
            taskId: taskId,
            userId: user.id,
            grade: 0,
        };

        console.log(
            "Отправляемый JSON на бэкэнд:",
            JSON.stringify(solution, null, 2)
        );

        axios
            .post("http://localhost:8080/api/solutions", solution)
            .then((response) => {
                toast.success("Решение отправлено успешно");
            })
            .catch((error) => {
                console.error("Ошибка при отправке решения:", error);
                toast.error("Не удалось отправить решение.");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateTask = () => {
        if (!newTask.title || !newTask.description || !newTask.deadline) {
            toast.error("Пожалуйста, заполните все поля.");
            return;
        }

        const currentTime = new Date().toISOString();
        axios
            .post("http://localhost:8080/api/tasks", {
                ...newTask,
                publicationTime: currentTime,
                lessonId: id,
            })
            .then((response) => {
                toast.success("Задание создано успешно");
                setTasks([...tasks, response.data]);
                setShowModal(false);
                setNewTask({
                    title: "",
                    description: "",
                    publicationTime: "",
                    deadline: "",
                    lessonId: id,
                });
            })
            .catch((error) => {
                console.error("Ошибка при создании задания:", error);
                toast.error("Не удалось создать задание.");
            });
    };

    const handleDeleteClick = (taskId) => {
        setSelectedTaskId(taskId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        setOpenDialog(false);
        axios
            .delete(`http://localhost:8080/api/tasks/${selectedTaskId}`)
            .then((response) => {
                toast.success("Задание удалено успешно");
                setTasks(tasks.filter((task) => task.id !== selectedTaskId));
            })
            .catch((error) => {
                console.error("Ошибка при удалении задания:", error);
                toast.error("Не удалось удалить задание.");
            });
    };

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="main-container">
            <AppBar />
            <div className="task-container">
                <h1>
                    {user.role === "ROLE_TEACHER"
                        ? `Задания для урока ${id}`
                        : `Questions for Lesson ${id}`}
                </h1>

                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        {solutions[task.id] ? (
                            user.role !== "ROLE_TEACHER" ? (
                                grade[task.id] !== undefined ? (
                                    <p className="mark">{grade[task.id]}</p>
                                ) : (
                                    <p>You dont have mark</p>
                                )
                            ) : (
                                <p></p>
                            )
                        ) : (
                            <p>Нет решения</p>
                        )}

                        <h2>{task.title}</h2>
                        <p>{task.description}</p>

                        {user.role === "ROLE_TEACHER" ? (
                            <>
                                    <button
                                        className="custom-delete-button"
                                        onClick={() => handleDeleteClick(task.id)}
                                    >
                                        DELETE TASK
                                    </button>
                            </>
                        ) : (
                            <>
                                <MonacoEditor
                                    height="300px"
                                    language="c"
                                    theme="vs-dark"
                                    value={solutions[task.id] || ""}
                                    onChange={(value) => handleSolutionChange(task.id, value)}
                                    options={{
                                        selectOnLineNumbers: true,
                                        autoClosingBrackets: "always",
                                        autoClosingQuotes: "always",
                                        formatOnType: true,
                                        wordWrap: "on",
                                        suggestOnTriggerCharacters: true,
                                        minimap: { enabled: false },
                                        quickSuggestions: {
                                            other: true,
                                            comments: true,
                                            strings: true,
                                        },
                                        parameterHints: { enabled: true },
                                        tabCompletion: "on",
                                    }}
                                />

                                <button onClick={() => handleSubmitSolution(task.id)}>
                                    Send Code
                                </button>
                            </>
                        )}
                    </div>
                ))}

                {user.role === "ROLE_TEACHER" && (
                    <>
                        <button onClick={() => setShowModal(true)}>
                            Добавить новое задание
                        </button>

                        {showModal && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2 style={{ textAlign: "center", color: "#fff" }}>
                                        Добавить новое задание
                                    </h2>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Заголовок"
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="description"
                                            placeholder="Описание"
                                            value={newTask.description}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="datetime-local"
                                            name="deadline"
                                            placeholder="Крайний срок"
                                            value={newTask.deadline}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                    <button onClick={handleCreateTask} className="modal-button">
                                        CREATE TASK
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="modal-button"
                                    >
                                        BACK
                                    </button>
                                </div>
                            </div>
                        )}

                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                            <DialogTitle>Confirm Delete</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete this task?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button onClick={handleConfirmDelete} color="error">
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <ToastContainer />
                    </>
                )}
            </div>
        </div>
    );
};

export default Tasks;
