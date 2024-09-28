import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewSixth from "../../../components/SixthLessonComponents/LessonOverviewSixth";
import FirstSubtopicSixth from "../../../components/SixthLessonComponents/FirstSubtopicSixth";
import SecondSubtopicSixth from "../../../components/SixthLessonComponents/SecondSubtopicSixth";
import ThirdSubtopicSixth from "../../../components/SixthLessonComponents/ThirdSubtopicSixth";
import FourthSubtopicSixth from "../../../components/SixthLessonComponents/FourthSubtopicSixth";
import FifthSubtopicSixth from "../../../components/SixthLessonComponents/FifthSubtopicSixth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicSixth from "../../../components/SixthLessonComponents/ListOfSubtopicSixth";


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
