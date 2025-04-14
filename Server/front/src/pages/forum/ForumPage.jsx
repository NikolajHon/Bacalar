import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AppBar from '../../components/AppBar';
import ListOfTopics from "./ListOfTopis";
import ListOfQuestions from "./ListOfQuestion";
import ModalCreateNewDiscussion from "./ModalCreateNewDiscussion";
import styles from '../../styles/Forum.module.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../contexts/UserContext";

const ForumPage = () => {
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [listOfTopics, setListOfTopics] = useState([]);
    const [discussions, setDiscussions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchDiscussions = () => {
            try {
                if (selectedTopic !== null) {
                    console.log("Selected topic:", selectedTopic);
                    axios.get(`http://localhost:8080/api/discussions/lesson/${selectedTopic}`)
                        .then(response => {
                            console.log(response);
                            setDiscussions(response.data);
                        })
                        .catch(error => {
                            console.error("Error loading discussions:", error);
                        });
                }
            } catch (error) {
                console.error("Error handling discussions fetch:", error);
            }
        };

        fetchDiscussions();
    }, [selectedTopic]);

    function handleSelectedTopic(topicId) {
        setSelectedTopic(prevTopic => {
            console.log("Previous topic:", prevTopic, "New topic:", topicId);
            return topicId;
        });
    }

    function openModal() {
        if (selectedTopic !== null) {
            setIsModalOpen(true);
        } else {
            alert("Select a topic before creating a question!");
        }
    }

    function getBackToMainPage() {
        console.log(user.role);
        if (user.role === 'ROLE_TEACHER') {
            navigate('/teacher/mainscreen');
        } else if (user.role === 'ROLE_USER') {
            navigate('/student/mainscreen');
        } else {
            navigate('/');
        }
    }

    return (
        <div className={styles.mainForumPage}>
            <AppBar/>
            <div className={styles.forumGrid}>
                <div className={styles.topicsColumn}>
                    <ListOfTopics
                        onClick={handleSelectedTopic}
                        selectedTopic={selectedTopic}
                    />

                </div>
                <div className={styles.questionsColumn}>
                    <ListOfQuestions listOfQuestions={discussions}/>
                    <div className={styles.buttonsBlock}>
                        <button
                            className={styles.creatingNewButton}
                            onClick={openModal}
                        >
                            Create new Question
                        </button>
                        <button
                            className={styles.creatingNewButton}
                            onClick={getBackToMainPage}
                        >
                            BACK
                        </button>
                    </div>
                </div>
            </div>

            {/* Модалка при необходимости */}
            {isModalOpen && selectedTopic !== null && (
                <ModalCreateNewDiscussion
                    lessonId={selectedTopic}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ForumPage;
