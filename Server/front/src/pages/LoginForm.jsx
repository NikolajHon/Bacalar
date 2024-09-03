// src/components/LoginForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/FormStyles.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const LoginForm = () => {
    const { setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const form = document.querySelector('.form-box');
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
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            const { username, userId, role } = response.data;
            setUser({ id: userId, name: username, rating: 0, role: role });
            if (role === "ROLE_TEACHER") {
                navigate('/teacher/mainscreen');
            } else {
                navigate('/student/mainscreen');
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
            alert(error.response.data || 'Login failed');
        }
    };

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Login</button>
                </form>
                <div className="social-login">
                    <p>Don't have an account? <Link to="/register" className="register-link">Sign Up</Link></p>
                    <div className="social-icons">
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-github"></i>
                        <i className="fab fa-google"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
