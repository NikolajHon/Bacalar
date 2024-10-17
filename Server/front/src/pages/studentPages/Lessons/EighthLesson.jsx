import React, {useEffect, useState} from 'react'
import '../../../styles/LessonsStyles/SecondLesson.css';
import AppBar from '../../../components/AppBar';
import LessonOverviewEighth from "../../../components/Lessons/EighthLessonComponents/LessonOverviewEighth";
import FirstSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FirstSubtopicEighth";
import SecondSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/SecondSubtopicEighth";
import ThirdSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/ThirdSubtopicEighth";
import FourthSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FourthSubtopicEighth";
import FifthSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/FifthSubtopicEighth";
import LessonContent from "../../../components/LessonContent";
import listOfSubtopicEighth from "../../../components/Lessons/EighthLessonComponents/ListOfSubtopicEighth";
import {toast} from "react-toastify";


const EighthLesson = () => {

    const [progress, setProgress] = useState(0);
    const totalSubtopics = 6;
    const lessonId = 'ipc-2-signaly';
    const [completedSubtopics, setCompletedSubtopics] = useState([]); // Отслеживаем завершенные подтемы


    useEffect(() => {
        const savedProgress = localStorage.getItem(`lessonProgress_${lessonId}`);
        if (savedProgress) {
            const { completed, percent, completedSubtopics } = JSON.parse(savedProgress);
            setProgress(completed); // Загружаем количество пройденных тем
            setCompletedSubtopics(completedSubtopics || []); // Загружаем завершенные подтемы
        }
    }, [lessonId]);

    // Функция для обновления прогресса при завершении подтемы
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
            <AppBar/>
            <LessonContent subtopics={listOfSubtopicEighth}/>
            <div className="second-lessons-page">
                <LessonOverviewEighth onComplete={() => handleCompleteSubtopic(1)}
                                      completed={completedSubtopics.includes(1)}/>
                <FirstSubtopicEighth onComplete={() => handleCompleteSubtopic(2)}
                                     completed={completedSubtopics.includes(2)}/>
                <SecondSubtopicEighth onComplete={() => handleCompleteSubtopic(3)}
                                      completed={completedSubtopics.includes(3)}/>
                <ThirdSubtopicEighth onComplete={() => handleCompleteSubtopic(4)}
                                     completed={completedSubtopics.includes(4)}/>
                <FourthSubtopicEighth onComplete={() => handleCompleteSubtopic(5)}
                                      completed={completedSubtopics.includes(5)}/>
                <FifthSubtopicEighth onComplete={() => handleCompleteSubtopic(6)}
                                     completed={completedSubtopics.includes(6)}/>
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

export default EighthLesson;
