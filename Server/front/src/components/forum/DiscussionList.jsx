import React from 'react';
import DiscussionItem from './DiscussionItem';
import '../../styles/forum/DiscussionList.css';

const DiscussionList = ({ discussions }) => {
    return (
        <div className="discussion-list">
            {discussions.map(discussion => (
                <DiscussionItem key={discussion.id} discussion={discussion} />
            ))}
        </div>
    );
};

export default DiscussionList;
