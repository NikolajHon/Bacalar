import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import UploadPhotoModal from './UploadPhotoModal';
import Switch from './Switch';
import styles from '../styles/AppBar.module.css';

const AppBar = ({ title }) => {
    const { user } = useContext(UserContext);
    const [photoUrl, setPhotoUrl] = useState('');
    const [isPhotoLoaded, setIsPhotoLoaded] = useState(() => localStorage.getItem('isPhotoLoaded') === 'true');
    const [isDarkTheme, setIsDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleString());
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                setIsPhotoLoaded(true);
                localStorage.setItem('isPhotoLoaded', 'true');
            }
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
        }
    };

    useEffect(() => {
        fetchPhoto();
    }, [user]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handlePhotoUpload = async (file) => {
        if (!user || !user.id) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`http://localhost:8080/api/images/upload/user/${user.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchPhoto();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Ошибка при загрузке фото:', error);
        }
    };

    return (
        <div className={styles.appBar}>
            {/* Используем компонент Switch */}
            <div className={styles.themeToggle}>
                <Switch isChecked={isDarkTheme} onChange={toggleTheme} />
            </div>
            <div className={styles.appBarTitle}>{title}</div>
            <div className={styles.timeDate}>{currentTime}</div>
            {user && photoUrl ? (
                <div className={styles.profileButton} onClick={toggleMenu}>
                    <img src={photoUrl} alt="User Avatar" className={styles.userAvatar} />
                    <div className={`${styles.dropdownMenu} ${isMenuOpen ? styles.show : ''}`}>
                        <Link to="/profile" onClick={closeMenu} style={{ '--order': 1 }}>Profil</Link>
                        <Link to="/forum" onClick={closeMenu} style={{ '--order': 2 }}>Fórum</Link>
                        <Link onClick={closeMenu} style={{ '--order': 3 }}>Vystúpiť</Link>
                        <Link onClick={openModal} style={{ '--order': 4 }}>Nahrať фотографию</Link>
                    </div>
                </div>
            ) : (
                <div className={styles.profileButton}>
                    {user ? user.name : 'Гость'}
                </div>
            )}
            {isModalOpen && (
                <UploadPhotoModal onClose={closeModal} onUpload={handlePhotoUpload} />
            )}
        </div>
    );
};

export default AppBar;
