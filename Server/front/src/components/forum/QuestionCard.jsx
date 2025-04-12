import React from 'react';
import styles from '../../styles/QuestionCard.module.css';
import UserAvatar from '../UserAvatar';

const QuestionCard = ({ topic, body, author, date, isComment = false }) => {
    return (
        <div className={`${styles.cardContainer} ${isComment ? styles.commentCard : ''}`}>
            <div className={styles.cardContent}>
                <h3 className={styles.topicText}>
                    {isComment ? '' : 'TOPIC: '} {topic || 'Placeholder'}
                </h3>
                <p className={styles.bodyText}>{body || 'No content available.'}</p>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.authorSection}>
                    <UserAvatar name={author || 'Guest'} />
                    <span className={styles.authorName}>{author || 'Guest User'}</span>
                </div>
                <div className={styles.dateSection}>
                    <span>{isComment ? 'Commented at:' : 'Created at:'} {date || '00.00.0000'}</span>
                </div>
            </div>
        </div>
    );
};
export default QuestionCard;
