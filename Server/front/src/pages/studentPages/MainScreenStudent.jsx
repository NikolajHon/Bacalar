import React from 'react';
import TopicList from '../../components/TopicList';
import UserList from '../../components/UserList';
import AppBar from '../../components/AppBar';
import styles from '../../styles/MainScreenStudent/MainScreen.module.css';

const MainScreen = () => {
    return (
        <div className={styles.mainScreen}>
            <div className={styles.appBarContainer}>
                <AppBar title="Main Screen" />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.topicListContainer}>
                    <TopicList />
                </div>
                <div className={styles.userListContainer}>
                    <UserList />
                </div>
            </div>
        </div>
    );
};

export default MainScreen;
