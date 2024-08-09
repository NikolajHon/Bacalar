import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './App.css';

const Registration = lazy(() => import('./pages/Registration'));
const FirstLesson = lazy(() => import('./pages/studentPages/Lessons/FirstLesson'));
const SecondLesson = lazy(() => import('./pages/studentPages/Lessons/SecondLesson'));
const LoginForm = lazy(() => import('./pages/LoginForm'));
const StudentMainScreen = lazy(() => import('./pages/studentPages/MainScreen'));
const TeacherMainScreen = lazy(() => import('./pages/teacherPages/MainScreen'));
const LessonQuestions = lazy(() => import('./pages/studentPages/LessonQuestions'));
const Tasks = lazy(() => import('./pages/studentPages/Tasks'));

// Новые страницы форума
const ForumPage = lazy(() => import('./pages/forum/ForumPage'));
const DiscussionPage = lazy(() => import('./pages/forum/DiscussionPage'));

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/register" element={<Registration />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/student/mainscreen" element={<StudentMainScreen />} />
                        <Route path="/teacher/mainscreen" element={<TeacherMainScreen />} />
                        <Route path="/lessons/introduction" element={<FirstLesson />} />
                        <Route path="/lessons/processes-and-threads" element={<SecondLesson />} />
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/lessons/test/:lessonId" element={<LessonQuestions />} />
                        <Route path="/lessons/tasks/:lessonId" element={<Tasks />} />
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/discussion/:id" element={<DiscussionPage />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider>
    );
};

export default App;
