import React from 'react';
import AppBar from '../../../components/AppBar';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonOverview from "../../../components/Lessons/TenthLessonComponents/LessonOverviewTenth";
import FirstSubtopicTenth from "../../../components/Lessons/TenthLessonComponents/FirstSubtopicTenth";
import SecondSubtopicTenth from "../../../components/Lessons/TenthLessonComponents/SecondSubtopicTenth";
import ThirdSubtopicTenth from "../../../components/Lessons/TenthLessonComponents/ThirdSubtopicTenth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicTenth from "../../../components/Lessons/TenthLessonComponents/ListOfSubtopicTenth";

const TenthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicTenth}/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicTenth/>
                <SecondSubtopicTenth/>
                <ThirdSubtopicTenth/>
                <div className='footer'>
                    <button>
                        Посмотреть курс
                    </button>
                    <button className="primary">Отметить как завершенное</button>
                    <button>
                        Следующий урок
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TenthLesson;