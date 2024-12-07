import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import styles from '../styles/MainScreenStudent/TopicList.module.css'; 

const TopicList = () => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        const updatedData = data.map((element, index) => {
            const lessonId = `lessonProgress_${element.Link}`;
            const savedProgress = localStorage.getItem(lessonId);
            let progress = 0;

            if (savedProgress) {
                const { percent } = JSON.parse(savedProgress);
                progress = percent;
            }

            return {
                ...element,
                progress: parseInt(progress, 10),
            };
        });
        setProgressData(updatedData);
    }, []);

    return (
        <div className={`${styles.topicList} fade-in`}>
            <div className="colon">
                <h1>Pokrok v zručnostiach</h1>
                <h4>Nasledujúce kurzy by sa mali absolvovať v poradí</h4>
            </div>
            {progressData.map((element, index) => {
                const progress = element.progress || 0;
                return (
                    <div className={styles.topicItem} key={index}>
                        <div className={styles.topicItemContent}>
                            <div className={styles.progressCircle}>
                                <svg viewBox="0 0 36 36">
                                    <path
                                        className={styles.circleBg}
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={styles.circle}
                                        strokeDasharray={`${progress}, 100`}
                                        d="M18 2.0845
                                           a 15.9155 15.9155 0 0 1 0 31.831
                                           a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <span className={styles.percentage}>{progress}%</span>
                            </div>
                            <div className={styles.topicContent}>
                                <h3>{element.h3}</h3>
                                <p>{element.p}</p>
                                <div className={styles.linkContainer}>
                                    <Link to={`/lessons/${element.Link}`} className={styles.lessonLink}>
                                        Prejsť na lekciu
                                    </Link>
                                    <Link to={`/lessons/test/${index}`} className={styles.testLink}>
                                        Testovanie vedomostí
                                    </Link>
                                    <Link to={`/lessons/tasks/${index}`} className={styles.testLink}>
                                        Úlohy
                                    </Link>
                                    <Link to={`lessons/practice/${index}`} className={styles.testLink}>
                                        Prax
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TopicList;
