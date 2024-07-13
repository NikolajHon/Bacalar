import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RegistrationForm.css';
import {Link} from "react-router-dom";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Add 'fade-in' class after component mounts
        const form = document.querySelector('.registration-form');
        form.classList.add('fade-in');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            console.log(response.data);
            setMessage('User registered successfully. Check your email');
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
        <div className="registration-form">
            <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
            {message && <p className="message">{message}</p>}
            <div className="social-login">
                <p>Don't have an account? <Link to="/" className="register-link">Sign Up</Link></p>
                <div className="social-icons">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-github"></i>
                    <i className="fab fa-google"></i>
                </div>

            </div>
        </div>
    );
};

export default RegistrationForm;
