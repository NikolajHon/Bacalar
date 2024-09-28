import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from '../../../components/FifthLessonComponents/LessonOverviewFifth';
import FirstSubtopicFifth from '../../../components/FifthLessonComponents/FirstSubtopicFifth';
import SecondSubtopicFifth from "../../../components/FifthLessonComponents/SecondSubtopicFifth";
import ThirdSubtopicFifth from "../../../components/FifthLessonComponents/ThirdSubtopicFifth";
import listOfSubtopicFifth from "../../../components/FifthLessonComponents/ListOfSubtopicFifth"
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
