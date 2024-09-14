import React from 'react';

const CommentList = ({ comments }) => {
  if (!Array.isArray(comments)) {
    comments = [];
  }

  return (
    <div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p><strong>{comment.author}:</strong> {comment.content}</p>
            <p><small>{new Date(comment.createdAt).toLocaleString()}</small></p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
