import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DiscussionList from '../../components/forum/DiscussionList';
import NewDiscussionForm from '../../components/forum/NewDiscussionForm';
import AppBar from '../../components/AppBar';
import TopicSwitcher from '../../components/TopicSwitcher';

const ForumPage = () => {
    const [discussions, setDiscussions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    useEffect(() => {
        if (selectedTopic) {
            fetchDiscussions();
        }
    }, [selectedTopic]);

    const fetchDiscussions = () => {
        if (selectedTopic) {
            axios.get(`http://localhost:8080/api/discussions/lesson/${selectedTopic}`)
                .then(response => {
                    // Проверяем, что response.data — это массив
                    const discussionsData = Array.isArray(response.data) ? response.data : [response.data];
                    setDiscussions(discussionsData); // Заменяет старый список новым
                    console.log('Discussions got:', discussionsData);
                })
                .catch(error => {
                    console.error('Ошибка при получении обсуждений:', error);
                });
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleNewDiscussion = () => {
        fetchDiscussions();
        setShowForm(false);
    };

    const handleDeleteDiscussion = (id) => {
        setDiscussions(prevDiscussions => prevDiscussions.filter(discussion => discussion.id !== id));
    };

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        // fetchDiscussions(); // Удалите этот вызов, так как он уже запускается через useEffect при изменении selectedTopic
    };

    return (
        <div className='forum-page'>
            <AppBar />
            <div className="content-wrapper">
                <div className="content-grid-forum">
                    <div className="topic-list">
                        <TopicSwitcher selectedTopic={selectedTopic} onSelectTopic={handleSelectTopic} />
                    </div>
                    <div className="discussion-section">
                        <div className="forum-header">
                            <h1>Fórum</h1>
                            <button className="toggle-form-button" onClick={toggleForm}>
                                {showForm ? "Zrušiť" : "Nová diskusia"}
                            </button>
                        </div>

                        {showForm && <NewDiscussionForm lessonId={selectedTopic} onSuccess={handleNewDiscussion} />}

                        <DiscussionList
                            discussions={discussions}
                            onDelete={handleDeleteDiscussion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumPage;
