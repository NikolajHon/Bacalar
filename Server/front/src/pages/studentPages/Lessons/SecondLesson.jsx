import React, { useState, useEffect } from 'react';
import '../../../styles/LessonsStyles/SecondLesson.css';
import SecondSubtopic from '../../../components/SecondLessonComponent/SecondSubtopic';
import FirstSubtopic from '../../../components/SecondLessonComponent/FirstSubtopic';
import LessonOverview from '../../../components/SecondLessonComponent/LessonOverview';
import ThirdSubtopic from '../../../components/SecondLessonComponent/ThirdSubtopic';
import FourthSubtopic from '../../../components/SecondLessonComponent/FourthSubtopic';
import FifthSubtopic from '../../../components/SecondLessonComponent/FifthSubtopic';
import SixthSubtopic from '../../../components/SecondLessonComponent/SixthSubtopic';
import SeventhSubtopic from '../../../components/SecondLessonComponent/SeventhSubtopic';
import AppBar from '../../../components/AppBar';
import LessonContent from '../../../components/LessonContent';
import listOfSubtopicSecond from '../../../components/SecondLessonComponent/ListOfSubtopic';
import { toast } from 'react-toastify';
import { SaveSharp } from '@mui/icons-material';

const SecondLesson = () => {
    const [progress, setProgress] = useState(0);
    const totalSubtopics = 7;
    const lessonId = 'processes-and-threads';
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
            <AppBar />
            <LessonContent subtopics={listOfSubtopicSecond}/>
            <div className="second-lessons-page">

                <LessonOverview />

                <FirstSubtopic
                    onComplete={() => handleCompleteSubtopic(1)}
                    completed={completedSubtopics.includes(1)}
                />
                <SecondSubtopic onComplete={() => handleCompleteSubtopic(2)} completed={completedSubtopics.includes(2)} />
                <ThirdSubtopic onComplete={() => handleCompleteSubtopic(3)} completed={completedSubtopics.includes(3)} />
                <FourthSubtopic onComplete={() => handleCompleteSubtopic(4)} completed={completedSubtopics.includes(4)} />
                <FifthSubtopic onComplete={() => handleCompleteSubtopic(5)} completed={completedSubtopics.includes(5)} />
                <SixthSubtopic onComplete={() => handleCompleteSubtopic(6)} completed={completedSubtopics.includes(6)} />
                <SeventhSubtopic onComplete={() => handleCompleteSubtopic(7)} completed={completedSubtopics.includes(7)} />

                {/* Прогресс отображается */}
                <div className="progress-bar">
                    <p>Progress: {Math.round((progress / totalSubtopics) * 100)}%</p>
                </div>

                <div className='footer'>
                    <button>
                        Посмотреть курс
                    </button>
                    <button className="primary">Отметить как завершенное</button>
                    <button>
                        Следующий урок
                    </button>
                    <button className="primary" onClick={handleResetProgress}>
                        Сбросить прогресс
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SecondLesson;



//lessonProgress_processes_and_threads
//lessonProgress_processes-and-threads