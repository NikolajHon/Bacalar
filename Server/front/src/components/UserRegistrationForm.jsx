import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/UserRegistrationForm.module.css';

const UserRegistrationForm = React.forwardRef(({ onUserCreated, onClose }, ref) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ROLE_USER',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const form = document.querySelector(`.${styles.formBox}`);
        if (form) {
            form.classList.add(styles.fadeIn);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRoleChange = (role) => {
        setFormData({
            ...formData,
            role: role,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            console.log(response.data);
            setMessage('User registered successfully. Check your email');
            onUserCreated(response.data);
            onClose();
        } catch (error) {
            console.error('There was an error registering the user!', error);
            if (error.response && error.response.data) {
                setMessage(`Registration failed: ${error.response.data}`);
            } else {
                setMessage('Registration failed: An unknown error occurred.');
            }
        }
    };

    return (
        <div
            ref={ref}
            className={styles.bodyOverlay}
            onClick={(e) => {
                // Закрываем модальное окно, если клик был вне formBox
                onClose();
            }}
        >
            <div
                className={styles.formBox}
                onClick={(e) => {
                    // Останавливаем всплытие события клика
                    e.stopPropagation();
                }}
            >
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label>Username:</label>
                        <input
                            className={styles.inputField}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Email:</label>
                        <input
                            className={styles.inputField}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password:</label>
                        <input
                            className={styles.inputField}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`${styles.inputContainer} ${styles.roleSelection}`}>
                        <label>Role:</label>
                        <div className={styles.roleButtons}>
                            <button
                                type="button"
                                className={formData.role === 'ROLE_USER' ? styles.active : ''}
                                onClick={() => handleRoleChange('ROLE_USER')}
                            >
                                User
                            </button>
                            <button
                                type="button"
                                className={formData.role === 'ROLE_TEACHER' ? styles.active : ''}
                                onClick={() => handleRoleChange('ROLE_TEACHER')}
                            >
                                Teacher
                            </button>
                            <button
                                type="button"
                                className={formData.role === 'ROLE_ADMIN' ? styles.active : ''}
                                onClick={() => handleRoleChange('ROLE_ADMIN')}
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                    <button type="submit" className={styles.buttonSubmit}>
                        Sign Up
                    </button>
                </form>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );

});

export default UserRegistrationForm;
