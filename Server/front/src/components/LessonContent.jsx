import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/LessonsContent.css';

const LessonContent = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/topics/${id}/content`, { responseType: 'blob' });
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                setContent(fileURL);
            } catch (error) {
                console.error('Error fetching lesson content', error);
            }
        };

        fetchContent();
    }, [id]);

    return (
        <div className="lesson-content">
            <h2>Lesson Content</h2>
            {content ? (
                <iframe src={content} width="100%" height="600px" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default LessonContent;
