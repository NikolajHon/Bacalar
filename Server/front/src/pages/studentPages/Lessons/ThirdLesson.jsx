import React from 'react';
import AppBar from '../../../components/AppBar';
import LessonOverview from '../../../components/ThirdLessonComponent/LessonOverview';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonContent from '../../../components/LessonContent';
import listOfSubtopicThird from '../../../components/ThirdLessonComponent/ListOfSubtopicThird';
import FirstSubtopic from '../../../components/ThirdLessonComponent/FirstSubtopicThird';
const ThirdLesson = () => {
    

    return (
        <div className='main-second'>
            <AppBar />
            <LessonContent subtopics={listOfSubtopicThird}/>
            <div className="second-lessons-page">
                <LessonOverview />
                <FirstSubtopic/>
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

export default ThirdLesson;