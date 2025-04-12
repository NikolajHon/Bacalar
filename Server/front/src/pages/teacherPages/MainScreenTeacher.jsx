import React, { useState, useEffect, useRef } from 'react';
import CarouselCard from '../../components/teacher/Carousel/CarouselCard';
import StudentList from '../../components/teacher/StudentList';
import AppBar from '../../components/AppBar';
import Modal from '../../components/Modal';
import CreateGroupForm from '../../components/CreateGroupForm';
import UserRegistrationForm from '../../components/UserRegistrationForm';
import TopicListTeacher from '../../components/TopicListTeacher';
import styles from '../../styles/MainScreenTeacher/MainScreenTeacher.module.css';

const mockGroups = [
    {
        id: 1,
        content: "Math Group 101",
        teacher: {
            username: "Buchek",
        },
    },
    {
        id: 2,
        content: "Physics Group 201",
        teacher: {
            username: "Smith",
        },
    },
    {
        id: 3,
        content: "Chemistry Group 301",
        teacher: {
            username: "Johnson",
        },
    },
    {
        id: 4,
        content: "Biology Group 401",
        teacher: {
            username: "Williams",
        },
    },
];


const MainScreen = () => {
    const [groups, setGroups] = useState(mockGroups);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isUserRegistrationModalOpen, setIsUserRegistrationModalOpen] = useState(false);

    const userFormRef = useRef(null);

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

    // Обработчик клика за пределами формы
    useEffect(() => {
        const handleOutsideClick = (e) => {
            console.log('Clicked element:', e.target);
            console.log('User form ref:', userFormRef.current);

            if (
                isUserRegistrationModalOpen &&
                userFormRef.current &&
                !userFormRef.current.contains(e.target)
            ) {
                console.log('Closing modal');
                closeUserRegistrationModal();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isUserRegistrationModalOpen]);


    return (
        <div className={styles.main_page_teacher}>
            <AppBar />
            <div className={styles.teacher_page}>
                {isModalOpen && (
                    <StudentList
                        groupId={selectedGroupId}
                        onClose={closeModal}
                    />
                )}
                {isCreateGroupModalOpen && (
                    <Modal onClose={closeCreateGroupModal}>
                        <CreateGroupForm onGroupCreated={handleGroupCreated} />
                    </Modal>
                )}
                {isUserRegistrationModalOpen && (
                    <Modal onClose={closeUserRegistrationModal}>
                        <div ref={userFormRef}>
                            <UserRegistrationForm
                                onUserCreated={handleUserCreated}
                                onClose={closeUserRegistrationModal}
                            />
                        </div>
                    </Modal>
                )}
                <div className={styles.groups_page}>
                    <CarouselCard groups={groups} onCardClick={handleCardClick} />
                    <div className={styles.button_container}>
                        <button
                            onClick={handleCreateGroupClick}
                            className={styles.main_teacher_button}
                        >
                            ADD GROUP
                        </button>
                        <button
                            onClick={handleUserRegistrationClick}
                            className={styles.main_teacher_button}
                        >
                            ADD USER
                        </button>
                    </div>
                </div>
                <div >
                    <TopicListTeacher />
                </div>
            </div>
        </div>
    );
};

export default MainScreen;
