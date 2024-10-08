import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewEighth from "../../../components/Lessons/EighthLessonComponents/LessonOverviewEighth";
import FirstSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FirstSubtopicEighth";
import SecondSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/SecondSubtopicEighth";
import ThirdSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/ThirdSubtopicEighth";
import FourthSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FourthSubtopicEighth";
import FifthSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FifthSubtopicEighth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/ListOfSubtopicEighth";


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
