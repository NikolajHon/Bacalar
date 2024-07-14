// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        };

        fetchUsers();

        // Add 'fade-in' class after component mounts
        const container = document.querySelector('.user-list-container');
        container.classList.add('fade-in');
    }, []);

    return (
        <div className="user-list-container">
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h3>{user.username}</h3>
                        <p>{user.email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
