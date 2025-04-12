import data from '../../data/TopicListData';
import styles from '../../styles/Forum.module.css';

export default function ListOfTopis({ onClick }) {
    return (
        <div className={styles.listOfTopics}>
            {data.map((topic, index) => (
                <button
                    key={index}
                    className={styles.listsButton}
                    onClick={() => onClick(topic.id)}
                >
                    {topic.h3}
                </button>
            ))}
        </div>
    );
}
