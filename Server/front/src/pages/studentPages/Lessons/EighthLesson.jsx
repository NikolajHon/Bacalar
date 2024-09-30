import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewEighth from "../../../components/Lessons/EighthLessonComponent/LessonOverviewEighth";
import FirstSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/FirstSubtopicEighth";
import SecondSubtopicEighth from "../../../components/Lessons/EighthLessonComponent/SecondSubtopicEighth";


const EighthLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <div className="second-lessons-page">
                <LessonOverviewEighth/>
                <FirstSubtopicEighth/>
                <SecondSubtopicEighth/>
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
