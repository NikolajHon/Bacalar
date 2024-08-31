// PhotoManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PhotoManager = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!userId || !file) {
      setMessage('Пожалуйста, введите userId и выберите файл для загрузки.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPhotoUrl(response.data); 
      setMessage('Файл успешно загружен!');
    } catch (error) {
      setMessage('Ошибка при загрузке файла. Попробуйте еще раз.');
      console.error('Ошибка при загрузке файла:', error);
    }
  };

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
        setMessage('Фото успешно загружено.');
      } catch (error) {
        setMessage('Ошибка при загрузке фото. Попробуйте еще раз.');
        console.error('Ошибка при загрузке фото:', error);
      }
    };

    fetchPhoto();
  }, []); 

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        <button onClick={handleUpload}>Загрузить фото</button>
      </div>
      {message && <p>{message}</p>}
      {photoUrl && (
        <div>
          <h3>Загруженное фото:</h3>
          <img src={photoUrl} alt="User photo" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default PhotoManager;
