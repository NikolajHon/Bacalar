import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppBar from '../../../components/AppBar';
import QuestionCard from '../../../components/forum/QuestionCard';
import styles from '../../../styles/Discussion.module.css';
import ModalCreateNewComment from "../../../components/forum/ModalCreateNewComment";

const DiscussionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [discussions, setDiscussions] = useState(null);
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/comments/discussion/${id}`);
                console.log('Comments:', response.data);
                setComments(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке комментариев:', error);
            }
        };
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/discussions/${id}`);
                console.log('Discussion:', response.data);
                setDiscussions(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке обсуждений:', error);
            }
        };

        fetchComments();
        fetchDiscussions();
    }, [id]);

    function changeModalOpen() {
        setIsModalOpen(!isModalOpen);
    }

    function goBackToForum() {
        navigate('/forum');
    }

    return (
        <div className={styles.mainPageDiscussion}>
            <AppBar />

            {discussions && (
                <QuestionCard
                    topic={discussions.title}
                    body={discussions.content}
                    author={discussions.author}
                    date={discussions.createdAt}
                />
            )}

            <div className={styles.commentsSection}>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <QuestionCard
                            key={comment.id}
                            topic={`Comment by ${comment.author}`}
                            body={comment.content}
                            author={comment.author}
                            date={comment.createdAt}
                            isComment={true}
                        />
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
            <div className={styles.buttonsDiv}>
                <button className={styles.creatingNewButton} onClick={changeModalOpen}>ADD NEW COMMENT</button>
                <button className={styles.creatingNewButton} onClick={goBackToForum}>BACK</button> {/* Добавили обработчик */}
            </div>
            {isModalOpen && (
                <ModalCreateNewComment discussionId={id} onClose={() => changeModalOpen()} />
            )}
        </div>
    );
};

export default DiscussionPage;
