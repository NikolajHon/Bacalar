// src/components/teacher/GroupItem.jsx
import React from 'react';
import '../../styles/teacher/GroupList.css';

const GroupItem = ({ group }) => {
    return (
        <div className="group-item">
            <h3>{group.name}</h3>
        </div>
    );
};

export default GroupItem;
