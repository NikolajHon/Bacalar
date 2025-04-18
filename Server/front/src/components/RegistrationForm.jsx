import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        // Add 'fade-in' class after component mounts
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
        <div className="form-container">
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
                    <button type="submit">Sign Up</button>
                </form>
                <div className="social-login">
                    <p>Already have an account? <Link to="/login" className="login-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
