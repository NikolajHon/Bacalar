import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data/TopicListData';
import styles from '../styles/MainScreenStudent/TopicList.module.css';

const TopicListTeacher = () => {
    return (
        <div className={styles.topicList}>
            {data.map((element, index) => {
                return (
                    <div className={styles.topicItem} key={index}>
                        <div className={styles.topicContent}>
                            <h3>{element.h3}</h3>
                            <p>{element.p}</p>
                            <div className={styles.linkContainer}>
                                <Link to={`/lessons/${element.Link}`} className={styles.lessonLink}>
                                    Go to Lesson
                                </Link>
                                <Link to={`/lessons/test/${index}`} className={styles.testLink}>
                                     Check your knowledge
                                </Link>
                                <Link to={`/lessons/tasks/${index}`} className={styles.testLink}>
                                     Tasks
                                </Link>
                                <Link to={`/lessons/practice/${index}`} className={styles.testLink}>
                                     Practise
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TopicListTeacher;
