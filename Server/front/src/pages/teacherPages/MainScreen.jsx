import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupsCarousel from '../../components/teacher/GroupsCarousel';
import AppBar from '../../components/AppBar';
const MainScreen = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // GET-запрос для получения данных о группах
        axios.get('http://localhost:8080/api/groups')
            .then(response => setGroups(response.data))
            .catch(error => console.error('Ошибка при получении групп:', error));
    }, []);

    return (
        <div>
            <div className='app-bar'>
                <AppBar/>
            </div>
            <div className='groups-page'>   
                <GroupsCarousel groups={groups} />
            </div>
        </div>
    );
};

export default MainScreen;
