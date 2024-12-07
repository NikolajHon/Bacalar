import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';

const NewDiscussionForm = ({ lessonId, onSuccess }) => {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newDiscussion = {
            title,
            content,
            author: user.name || 'Anonymous',
            lessonId: lessonId
        };

        console.log('Отправляемый JSON:', JSON.stringify(newDiscussion, null, 2));

        axios.post('http://localhost:8080/api/discussions', newDiscussion)
            .then(response => {
                console.log('Discussion created:', response.data);
                onSuccess();
            })
            .catch(error => {
                console.error('Error when creating a discussion:', error);
            });
    };

    return (
        <form className="new-discussion-form" onSubmit={handleSubmit}>
            <p>Vytvoríte otázku pre lekciu s identifikátorom: {lessonId}</p> {/* Отображение ID урока */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Téma"
                required
                className="input-field"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Obsah"
                required
                className="textarea-field"
            ></textarea>
            <button type="submit" className="submit-button">Vytvorenie diskusie</button>
        </form>
    );
};

export default NewDiscussionForm;
