import React, { useState, useEffect } from 'react';
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
                console.error('Error fetching topics', error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="topic-list fade-in">
            <h2>Topics</h2>
            {topics.map(topic => (
                <div key={topic.id} className="topic-item">
                    <h3>{topic.name}</h3>
                    <p>{topic.description}</p>
                    <Link to={`/lessons/${topic.id}`} className="lesson-link">
                        Go to lesson
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default TopicList;
