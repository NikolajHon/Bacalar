import React from 'react';
import styles from '../styles/QuestionTable.module.css';

const QuestionTable = ({ questions, answers, feedback, onHighlight }) => {
    const scrollToQuestion = (questionId) => {
        const element = document.getElementById(`question-${questionId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            onHighlight(questionId);
        }
    };

    return (
        <div className={styles.questionTableContainer}>
            {questions.map((question, index) => {
                const answer = answers[question.id];
                const status = feedback[question.id];

                let boxClass = styles.questionBox;

                if (status === 'Correct') {
                    boxClass += ` ${styles.green}`; // Правильный ответ
                } else if (status === 'Incorrect') {
                    boxClass += ` ${styles.red}`; // Неправильный ответ
                } else if (answer) {
                    boxClass += ` ${styles.yellow}`; // Ответ есть, но не проверен
                }

                return (
                    <div
                        key={question.id}
                        className={boxClass}
                        onClick={() => scrollToQuestion(question.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        {index + 1}
                    </div>
                );
            })}
        </div>
    );
};

export default QuestionTable;
