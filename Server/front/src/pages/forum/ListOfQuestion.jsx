import styles from '../../styles/Forum.module.css';
import {useNavigate} from 'react-router-dom';

function formatDate(isoString) {
    if (!isoString) return "Unknown date";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Invalid date"; // Проверка на корректность даты

    return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

export default function ListOfQuestion({listOfQuestions = []}) {
    const navigate = useNavigate();

    console.log("List of questions:", listOfQuestions);

    return (
        <div className={styles.listOfQuestions}>
            {listOfQuestions.length > 0 ? (

                listOfQuestions.map((question, index) => (
                    <div
                        key={question.id || index}
                        className={styles.questionCard}
                        onClick={() => navigate(`/discussion/${question.id}`)}
                    >
                        <h3 className={styles.questionTitle}>TOPIC: {question.title || "Untitled"}</h3>
                        <div className={styles.questionMeta}>
                            <span className={styles.questionAuthor}>Author: {question.author || "Unknown"}</span>
                            <span>Comments: {Array.isArray(question.comments) ? question.comments.length : 0}</span>
                            <span
                                className={styles.questionDate}>Created at: {formatDate(question.createdAt)}</span>
                        </div>
                    </div>
                ))


            ) : (
                <p>No questions available</p>
            )}
        </div>
    );
}
