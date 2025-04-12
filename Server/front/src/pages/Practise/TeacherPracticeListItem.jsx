
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/PracticesList.module.css';

export default function TeacherPracticeListItem({ practice, onDeletePractice }) {
    return (
        <li className={styles.practiceItem}>
            <h3>{practice.description}</h3>

            <h4>Testovacie prípady:</h4>
            {practice.testCases && practice.testCases.length > 0 ? (
                <ul>
                    {practice.testCases.map((testCase, index) => (
                        <li key={index}>
                            <strong>Vstupné údaje:</strong> {testCase.inputData} <br />
                            <strong>Očakávaný výstup:</strong> {testCase.expectedOutput} <br />
                            <strong>Typ výstupu:</strong> {testCase.outputType}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Pre toto zadanie neexistujú žiadne testovacie prípady</p>
            )}

            <button
                className={styles.deletePracticeButton}
                onClick={() => onDeletePractice(practice.id)}
            >
                <FontAwesomeIcon icon={faTrash} /> Odstrániť
            </button>
        </li>
    );
}
