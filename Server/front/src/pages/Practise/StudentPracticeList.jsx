
import React from 'react';
import CodeExecution from '../../components/CodeExecution';
import styles from '../../styles/PracticesList.module.css';

export default function StudentPracticeList({ practices }) {
    return (
        <ul>
            {practices.map((practice) => (
                <li key={practice.id} className={styles.practiceItem}>
                    <h2>{practice.name}</h2>
                    <CodeExecution practiceId={practice.id} />
                </li>
            ))}
        </ul>
    );
}
