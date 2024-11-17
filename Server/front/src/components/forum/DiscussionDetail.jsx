import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewCommentForm from './NewCommentForm';
import '../../styles/Forum.css'

const DiscussionDetail = ({ discussionId }) => {
    const [discussion, setDiscussion] = useState(null);
    const [comments, setComments] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const fetchDiscussionData = () => {
            axios.get(`http://localhost:8080/api/discussions/${discussionId}`)
                .then(response => {
                    setDiscussion(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при получении данных дискуссии:', error);
                });

            axios.get(`http://localhost:8080/api/comments/discussion/${discussionId}`)
                .then(response => {
                    setComments(response.data);
                })
                .catch(error => {
                    console.error('Ошибка при получении комментариев:', error);
                });
        };

        fetchDiscussionData();
    }, [discussionId]);

    if (!discussion) return <div className="loading">Загрузка...</div>;

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleCommentAdded = () => {
        axios.get(`http://localhost:8080/api/comments/discussion/${discussionId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('Ошибка при обновлении комментариев:', error);
            });
    };

    return (
        <div className="discussion-detail-container">
            <div className="discussion-detail-header">
                <h2 className="discussion-title">{discussion.title}</h2>
                <p className="discussion-meta">
                    Autor: {discussion.author} • Vytvorené: {new Date(discussion.createdAt).toLocaleString()}
                </p>
            </div>
            <div className="discussion-content">
                <p>{discussion.content}</p>
            </div>

            <button onClick={toggleForm} className="toggle-form-button">
                {showForm ? "Zrušiť" : "Pridať komentár"}
            </button>

            {showForm && (
                <NewCommentForm
                    discussionId={discussionId}
                    onClose={toggleForm}
                    onCommentAdded={handleCommentAdded}
                />
            )}

            <div className="comment-list">
                <h3>Komentáre</h3>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <p className="comment-author"><strong>{comment.author}</strong></p>
                            <p>{comment.content}</p>
                            <p className="comment-meta">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>Zatiaľ žiadne komentáre.</p>
                )}
            </div>
        </div>
    );
};

export default DiscussionDetail;
