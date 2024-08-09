import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';  // Импортируем Link из react-router-dom
import '../styles/AppBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const AppBar = ({ title }) => {
    const { user } = useContext(UserContext);

    const [isDarkTheme, setIsDarkTheme] = useState(() => {
        // Загружаем состояние темы из localStorage
        const storedTheme = localStorage.getItem('theme');
        return storedTheme === 'dark';
    });

    useEffect(() => {
        // Применяем тему при изменении isDarkTheme
        document.body.classList.toggle('dark-theme', isDarkTheme);
        // Сохраняем состояние темы в localStorage
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    return (
        <div className="app-bar">
            <div className="theme-toggle" onClick={toggleTheme}>
                <FontAwesomeIcon icon={isDarkTheme ? faMoon : faSun} />
            </div>
            <div className="app-bar-title">{title}</div>

            {/* Добавляем кнопку для перехода на форум */}
            <div className="forum-button">
                <Link to="/forum">Forum</Link>
            </div>

            {user && <div className="profile-button">{user.name}</div>}
        </div>
    );
};

export default AppBar;
