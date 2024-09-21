import React from 'react';
import AppBar from '../../../components/AppBar';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonOverviewFourth from '../../../components/FourthLessonComponent/LessonOverviewFourth';
import FirstSubtopicFourth from '../../../components/FourthLessonComponent/FirstSubtopicFourth';
import SecondSubtopicFourth from '../../../components/FourthLessonComponent/SecondSubtopicFourth';
import ThirdSubtopicFourth from '../../../components/FourthLessonComponent/ThirdSubtopicFourth';
import listOfSubtopicFourth from '../../../components/FourthLessonComponent/ListOfSubtopic';
import LessonContent from '../../../components/LessonContent';
const ThirdLesson = () => {
    

    return (
        <div className='main-second'>
            <AppBar />
            <LessonContent subtopics={listOfSubtopicFourth}/> 
            <div className="second-lessons-page">
                <LessonOverviewFourth/>
                <FirstSubtopicFourth/>
                <SecondSubtopicFourth/>
                <ThirdSubtopicFourth/>
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