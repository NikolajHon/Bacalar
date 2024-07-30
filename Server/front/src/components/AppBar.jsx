// AppBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'; // Проверьте путь
import '../styles/AppBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const AppBar = ({ title }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkTheme);
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
            {user && <div className="profile-button">{user.name}</div>}
        </div>
    );
};

export default AppBar;
