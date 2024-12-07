import React, { useEffect } from 'react';
import DiscussionItem from './DiscussionItem';
const DiscussionList = ({ discussions, onDelete }) => {
    useEffect(() => {
        console.log('Обновленные обсуждения:', discussions);
    }, [discussions]);

    return (
        <div className="discussion-list">
            {discussions.length > 0 ? (
                discussions.map(discussion => (
                    <DiscussionItem key={discussion.id} discussion={discussion} onDelete={() => onDelete(discussion.id)} />
                ))
            ) : (
                <p>Нет доступных обсуждений.</p>
            )}
        </div>
    );
};

export default DiscussionList;
