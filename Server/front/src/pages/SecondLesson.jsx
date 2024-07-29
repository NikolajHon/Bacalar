import React from 'react';
import '../styles/SecondLesson.css';
import SecondSubtopic from '../components/SeconLessonComponent/SecondSubtopic';
import FirstSubtopic from '../components/SeconLessonComponent/FirstSubtopic';
import LessonOverview from '../components/SeconLessonComponent/LessonOverview';
import ThirdSubtopic from '../components/SeconLessonComponent/ThirdSubtopic';
import FourthSubtopic from '../components/SeconLessonComponent/FourthSubtopic';
import FifthSubtopic from '../components/SeconLessonComponent/FifthSubtopic';
import SixthSubtopic from '../components/SeconLessonComponent/SixthSubtopic';
import SeventhSubtopic from '../components/SeconLessonComponent/SeventhSubtopic';
const SecondLesson = () => {
    return (
        <div className="second-lessons-page">
            <h1>Práca so súbormi v OS UNIX/Linux</h1>
            <LessonOverview />
            <FirstSubtopic />
            <SecondSubtopic />
            <ThirdSubtopic />
            <FourthSubtopic />
            <FifthSubtopic />
            <SixthSubtopic />
            <SeventhSubtopic/>
        </div>

    );
};

export default SecondLesson;