// src/components/teacher/GroupList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GroupItem from './GroupItem';

const GroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/groups')
            .then(response => setGroups(response.data))
            .catch(error => console.error('Error fetching groups:', error));
    }, []);

    return (
        <div className="group-list">
            {groups.map(group => (
                <GroupItem key={group.id} group={group} />
            ))}
        </div>
    );
};

export default GroupList;
