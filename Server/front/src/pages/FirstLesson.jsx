// src/pages/FirstLessons.jsx
import React from 'react';
import Table from '../components/FirstLesson/Table';
import Postup from '../components/FirstLesson/Postup';
import '../styles/FirstLesson.css';

const FirstLesson = () => {
    return (
        <div className="first-lessons-page">
            <Table />
            <Postup />
        </div>
    );
};

export default FirstLesson;
