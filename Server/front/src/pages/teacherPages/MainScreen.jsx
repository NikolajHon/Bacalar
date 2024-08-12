import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupsCarousel from '../../components/teacher/GroupsCarousel';
import StudentList from '../../components/teacher/StudentList';
import AppBar from '../../components/AppBar';

const MainScreen = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // GET-запрос для получения данных о группах
        axios.get('http://localhost:8080/api/groups')
            .then(response => setGroups(response.data))
            .catch(error => console.error('Ошибка при получении групп:', error));
    }, []);

    const handleCardClick = (groupId) => {
        setSelectedGroupId(groupId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGroupId(null);
    };

    return (
        <div>
            <div className='app-bar'>
                <AppBar/>
            </div>
            <div className='groups-page'>   
                <GroupsCarousel groups={groups} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && <StudentList groupId={selectedGroupId} onClose={closeModal} />}
        </div>
    );
};

export default MainScreen;
