import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from "../../../components/Lessons/EleventhLessonComponents/LessonOverviewEleventh";
import FirstSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/FirstSubtopicEleventh";
import SecondSubtopicEleventh from "../../../components/Lessons/EleventhLessonComponents/SecondSubtopicEleventh";


const EleventhLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicEleventh/>
                <SecondSubtopicEleventh/>
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
