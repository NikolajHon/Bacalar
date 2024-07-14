import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import LessonContent from './components/LessonContent';
import LoginForm from './pages/LoginForm';
import MainScreen from './pages/MainScreen';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/mainscreen" element={<MainScreen />} />
                <Route path="/lessons/:id" element={<LessonContent />} />
                <Route path="/" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;
