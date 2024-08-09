import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/forum/DiscussionList.css';

const DiscussionItem = ({ discussion }) => {
    return (
        <Link to={`/discussion/${discussion.id}`} className="discussion-item-link">
            <div className="discussion-item">
                <div className="discussion-title">
                    {discussion.title}
                </div>
                <div className="discussion-meta">
                    <span>Author: {discussion.author}</span>
                    <span>Created: {new Date(discussion.createdAt).toLocaleString()}</span>
                    <span>Comments: {discussion.comments.length}</span>
                </div>
            </div>
        </Link>
    );
};

export default DiscussionItem;
