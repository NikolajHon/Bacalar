import React from 'react';
import Table from '../../../components/FirstLesson/Table';
import Approach from '../../../components/FirstLesson/Approach';
import Section from '../../../components/FirstLesson/Section';
import Tutorial from "../../../components/FirstLesson/Tutorial";
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
