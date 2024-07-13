// src/components/TopicList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/TopicList.css';

const TopicList = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/topics');
                setTopics(response.data);
            } catch (error) {
                console.error('There was an error fetching the topics!', error);
            }
        };

        fetchTopics();

        // Add 'fade-in' class after component mounts
        const container = document.querySelector('.topic-list-container');
        container.classList.add('fade-in');
    }, []);

    return (
        <div className="topic-list-container">
            <h2>Topics</h2>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                        <Link to={`/lesson/${topic.id}`}>
                            <button>Go to Lesson</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopicList;
