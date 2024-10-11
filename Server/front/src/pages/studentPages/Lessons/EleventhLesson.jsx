import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from "../../../components/Lessons/EleventhLessonComponents/LessonOverviewEleventh";
import FirstSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/FirstSubtopicEleventh";
import SecondSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/SecondSubtopicEleventh";
import ThirdSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/ThirdSubtopicEleventh";
import FourthSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/FourthSubtopicEleventh";
import FifthSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/FifthSubtopicEleventh";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/ListOfSubtopicEleventh";


const EleventhLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicEleventh}/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicEleventh/>
                <SecondSubtopicEleventh/>
                <ThirdSubtopicEleventh/>
                <FourthSubtopicEleventh/>
                <FifthSubtopicEleventh/>
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

export default EleventhLesson;
