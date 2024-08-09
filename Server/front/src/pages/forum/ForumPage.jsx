import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Импортируем axios
import DiscussionList from '../../components/forum/DiscussionList';
import NewDiscussionForm from '../../components/forum/NewDiscussionForm';
import AppBar from '../../components/AppBar';
import '../../styles/forum/ForumPage.css';

const ForumPage = () => {
    const [discussions, setDiscussions] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // GET-запрос с использованием axios
        axios.get('http://localhost:8080/api/discussions')
            .then(response => {
                setDiscussions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении обсуждений:', error);
            });
    }, []); // Эффект вызывается один раз при монтировании компонента

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleNewDiscussion = () => {
        axios.get('http://localhost:8080/api/discussions')
            .then(response => {
                setDiscussions(response.data);
                setShowForm(false);  // Закрываем форму после успешного добавления
            })
            .catch(error => {
                console.error('Ошибка при обновлении списка обсуждений:', error);
            });
    };

    return (
        <div className='forum-body'>
            <div className='app-bar'><AppBar /></div>
            <div className="forum-page">

                <div className="forum-header">
                    <h1>Forum</h1>
                    <button className="toggle-form-button" onClick={toggleForm}>
                        {showForm ? "Cancel" : "New Discussion"}
                    </button>
                </div>

                {showForm && <NewDiscussionForm onSuccess={handleNewDiscussion} />}

                <DiscussionList discussions={discussions} />
            </div>
        </div>
    );
};

export default ForumPage;
