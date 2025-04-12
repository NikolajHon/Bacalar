// AppBar.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import Switch from './Switch';
// import Avatar from '@mui/material/Avatar'; // ❌ Больше не нужно
import UserAvatar from './UserAvatar';       // ✅ Новый импорт
import styles from '../styles/AppBar.module.css';
import TUKE_logo_dark from '../images/logo_tuke2.png';
import TUKE_logo_white from '../images/tuke-logo-white.png';

const AppBar = ({ title }) => {
    const { user } = useContext(UserContext);

    // Можно удалить isPhotoLoaded, если оно не используется:
    // const [isPhotoLoaded, setIsPhotoLoaded] = useState(
    //     () => localStorage.getItem('isPhotoLoaded') === 'true'
    // );

    const [isDarkTheme, setIsDarkTheme] = useState(() => localStorage.getItem('theme') === 'dark');
    const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleString());

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

    return (
        <header className={styles.appBar}>
            <img
                src={isDarkTheme ? TUKE_logo_white : TUKE_logo_dark}
                alt="TUKE logo"
                className={styles.logo}
            />

            <section className={styles.themeToggle}>
                <Switch isChecked={isDarkTheme} onChange={toggleTheme} />
            </section>

            <h1 className={styles.appBarTitle}>{title}</h1>

            <time className={styles.timeDate}>{currentTime}</time>

            <nav className={styles.profile}>
                <UserAvatar name={user?.name} />
            </nav>
        </header>
    );
};

export default AppBar;
