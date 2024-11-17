// src/pages/MainScreen.jsx
import React from 'react';
import TopicList from '../../components/TopicList';
import UserList from '../../components/UserList';
import AppBar from '../../components/AppBar';
import '../../styles/MainScreenStudent.css';

const MainScreen = () => {
    return (
        <div className="main-screen">
            <AppBar className="app-bar" />
            <div className="content-wrapper">
                <div className="content-grid">
                    <TopicList />
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default MainScreen;
