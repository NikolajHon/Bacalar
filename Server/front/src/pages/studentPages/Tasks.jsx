import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppBar from "../../components/AppBar";
import { UserContext } from "../../contexts/UserContext";
import MonacoEditor from "@monaco-editor/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../styles/Task.module.css";

const Tasks = () => {
    const { id } = useParams();
    console.log("ID lekcie z URL:", id);
    const { user } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [solutions, setSolutions] = useState({});
    const [grade, setGrade] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [notification, setNotification] = useState(null);

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        publicationTime: "",
        deadline: "",
        lessonId: id,
    });
    const [loading, setLoading] = useState(true);

    const handleOutsideClick = (e) => {
        if (e.target.className.includes("modalOverlay")) {
            setShowModal(false);
        }
    };

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/tasks/getByLesson/${id}`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Chyba pri načítavaní úloh:", error);
                setLoading(false);
            });

        if (user.id) {
            axios
                .get(`http://localhost:8080/api/solutions?userId=${user.id}&lessonId=${id}`)
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
                    console.error("Chyba pri načítavaní riešení:", error);
                });
        }
    }, [id, user.id]);

    const handleSolutionChange = (taskId, value) => {
        setSolutions((prevSolutions) => ({
            ...prevSolutions,
            [taskId]: value,
        }));
    };

    const handleSubmitSolution = (taskId) => {
        if (!user.id) {
            return;
        }

        const solution = {
            content: solutions[taskId] || "",
            creationTime: new Date().toISOString(),
            taskId: taskId,
            userId: user.id,
            grade: 0,
        };

        axios
            .post("http://localhost:8080/api/solutions", solution)
            .then(() => {
                console.log("Riešenie odoslané");
                showNotification("Riešenie bolo úspešne odoslané!");
            })
            .catch((error) => {
                console.error("Chyba pri odosielaní riešenia:", error);
                showNotification("Chyba pri odosielaní riešenia", "error");
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
            showNotification("Vyplňte všetky polia", "error");
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
                setTasks([...tasks, response.data]);
                setShowModal(false);
                setNewTask({
                    title: "",
                    description: "",
                    publicationTime: "",
                    deadline: "",
                    lessonId: id,
                });
                showNotification("Úloha bola úspešne pridaná!");
            })
            .catch((error) => {
                console.error("Chyba pri pridávaní úlohy:", error);
                showNotification("Nepodarilo sa pridať úlohu", "error");
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
            .then(() => {
                setTasks(tasks.filter((task) => task.id !== selectedTaskId));
                showNotification("Úloha bola úspešne odstránená!");
            })
            .catch((error) => {
                console.error("Chyba pri odstraňovaní úlohy:", error);
                showNotification("Nepodarilo sa odstrániť úlohu", "error");
            });
    };

    if (loading) {
        return <p>Načítavanie...</p>;
    }

    return (
        <div>
            <AppBar />

            {notification && (
                <div
                    className={`${styles.notification} ${
                        notification.type === "error" ? styles.error : styles.success
                    }`}
                >
                    {notification.message}
                </div>
            )}

            <div className={styles.taskContainer}>
                <h1>Úlohy pre lekciu {+id+1}</h1>

                {tasks.map((task) => (
                    <div key={task.id} className={styles.taskItem}>
                        <h2>{task.title}</h2>
                        <h4>{task.description}</h4>

                        {user.role === "ROLE_TEACHER" ? (
                            <button
                                className={styles.customDeleteButton}
                                onClick={() => handleDeleteClick(task.id)}
                            >
                                ODSTRÁNIŤ ÚLOHU
                            </button>
                        ) : (
                            <div>
                                <div className={styles.editorContainer}>
                                    <MonacoEditor
                                        className="monaco-editor"
                                        language="c"
                                        theme="vs-dark"
                                        value={solutions[task.id] || ""}
                                        options={{ automaticLayout: true }}
                                        onChange={(value) =>
                                            handleSolutionChange(task.id, value)
                                        }
                                    />
                                </div>

                                <button
                                    className={styles.newTaskButton}
                                    onClick={() => handleSubmitSolution(task.id)}
                                >
                                    Odoslať kód
                                </button>
                            </div>
                        )}
                    </div>
                ))}

                {user.role === "ROLE_TEACHER" && (
                    <>
                        <button
                            className={styles.newTaskButton}
                            onClick={() => setShowModal(true)}
                        >
                            Pridať novú úlohu
                        </button>

                        {showModal && (
                            <div
                                className={styles.modalOverlay}
                                onClick={handleOutsideClick}
                            >
                                <div className={styles.modalContentTask}>
                                    <h2>Pridať novú úlohu</h2>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder="Názov"
                                            value={newTask.title}
                                            onChange={handleInputChange}
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <div
                                        name="description"
                                        contentEditable="true"
                                        onInput={(e) => {
                                            const value = e.target.innerText;
                                            handleInputChange({
                                                target: {
                                                    name: "description",
                                                    value: value,
                                                },
                                            });
                                        }}
                                        className={`${styles.formInput} ${styles.formTextarea}`}
                                        style={{ minHeight: "100px" }}
                                    >
                                        {newTask.description}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <input
                                            type="datetime-local"
                                            name="deadline"
                                            placeholder="Termín"
                                            value={newTask.deadline}
                                            onChange={handleInputChange}
                                            className={styles.formInput}
                                        />
                                    </div>
                                    <button
                                        onClick={handleCreateTask}
                                        className={styles.newTaskButton}
                                    >
                                        VYTVORIŤ ÚLOHU
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className={styles.newTaskButton}
                                    >
                                        SPÄŤ
                                    </button>
                                </div>
                            </div>
                        )}

                        <Dialog
                            open={openDialog}
                            onClose={() => setOpenDialog(false)}
                        >
                            <DialogTitle>Potvrdiť odstránenie</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Ste si istí, že chcete odstrániť túto úlohu?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>
                                    Zrušiť
                                </Button>
                                <Button onClick={handleConfirmDelete} color="error">
                                    Odstrániť
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tasks;
