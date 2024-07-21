import React from 'react';
import Table from '../components/FirstLesson/Table';
import Approach from '../components/FirstLesson/Approach';
import Section from '../components/FirstLesson/Section';
import CodeEditor from "../components/FirstLesson/CodeEditor";
import '../styles/FirstLesson.css';

const FirstLessons = () => {
    return (
        <div className="first-lessons-page">
            <Table />
            <Approach />
            <Section />
            <CodeEditor />
        </div>
    );
};

export default FirstLessons;
