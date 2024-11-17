import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import '../../styles/Forum.css'
const DiscussionItem = ({ discussion, onDelete }) => {
    const { user } = useContext(UserContext);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/discussions/${discussion.id}`);
            if (response.status === 200 || response.status === 204) {
                toast.success("Обсуждение успешно удалено");
                onDelete(discussion.id);
            } else {
                toast.error("Ошибка при удалении обсуждения.");
            }
        } catch (error) {
            toast.error("Ошибка при удалении обсуждения.");
        }
    };

    return (
        <div className="discussion-item-container">
            <Link to={`/discussion/${discussion.id}`} className="discussion-item-link">
                <div className="discussion-item">
                    <div className="discussion-title">
                        {discussion.title}
                    </div>
                    <div className="discussion-meta">
                        <span>Autor: {discussion.author}</span>
                        <span>Vytvorené: {new Date(discussion.createdAt).toLocaleString()}</span>
                        <span>Komentáre: {discussion.comments.length}</span>
                    </div>
                </div>
            </Link>
            {user.role === 'ROLE_TEACHER' && (
                <button className="delete-button" onClick={handleDelete}>
                    Odstrániť
                </button>
            )}
        </div>
    );
};

export default DiscussionItem;
