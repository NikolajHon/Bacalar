import data from '../../data/TopicListData';
import styles from '../../styles/Forum.module.css';

export default function ListOfTopis({ onClick, selectedTopic }) {
    return (
        <div className={styles.listOfTopics}>
            {data.map((topic, index) => (
                <button
                    key={index}
                    className={
                        `${styles.listsButton} ` +
                        (selectedTopic === topic.id ? styles.activeTopic : '')
                    }
                    onClick={() => onClick(topic.id)}
                >
                    {topic.h3}
                </button>
            ))}
        </div>
    );
}
