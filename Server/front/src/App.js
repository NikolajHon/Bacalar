import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import CarouselCard from './components/teacher/Carousel/CarouselCard';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PracticesList from './pages/PracticesList';

const Registration = lazy(() => import('./pages/Registration'));
const FirstLesson = lazy(() => import('./pages/studentPages/Lessons/FirstLesson'));
const SecondLesson = lazy(() => import('./pages/studentPages/Lessons/SecondLesson'));
const LoginForm = lazy(() => import('./pages/LoginForm'));
const StudentMainScreen = lazy(() => import('./pages/studentPages/MainScreenStudent'));
const TeacherMainScreen = lazy(() => import('./pages/teacherPages/MainScreenTeacher'));
const LessonQuestionsStudent = lazy(() => import('./pages/studentPages/LessonQuestionsStudent'));
const LessonQuestionsTeacher = lazy(() => import('./pages/teacherPages/LessonQuestionsTeacher'));
const Tasks = lazy(() => import('./pages/studentPages/TasksStudent'));
const ForumPage = lazy(() => import('./pages/forum/ForumPage'));
const DiscussionPage = lazy(() => import('./pages/forum/DiscussionPage'));
const StudentProfile = lazy(() =>import('./pages/StudentProfile'));


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
                        <Route path="/student/mainscreen/lessons/practice/:lessonId" element={<PracticesList />} />
                        <Route path="/lessons/introduction" element={<FirstLesson />} />
                        <Route path="/lessons/processes-and-threads" element={<SecondLesson />} />
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/lessons/test/:lessonId" element={<LessonQuestionsStudent />} />
                        <Route path="/lessons/tasks/:lessonId" element={<Tasks />} />
                        <Route path="lessons/practice/:lessonId" element={<PracticesList />} />
                        <Route path="/forum" element={<ForumPage />} />
                        <Route path="/discussion/:id" element={<DiscussionPage />} />
                        <Route path="/carousel" element={<CarouselCard />} />
                        <Route path="/studentProfile" element={<StudentProfile />} />
                    </Routes>
                </Suspense>
            </Router>
        </UserProvider>
    );
};

export default App;
