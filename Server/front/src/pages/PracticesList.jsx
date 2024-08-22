import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import CodeExecution from '../components/CodeExecution'; // Предполагается, что этот компонент уже существует
import { useParams } from 'react-router-dom';
import AppBar from '../components/AppBar';

const PracticesList = () => {
  const { lessonId } = useParams(); // Получаем lessonId из параметров маршрута
  const [practices, setPractices] = useState([]);

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/practices/lesson/${lessonId}`);
        console.log('Received JSON:', response.data); // Логируем полученные данные
        setPractices(response.data);
      } catch (error) {
        console.error('Error fetching practices', error);
      }
    };

    fetchPractices();
  }, [lessonId]);

  return (
    <div className="practices-list-container">
    <AppBar/>
      <h1>Practices for Lesson {lessonId}</h1>
      <ul>
        {practices.map(practice => (
          <li key={practice.id}>
            <h2>{practice.name}</h2>
            {/* Рендерим компонент CodeExecution для каждого practice */}
            <CodeExecution practiceId={practice.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PracticesList;
