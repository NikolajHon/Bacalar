import React, { useContext, useState } from 'react';
import axios from 'axios'; // Импортируем axios
import '../../styles/forum/NewDiscussionForm.css';
import { UserContext } from '../../contexts/UserContext';

const NewDiscussionForm = ({ onSuccess }) => {
    const {user} = useContext(UserContext)
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDiscussion = {
            title,
            content,
            author: user.name  // Здесь можно использовать настоящее имя пользователя
        };

        // POST-запрос для создания нового обсуждения
        axios.post('http://localhost:8080/api/discussions', newDiscussion)
            .then(response => {
                console.log('Discussion created:', response.data);
                onSuccess();  // Вызываем onSuccess для обновления списка обсуждений
            })
            .catch(error => {
                console.error('Ошибка при создании обсуждения:', error);
            });
    };

    return (
        <form className="new-discussion-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
                required 
            />
            <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Content" 
                required 
            />
            <button type="submit">Create Discussion</button>
        </form>
    );
};

export default NewDiscussionForm;
