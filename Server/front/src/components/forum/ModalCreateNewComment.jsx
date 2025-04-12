import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import styles from '../../styles/Forum.module.css';

export default function ModalCreateNewComment({ discussionId, onClose }) {
    const [content, setContent] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log('Rendered with discussionId:', discussionId);
    }, [discussionId]);
    async function handleSendNewDiscussion() {
        if ( !content) {
            alert('Vyplňte všetky polia!');
            return;
        }

        const newComment = {
            content: content,
            author: user.name,
            discussionId: discussionId,
            created_at: new Date().toISOString()
        };

        try {
            console.log("local data",newComment);
            const response = await axios.post('http://localhost:8080/api/comments', newComment);
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