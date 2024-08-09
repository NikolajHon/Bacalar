import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext'; // Импортируем UserContext
import '../../styles/forum/NewCommentFormModal.css';

const NewCommentForm = ({ discussionId, onClose, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext); // Получаем данные пользователя из контекста

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newComment = { 
      content, 
      author: user.name || 'Anonymous', // Используем имя пользователя, если оно есть
      discussionId 
    };

    fetch(`http://localhost:8080/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    }).then(() => {
      setContent(''); // Очистить форму после отправки
      onCommentAdded(); // Вызвать функцию обновления комментариев
      onClose(); // Закрыть модальное окно
    }).catch(error => {
      console.error('Error submitting comment:', error);
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Add a comment" 
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewCommentForm;
