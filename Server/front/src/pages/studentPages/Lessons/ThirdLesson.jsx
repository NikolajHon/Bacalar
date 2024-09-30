import React from 'react';
import AppBar from '../../../components/AppBar';
import LessonOverview from '../../../components/Lessons/ThirdLessonComponent/LessonOverviewThird';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonContent from '../../../components/LessonContent';
import listOfSubtopicThird from '../../../components/Lessons/ThirdLessonComponent/ListOfSubtopicThird';
import FirstSubtopic from '../../../components/Lessons/ThirdLessonComponent/FirstSubtopicThird';
import SecondSubtopic from '../../../components/Lessons/ThirdLessonComponent/SecondSubtopicThird';
import ThirdSubtopic from '../../../components/Lessons/ThirdLessonComponent/ThirdSubtopicThird';
import FourthSubtopic from '../../../components/Lessons/ThirdLessonComponent/FourthSubtopicThird';
const ThirdLesson = () => {
    

    return (
        <div className='main-second'>
            <AppBar />
            <LessonContent subtopics={listOfSubtopicThird}/>
            <div className="second-lessons-page">
                <LessonOverview />
                <FirstSubtopic/>
                <SecondSubtopic/>
                <ThirdSubtopic/>
                <FourthSubtopic/>
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