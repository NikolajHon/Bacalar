import React from 'react';
import TopicList from '../components/TopicList';
import UserList from '../components/UserList';

const MainScreen = () => {
    return (
        <div className="registration-page">
            <TopicList/>
            <UserList/>
        </div>
    );
};

export default MainScreen;
