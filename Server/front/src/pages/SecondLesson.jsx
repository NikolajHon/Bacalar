import React from 'react';
import '../styles/SecondLesson.css';
import SecondSubtopic from '../components/SeconLessonComponent/SecondSubtopic';
import FirstSubtopic from '../components/SeconLessonComponent/FirstSubtopic';
import LessonOverview from '../components/SeconLessonComponent/LessonOverview';
const SecondLesson = () => {
    return (
        <div className="second-lessons-page">
            <LessonOverview/>
            <FirstSubtopic/>
            <SecondSubtopic/>

        </div>

    );
};

export default SecondLesson;