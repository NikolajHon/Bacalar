import React, {useState, useEffect} from 'react';
import SecondSubtopic from '../../../components/Lessons/SecondLessonComponents/SecondSubtopic';
import FirstSubtopic from '../../../components/Lessons/SecondLessonComponents/FirstSubtopic';
import LessonOverview from '../../../components/Lessons/SecondLessonComponents/LessonOverview';
import ThirdSubtopic from '../../../components/Lessons/SecondLessonComponents/ThirdSubtopic';
import FourthSubtopic from '../../../components/Lessons/SecondLessonComponents/FourthSubtopic';
import FifthSubtopic from '../../../components/Lessons/SecondLessonComponents/FifthSubtopic';
import SixthSubtopic from '../../../components/Lessons/SecondLessonComponents/SixthSubtopic';
import SeventhSubtopic from '../../../components/Lessons/SecondLessonComponents/SeventhSubtopic';
import AppBar from '../../../components/AppBar';
import LessonContent from '../../../components/LessonContent';
import listOfSubtopicSecond from '../../../components/Lessons/SecondLessonComponents/ListOfSubtopic';
import {toast} from 'react-toastify';
import '../../../styles/Lessons/SecondLesson.css'

const SecondLesson = () => {
    const [progress, setProgress] = useState(0);
    const totalSubtopics = 7;
    const lessonId = 'processes-and-threads';
    const [completedSubtopics, setCompletedSubtopics] = useState([]); // Отслеживаем завершенные подтемы


    useEffect(() => {
        const savedProgress = localStorage.getItem(`lessonProgress_${lessonId}`);
        if (savedProgress) {
            const {completed, percent, completedSubtopics} = JSON.parse(savedProgress);
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
            <AppBar/>
            <div className={'main-second-page'}>
                <LessonContent subtopics={listOfSubtopicSecond}/>
                <div className="second-lessons-page">

                    <LessonOverview/>

                    <FirstSubtopic
                        onComplete={() => handleCompleteSubtopic(1)}
                        completed={completedSubtopics.includes(1)}
                    />
                    <SecondSubtopic onComplete={() => handleCompleteSubtopic(2)}
                                    completed={completedSubtopics.includes(2)}/>
                    <ThirdSubtopic onComplete={() => handleCompleteSubtopic(3)}
                                   completed={completedSubtopics.includes(3)}/>
                    <FourthSubtopic onComplete={() => handleCompleteSubtopic(4)}
                                    completed={completedSubtopics.includes(4)}/>
                    <FifthSubtopic onComplete={() => handleCompleteSubtopic(5)}
                                   completed={completedSubtopics.includes(5)}/>
                    <SixthSubtopic onComplete={() => handleCompleteSubtopic(6)}
                                   completed={completedSubtopics.includes(6)}/>
                    <SeventhSubtopic onComplete={() => handleCompleteSubtopic(7)}
                                     completed={completedSubtopics.includes(7)}/>

                    {/* Прогресс отображается */}
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
        </div>
    );
};

export default SecondLesson;


//lessonProgress_processes_and_threads
//lessonProgress_processes-and-threads