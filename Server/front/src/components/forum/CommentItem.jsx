import React from 'react';
import '../../styles/Forum.css'
const CommentItem = ({ comment }) => {
  return (
    <div>
      <p>{comment.author}: {comment.content}</p>
      <p>{new Date(comment.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default CommentItem;
