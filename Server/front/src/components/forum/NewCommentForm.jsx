import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import '../../styles/Forum.css'
const NewCommentForm = ({ discussionId, onClose, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const { user } = useContext(UserContext);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      content,
      author: user.name || 'Anonymous',
      discussionId
    };

    fetch(`http://localhost:8080/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newComment),
    }).then(() => {
      setContent('');
      onCommentAdded();
      onClose();
    }).catch(error => {
      console.error('Ошибка при отправке комментария:', error);
    });
  };

  return (
      <div className="comment-form-modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Добавить комментарий"
                required
                className="textarea-field"
            ></textarea>
            <button type="submit" className="submit-button">Отправить</button>
          </form>
        </div>
      </div>
  );
};

export default NewCommentForm;
