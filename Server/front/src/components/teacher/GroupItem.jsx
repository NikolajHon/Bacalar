import React from 'react';

const GroupItem = ({ group }) => {
    return (
        <div className="group-item">
            <h3>{group.name}</h3>
        </div>
    );
};

export default GroupItem;
