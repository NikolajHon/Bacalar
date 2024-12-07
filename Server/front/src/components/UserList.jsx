
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/MainScreenStudent/UserList.module.css';


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
        <div className={styles.userListContainer}>
            <h2>Najlepší používatelia</h2>
            <ul className={styles.userList}>
                {users.map((user, index) => (
                    <li key={user.id} className={`${styles.userItem} ${styles[`place-${index + 1}`]}`}>
                        <div className={styles.userRank}>#{index + 1}</div>
                        <div className={styles.userInfo}>
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
