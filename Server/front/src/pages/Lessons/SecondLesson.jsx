import React from 'react';
import '../../styles/LessonsStyles/SecondLesson.css';
import SecondSubtopic from '../../components/SecondLessonComponent/SecondSubtopic';
import FirstSubtopic from '../../components/SecondLessonComponent/FirstSubtopic';
import LessonOverview from '../../components/SecondLessonComponent/LessonOverview';
import ThirdSubtopic from '../../components/SecondLessonComponent/ThirdSubtopic';
import FourthSubtopic from '../../components/SecondLessonComponent/FourthSubtopic';
import FifthSubtopic from '../../components/SecondLessonComponent/FifthSubtopic';
import SixthSubtopic from '../../components/SecondLessonComponent/SixthSubtopic';
import SeventhSubtopic from '../../components/SecondLessonComponent/SeventhSubtopic';
import AppBar from '../../components/AppBar';
import LessonContent from '../../components/LessonContent';
const SecondLesson = () => {
    return (
        <div className='main-second'>
            <div className='app-bar'>
                <AppBar />
            </div>
            <div className='lesson-content'>
                <LessonContent />
            </div>
            <div className="second-lessons-page">
                <LessonOverview />
                <FirstSubtopic />
                <SecondSubtopic />
                <ThirdSubtopic />
                <FourthSubtopic />
                <FifthSubtopic />
                <SixthSubtopic />
                <SeventhSubtopic />
                <div className='footer'>
                    <button>
                            Посмотреть курс
                    </button>
                    <button class="primary">Отметить как завершенное</button>
                    <button>
                            Следующий урок
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SecondLesson;