import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewSixth from "../../../components/Lessons/SixthLessonComponents/LessonOverviewSixth";
import FirstSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/FirstSubtopicSixth";
import SecondSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/SecondSubtopicSixth";
import ThirdSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/ThirdSubtopicSixth";
import FourthSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/FourthSubtopicSixth";
import FifthSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/FifthSubtopicSixth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicSixth from "../../../components/Lessons/SixthLessonComponents/ListOfSubtopicSixth";


const SixthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicSixth}/>
            <div className="second-lessons-page">
                <LessonOverviewSixth/>
                <FirstSubtopicSixth/>
                <SecondSubtopicSixth/>
                <ThirdSubtopicSixth/>
                <FourthSubtopicSixth/>
                <FifthSubtopicSixth/>
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

export default SixthLesson;
