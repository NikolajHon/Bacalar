import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import styles from '../../styles/Forum.module.css';

export default function ModalCreateNewDiscussion({ lessonId, onClose }) {
    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/discussions/lesson/${lessonId}`);
                console.log(response.data);
            } catch (error) {
                console.error('Chyba pri načítaní diskusií:', error);
            }
        };
        if (lessonId !== null) {
            fetchDiscussions();
        }
    }, [lessonId]);

    async function handleSendNewDiscussion() {
        if (!topic || !content) {
            alert('Vyplňte všetky polia!');
            return;
        }

        const newDiscussion = {
            title: topic,
            content: content,
            author: user.name,
            lessonId: lessonId,
            created_at: new Date().toISOString()
        };

        try {
            console.log("local data",newDiscussion);
            const response = await axios.post('http://localhost:8080/api/discussions', newDiscussion);
            console.log('Diskusia bola vytvorená:', response.data);
            onClose();
        } catch (error) {
            console.error('Chyba pri vytváraní diskusie:', error);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Vytvoriť novú diskusiu</h2>
                <input
                    type='text'
                    placeholder='Zadajte tému'
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder='Zadajte popis'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={styles.textarea}
                />
                <button onClick={handleSendNewDiscussion} className={styles.button}>Odoslať</button>
                <button onClick={onClose} className={styles.buttonCancel}>Zrušiť</button>
            </div>
        </div>
    );
}