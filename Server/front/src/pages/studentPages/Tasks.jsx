import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import "../../styles/Tasks.css";
import AppBar from "../../components/AppBar";
import {UserContext} from "../../contexts/UserContext";
import MonacoEditor from "@monaco-editor/react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Tasks = () => {
    const {id} = useParams();
    const {user} = useContext(UserContext);
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8080/api/tasks?lessonId=${id}`)
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Chyba pri získavaní úloh:", error);
                setLoading(false);
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
                    console.error("Chyba pri získavaní riešení:", error);
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

        console.log(
            "Odosielané JSON na server:",
            JSON.stringify(solution, null, 2)
        );

        axios
            .post("http://localhost:8080/api/solutions", solution)
            .then((response) => {
            })
            .catch((error) => {
                console.error("Chyba pri odosielaní riešenia:", error);
            });
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateTask = () => {
        if (!newTask.title || !newTask.description || !newTask.deadline) {
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
            })
            .catch((error) => {
                console.error("Chyba pri vytváraní úlohy:", error);
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
                setTasks(tasks.filter((task) => task.id !== selectedTaskId));
            })
            .catch((error) => {
                console.error("Chyba pri odstraňovaní úlohy:", error);
            });
    };

    if (loading) {
        return <p>Načítavam...</p>;
    }

    return (
        <div className="main-container">
            <AppBar/>
            <div className="task-container">
                <h1>
                    {user.role === "ROLE_TEACHER"
                        ? `Úlohy pre lekciu ${id}`
                        : `Otázky pre lekciu ${id}`}
                </h1>

                {tasks.map((task) => (
                    <div key={task.id} className="task-item">
                        {solutions[task.id] ? (
                            user.role !== "ROLE_TEACHER" ? (
                                grade[task.id] !== undefined ? (
                                    <p className="mark">{grade[task.id]}</p>
                                ) : (
                                    <p>Nemáte hodnotenie</p>
                                )
                            ) : (
                                <p></p>
                            )
                        ) : (
                            <p>Žiadne riešenie</p>
                        )}

                        <h2>{task.title}</h2>
                        <p>{task.description}</p>

                        {user.role === "ROLE_TEACHER" ? (
                            <>
                                <button
                                    className="custom-delete-button"
                                    onClick={() => handleDeleteClick(task.id)}
                                >
                                    ODSTRÁNIŤ ÚLOHU
                                </button>
                            </>
                        ) : (
                            <>
                                <MonacoEditor
                                    height="500px"
                                    width="1000px"
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
                                        minimap: {enabled: false},
                                        quickSuggestions: {
                                            other: true,
                                            comments: true,
                                            strings: true,
                                        },
                                        parameterHints: {enabled: true},
                                        tabCompletion: "on",
                                    }}
                                />

                                <button className={'new-task-button'} onClick={() => handleSubmitSolution(task.id)}>
                                    Odoslať kód
                                </button>
                            </>
                        )}
                    </div>
                ))}

                {user.role === "ROLE_TEACHER" && (
                    <>
                        <button className={'new-task-button'} onClick={() => setShowModal(true)}>
                            Pridať novú úlohu
                        </button>

                        {showModal && (
                            <div className="modal-content-task">
                                <h2 style={{textAlign: "center", color: "#fff"}}>
                                    Pridať novú úlohu
                                </h2>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Názov"
                                        value={newTask.title}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div
                                    name="description"
                                    placeholder="Popis"
                                    contentEditable="true"
                                    onInput={(e) => handleInputChange({
                                        target: {
                                            name: "description",
                                            value: e.currentTarget.textContent
                                        }
                                    })}
                                    className="form-input form-textarea"
                                />

                                <div className="form-group">
                                    <input
                                        type="datetime-local"
                                        name="deadline"
                                        placeholder="Termín"
                                        value={newTask.deadline}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <button onClick={handleCreateTask} className="new-task-button">
                                    VYTVORIŤ ÚLOHU
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="new-task-button"
                                >
                                    SPÄŤ
                                </button>
                            </div>
                        )}

                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                            <DialogTitle>Potvrdiť odstránenie</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Ste si istí, že chcete odstrániť túto úlohu?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>Zrušiť</Button>
                                <Button onClick={handleConfirmDelete} color="error">
                                    Odstrániť
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <ToastContainer/>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tasks;
