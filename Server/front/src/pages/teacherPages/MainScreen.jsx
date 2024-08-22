import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselCard from '../../components/teacher/Carousel/CarouselCard';
import StudentList from '../../components/teacher/StudentList';
import AppBar from '../../components/AppBar';
import Modal from '../../components/Modal'; // Предполагаем, что у вас есть компонент Modal
import CreateGroupForm from '../../components/CreateGroupForm'; // Компонент с формой для создания группы
import UserRegistrationForm from '../../components/UserRegistrationForm'; // Компонент с формой для регистрации пользователя

const MainScreen = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState(false);

    useEffect(() => {
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

    const handleCreateGroupClick = () => {
        setIsCreateGroupModalOpen(true);
    };

    const closeCreateGroupModal = () => {
        setIsCreateGroupModalOpen(false);
    };

    const handleUserRegistrationClick = () => {
        setIsUserRegistrationModalOpen(true);
    };

    const closeUserRegistrationModal = () => {
        setIsUserRegistrationModalOpen(false);
    };

    const handleGroupCreated = (newGroup) => {
        setGroups([...groups, newGroup]);
        closeCreateGroupModal();
    };

    const handleUserCreated = (newUser) => {
        console.log('User created:', newUser);
        closeUserRegistrationModal();
    };

    return (
        <div>
            <AppBar />
            <div className='groups-page'>
                <button onClick={handleCreateGroupClick}>Добавить группу</button>
                <button onClick={handleUserRegistrationClick}>Добавить пользователя</button>
                <CarouselCard groups={groups} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && <StudentList groupId={selectedGroupId} onClose={closeModal} />}
            {isCreateGroupModalOpen && (
                <Modal onClose={closeCreateGroupModal}>
                    <CreateGroupForm onGroupCreated={handleGroupCreated} />
                </Modal>
            )}
            {isUserRegistrationModalOpen && (
                <Modal onClose={closeUserRegistrationModal}>
                    <UserRegistrationForm onUserCreated={handleUserCreated} onClose={closeUserRegistrationModal} />
                </Modal>
            )}
        </div>
    );
};

export default MainScreen;
