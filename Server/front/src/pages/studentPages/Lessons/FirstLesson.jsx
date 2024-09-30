import React from 'react';
import Table from '../../../components/Lessons/FirstLesson/Table';
import Approach from '../../../components/Lessons/FirstLesson/Approach';
import Section from '../../../components/Lessons/FirstLesson/Section';
import Tutorial from "../../../components/Lessons/FirstLesson/Tutorial";
import '../../../styles/LessonsStyles/FirstLesson.css';
import AppBar from '../../../components/AppBar';

const FirstLessons = () => {
    return (
        <div className='main-first'>
            <div>
                <AppBar/>
            </div>
            <div className="first-lessons-page">
                <Table />
                <Approach />
                <Section />
                <Tutorial />
            </div>
        </div>
    );
};

export default FirstLessons;
