import React, {useEffect, useState} from 'react';
import AppBar from '../../../components/AppBar';
import LessonOverview from '../../../components/Lessons/ThirdLessonComponents/LessonOverviewThird';
import '../../../styles/LessonsStyles/SecondLesson.css';
import LessonContent from '../../../components/LessonContent';
import listOfSubtopicThird from '../../../components/Lessons/ThirdLessonComponents/ListOfSubtopicThird';
import FirstSubtopic from '../../../components/Lessons/ThirdLessonComponents/FirstSubtopicThird';
import SecondSubtopic from '../../../components/Lessons/ThirdLessonComponents/SecondSubtopicThird';
import ThirdSubtopic from '../../../components/Lessons/ThirdLessonComponents/ThirdSubtopicThird';
import FourthSubtopic from '../../../components/Lessons/ThirdLessonComponents/FourthSubtopicThird';
import {toast} from "react-toastify";
const ThirdLesson = () => {
    const [progress, setProgress] = useState(0);
    const totalSubtopics = 5;
    const lessonId = 'addresses';
    const [completedSubtopics, setCompletedSubtopics] = useState([]);

    useEffect(() => {
        const savedProgress = localStorage.getItem(`lessonProgress_${lessonId}`);
        if (savedProgress) {
            const { completed, percent, completedSubtopics } = JSON.parse(savedProgress);
            setProgress(completed); // Загружаем количество пройденных тем
            setCompletedSubtopics(completedSubtopics || []); // Загружаем завершенные подтемы
        }
    }, [lessonId]);

    const handleCompleteSubtopic = (index) => {
        // Проверяем, не завершена ли уже подтема
        if (completedSubtopics.includes(index)) {
            toast.warning("This subtopic is already completed.");
            return;
        }

        setProgress((prevProgress) => {
            const newProgress = prevProgress + 1;
            const percent = Math.round((newProgress / totalSubtopics) * 100); // Рассчитываем процент

            // Обновляем список завершенных подтем
            const newCompletedSubtopics = [...completedSubtopics, index];

            // Сохраняем количество пройденных тем, процент и завершенные подтемы в localStorage
            const progressData = {
                completed: newProgress,
                percent: percent,
                completedSubtopics: newCompletedSubtopics,
            };

            localStorage.setItem(`lessonProgress_${lessonId}`, JSON.stringify(progressData));
            toast.success(`Progress updated: ${percent}%`);

            // Обновляем состояние завершенных подтем
            setCompletedSubtopics(newCompletedSubtopics);

            return newProgress;
        });
    };

    const handleResetProgress = () => {
        localStorage.removeItem(`lessonProgress_${lessonId}`);

        setProgress(0);

        toast.info("Progress has been reset.");
    };

    return (
        <div className='main-second'>
            <AppBar />
            <LessonContent subtopics={listOfSubtopicThird}/>
            <div className="second-lessons-page">
                <LessonOverview onComplete={() => handleCompleteSubtopic(1)}
                                completed={completedSubtopics.includes(1)}/>
                <FirstSubtopic onComplete={() => handleCompleteSubtopic(2)}
                               completed={completedSubtopics.includes(2)}/>
                <SecondSubtopic onComplete={() => handleCompleteSubtopic(3)}
                                completed={completedSubtopics.includes(3)}/>
                <ThirdSubtopic onComplete={() => handleCompleteSubtopic(4)}
                               completed={completedSubtopics.includes(4)}/>
                <FourthSubtopic onComplete={() => handleCompleteSubtopic(5)}
                                completed={completedSubtopics.includes(5)}/>
                <div className="progress-bar">
                    <p>Progress: {Math.round((progress / totalSubtopics) * 100)}%</p>
                </div>

                <div className='footer'>
                    <button>
                        View the course
                    </button>
                    <button className="primary">Mark as complete</button>
                    <button>
                        Next lesson
                    </button>
                    <button className="primary" onClick={handleResetProgress}>
                        Reset progress
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ThirdLesson;