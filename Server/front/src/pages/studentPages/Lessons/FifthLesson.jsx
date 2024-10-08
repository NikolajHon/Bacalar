import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from '../../../components/Lessons/FifthLessonComponents/LessonOverviewFifth';
import FirstSubtopicFifth from '../../../components/Lessons/FifthLessonComponents/FirstSubtopicFifth';
import SecondSubtopicFifth from "../../../components/Lessons/FifthLessonComponents/SecondSubtopicFifth";
import ThirdSubtopicFifth from "../../../components/Lessons/FifthLessonComponents/ThirdSubtopicFifth";
import listOfSubtopicFifth from "../../../components/Lessons/FifthLessonComponents/ListOfSubtopicFifth"
import LessonContent from "../../../components/LessonContent";
const FifthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicFifth}/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicFifth/>
                <SecondSubtopicFifth/>
                <ThirdSubtopicFifth/>
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

export default FifthLesson;
