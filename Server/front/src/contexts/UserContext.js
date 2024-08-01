// src/contexts/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Инициализация из localStorage, если данные есть
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : { id: null, name: null, rating: 0 };
    });

    useEffect(() => {
        // Сохранение данных пользователя в localStorage при изменении
        if (user.id) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
