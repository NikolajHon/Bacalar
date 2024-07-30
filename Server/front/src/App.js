import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import FirstLesson from './pages/FirstLesson';
import SecondLesson from './pages/SecondLesson';
import LoginForm from './pages/LoginForm';
import MainScreen from './pages/MainScreen';
import LessonQuestions from './pages/LessonQuestions'
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/mainscreen" element={<MainScreen />} />
                <Route path="/lessons/introduction" element={<FirstLesson />} />
                <Route path="/lessons/processes-and-threads" element={<SecondLesson />} />
                <Route path="/" element={<LoginForm />} />
                <Route path="/lessons/test/:lessonId" element={<LessonQuestions />} />
                
            </Routes>
        </Router>
    );
};

export default App;
