import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import '../styles/AppBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadPhotoModal from './UploadPhotoModal';

const AppBar = ({ title }) => {
    const { user, setUser } = useContext(UserContext);
    const [photoUrl, setPhotoUrl] = useState('');
    const [isPhotoLoaded, setIsPhotoLoaded] = useState(() => {
        return localStorage.getItem('isPhotoLoaded') === 'true';
    });
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    });
    const [currentTime, setCurrentTime] = useState(() => {
        return new Date().toLocaleString();
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const fetchPhoto = async () => {
        if (!user || !user.id) return;

        try {
            const response = await axios.get(`http://localhost:8080/api/images/${user.id}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setPhotoUrl(url);

            if (!isPhotoLoaded) {
                toast.success('Фото успешно загружено!');
                setIsPhotoLoaded(true);
                localStorage.setItem('isPhotoLoaded', 'true');
            }
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
            toast.error('Ошибка при загрузке фото.');
        }
    };

    useEffect(() => {
        fetchPhoto(); // Загружаем фото при монтировании компонента
    }, [user]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setIsModalOpen(false); // Закрываем модальное окно
    };

    const handlePhotoUpload = async (file) => {
        if (!user || !user.id) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`http://localhost:8080/api/images/upload/user/${user.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Фото успешно загружено!');
            fetchPhoto(); // Обновляем фото после загрузки
            setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
            toast.error('Ошибка при загрузке фото.');
        }
    };

    return (
        <div className='app-bar'>
            <ToastContainer />
            <div className="theme-toggle" onClick={toggleTheme}>
                <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} />
            </div>
            <div className="app-bar-title">{title}</div>

            <button onClick={openModal}>Upload Photo</button> {/* Кнопка для открытия модального окна */}
            <div className="time-date">
                {currentTime}
            </div>

            {user && photoUrl ? (
                <div className="profile-button" onClick={toggleMenu}>
                    <img src={photoUrl} alt="User Avatar" className="user-avatar" />
                    {isMenuOpen && (
                        <div className="dropdown-menu">
                            <Link to="/profile" onClick={closeMenu}>Profile</Link>
                            <Link to="/forum" onClick={closeMenu}>Forum</Link>
                            <button onClick={() => { /* добавьте логику выхода */ closeMenu(); }}>Log out</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="profile-button">
                    {user ? user.name : 'Guest'}
                </div>
            )}

            {isModalOpen && (
                <UploadPhotoModal onClose={closeModal} onUpload={handlePhotoUpload} />
            )}
        </div>
    );
};

export default AppBar;
