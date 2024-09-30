import React from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverview from "../../../components/Lessons/SeventhLessonComponents/LessonOverviewSeventh";
import FirstSubtopicSeventh from "../../../components/Lessons/SeventhLessonComponents/FirstSubtopicSeventh";
import SecondSubtopicSeventh from "../../../components/Lessons/SeventhLessonComponents/SecondSubtopicSeventh";
import ThirdSubtopicSeventh from "../../../components/Lessons/SeventhLessonComponents/ThirdSubtopicSeventh";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicSeventh from "../../../components/Lessons/SeventhLessonComponents/ListOfSubtopicSeventh";


const SeventhLesson = () => {
    return (
        <div className='main-second'>
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicSeventh}/>
            <div className="second-lessons-page">
                <LessonOverview/>
                <FirstSubtopicSeventh/>
                <SecondSubtopicSeventh/>
                <ThirdSubtopicSeventh/>
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

export default SeventhLesson;
