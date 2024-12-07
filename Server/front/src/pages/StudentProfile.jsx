import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from '../components/AppBar';
import TopicList from '../components/TopicList'


const StudentProfile = () => {
    const location = useLocation();
    const [userId, setUserId] = useState(location.state?.studentId || '');
    const [user, setUser] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false); // флаг для проверки загрузки данных
    const [isPhotoLoaded, setIsPhotoLoaded] = useState(false); // флаг для проверки загрузки фото

    // Хук для загрузки данных пользователя
    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                setUser(response.data);
                if (!isUserDataLoaded) { // Проверяем флаг перед показом уведомления
                    toast.success('Данные пользователя успешно загружены!');
                    setIsUserDataLoaded(true); // Устанавливаем флаг в true после первого успешного вызова
                }
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
                toast.error('Ошибка при загрузке данных пользователя. Попробуйте еще раз.');
            }
        };

        fetchUserData();
    }, [userId, isUserDataLoaded]); // Добавляем isUserDataLoaded в зависимости

    // Хук для загрузки фотографии пользователя
    useEffect(() => {
        const fetchPhoto = async () => {
            if (!userId) return;

            try {
                console.log(userId);
                console.log("WE ARE HERE");
                const response = await axios.get(`http://localhost:8080/api/download/user/${userId}`, {
                    responseType: 'blob',
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                setPhotoUrl(url);
                if (!isPhotoLoaded) { // Проверяем флаг перед показом уведомления
                    toast.success('Фото успешно загружено!');
                    setIsPhotoLoaded(true); // Устанавливаем флаг в true после первого успешного вызова
                }
            } catch (error) {
                console.error('Ошибка при загрузке фото:', error);
                toast.error('Ошибка при загрузке фото. Попробуйте еще раз.');
            }
        };

        fetchPhoto();
    }, [userId, isPhotoLoaded]); // Добавляем isPhotoLoaded в зависимости

    return (
        <div>
            <AppBar/>
            <div className="profile-container">
                <ToastContainer />
                {user ? (
                    <div className="profile-card">
                        <div className="profile-header">
                            {photoUrl ? (
                                <img className="profile-photo" src={photoUrl} alt="Profile" />
                            ) : (
                                <p>Загрузка фото...</p>
                            )}
                            <h2>{user.username}</h2>
                            <p>{user.email}</p>
                        </div>
                        <div className="profile-stats">
                            <div>
                                <h3>{user.friendsCount}</h3>
                                <p>Friends</p>
                            </div>
                            <div>
                                <h3>{user.rating}</h3>
                                <p>Rating</p>
                            </div>
                            <div>
                                <h3>{user.commentsCount}</h3>
                                <p>Comments</p>
                            </div>
                        </div>
                        <button className="profile-button">Write a message</button>
                    </div>
                ) : (
                    <p>Загрузка данных пользователя...</p>
                )}
                
            </div>
            <TopicList/>
        </div>
    );
};

export default StudentProfile;
