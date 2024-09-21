import React from 'react';
import AppBar from '../../../components/AppBar';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonOverviewFourth from '../../../components/FourthLessonComponent/LessonOverviewFourth';
import FirstSubtopicFourth from '../../../components/FourthLessonComponent/FirstSubtopicFourth';

const ThirdLesson = () => {
    

    return (
        <div className='main-second'>
            <AppBar />
            {/* <LessonContent subtopics={listOfSubtopicFourth}/> */}
            <div className="second-lessons-page">
                <LessonOverviewFourth/>
                <FirstSubtopicFourth/>
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