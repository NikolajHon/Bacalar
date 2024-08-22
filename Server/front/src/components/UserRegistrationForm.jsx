import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';

const UserRegistrationForm = ({ onUserCreated, onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ROLE_USER', // Начальное значение роли
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        const form = document.querySelector('.form-box');
        if (form) {
            form.classList.add('fade-in');
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
            onUserCreated(response.data); // Передаем данные в основной компонент
            onClose(); // Закрываем модальное окно после успешной регистрации
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
        <div className="form-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-container role-selection">
                    <label>Role:</label>
                    <div className="role-buttons">
                        <button
                            type="button"
                            className={formData.role === 'ROLE_USER' ? 'active' : ''}
                            onClick={() => handleRoleChange('ROLE_USER')}
                        >
                            User
                        </button>
                        <button
                            type="button"
                            className={formData.role === 'ROLE_TEACHER' ? 'active' : ''}
                            onClick={() => handleRoleChange('ROLE_TEACHER')}
                        >
                            Teacher
                        </button>
                        <button
                            type="button"
                            className={formData.role === 'ROLE_ADMIN' ? 'active' : ''}
                            onClick={() => handleRoleChange('ROLE_ADMIN')}
                        >
                            Admin
                        </button>
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default UserRegistrationForm;
