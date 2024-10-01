import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewEighth from "../../../components/Lessons/EighthLessonComponent/LessonOverviewEighth";
import FirstSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/FirstSubtopicEighth";
import SecondSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/SecondSubtopicEighth";
import ThirdSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/ThirdSubtopicEighth";
import FourthSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/FourthSubtopicEighth";
import FifthSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/FifthSubtopicEighth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/ListOfSubtopicEighth";


const EighthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicEighth}/>
            <div className="second-lessons-page">
                <LessonOverviewEighth/>
                <FirstSubtopicEighth/>
                <SecondSubtopicEighth/>
                <ThirdSubtopicEighth/>
                <FourthSubtopicEighth/>
                <FifthSubtopicEighth/>
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

export default EighthLesson;
