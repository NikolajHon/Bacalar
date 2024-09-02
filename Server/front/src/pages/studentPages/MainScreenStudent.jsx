import React from 'react';
import TopicList from '../../components/TopicList';
import UserList from '../../components/UserList';
import AppBar from '../../components/AppBar';
import '../../styles/MainScreenStudent.css';

const MainScreen = () => {
    return (
        <div className="main-div">
            <AppBar />
            <TopicList/>
            <UserList/>
        </div>
    );
};

export default MainScreen;
