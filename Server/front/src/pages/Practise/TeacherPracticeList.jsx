
import React from 'react';
import TeacherPracticeListItem from './TeacherPracticeListItem';

import styles from '../../styles/PracticesList.module.css';

export default function TeacherPracticeList({ practices, onDeletePractice }) {
    return (
        <ul className={styles.practiceListTeacher}>
            {practices.map((practice) => (
                <TeacherPracticeListItem
                    key={practice.id}
                    practice={practice}
                    onDeletePractice={onDeletePractice}
                />
            ))}
        </ul>
    );
}
