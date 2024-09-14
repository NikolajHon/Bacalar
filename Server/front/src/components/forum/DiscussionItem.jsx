import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext'; // Импортируем UserContext
import axios from 'axios'; // Подключаем axios
import '../../styles/forum/DiscussionList.css';
import { ToastContainer, toast } from "react-toastify";

const DiscussionItem = ({ discussion, onDelete }) => {
    const { user } = useContext(UserContext); // Получаем данные пользователя из контекста

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/discussions/${discussion.id}`);
            console.log(response); // Логируем, чтобы увидеть, что происходит
            
            if (response.status === 200 || response.status === 204) {
                toast.success("Обсуждение успешно удалено");
                onDelete(discussion.id); // Удаление элемента из UI
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
                        <span>Author: {discussion.author}</span>
                        <span>Created: {new Date(discussion.createdAt).toLocaleString()}</span>
                        <span>Comments: {discussion.comments.length}</span>
                    </div>
                    
                </div>
                
            </Link>
            {user.role === 'ROLE_TEACHER' && (
                    <button className="delete-button" onClick={handleDelete}>
                        DELETE
                    </button>
                )}
        </div>
    );
};

export default DiscussionItem;
