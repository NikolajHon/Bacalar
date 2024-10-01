import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from "../../../components/Lessons/NinthLessonComponents/LessonOverviewNinth";
import FirstSubtopicNinth from "../../../components/Lessons/NinthLessonComponents/FirstSubtopicNinth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicNinth from "../../../components/Lessons/NinthLessonComponents/ListOfSubtopicNinth";


const NinthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicNinth}/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicNinth/>
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

export default NinthLesson;
