// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import FirstLesson from './pages/Lessons/FirstLesson';
import SecondLesson from './pages/Lessons/SecondLesson';
import LoginForm from './pages/LoginForm';
import MainScreen from './pages/MainScreen';
import LessonQuestions from './pages/LessonQuestions';
import Tasks from './pages/Tasks';
import { UserProvider } from './contexts/UserContext'; // Добавьте этот импорт
import './App.css';

const App = () => {
    return (
        <UserProvider> {/* Оберните все в UserProvider */}
            <Router>
                <Routes>
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/mainscreen" element={<MainScreen />} />
                    <Route path="/lessons/introduction" element={<FirstLesson />} />
                    <Route path="/lessons/processes-and-threads" element={<SecondLesson />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/lessons/test/:lessonId" element={<LessonQuestions />} />
                    <Route path="/lessons/tasks/:lessonId" element={<Tasks/>} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
