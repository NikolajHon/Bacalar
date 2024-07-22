import React from 'react';
import Table from '../components/FirstLesson/Table';
import Approach from '../components/FirstLesson/Approach';
import Section from '../components/FirstLesson/Section';
import Tutorial from "../components/FirstLesson/Tutorial";
import '../styles/FirstLesson.css';

const FirstLessons = () => {
    return (
        <div className="first-lessons-page">
            <Table />
            <Approach />
            <Section />
            <Tutorial/>
        </div>
    );
};

export default FirstLessons;
