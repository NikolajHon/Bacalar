// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MainScreenStudent.css';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/top-five');
                setUsers(response.data);
            } catch (error) {
                console.error('Ошибка при получении списка пользователей!', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="user-list-container fade-in">
            <h2>Najlepší používatelia</h2>
            <ul className="user-list">
                {users.map((user, index) => (
                    <li key={user.id} className={`user-item place-${index + 1}`}>
                        <div className="user-rank">#{index + 1}</div>
                        <div className="user-info">
                            <h3>{user.username}</h3>
                            <p>Hodnotenie: {user.rating}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
