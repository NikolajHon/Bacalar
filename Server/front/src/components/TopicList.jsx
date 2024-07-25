import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const TopicList = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/topics');
                setTopics(response.data);
            } catch (error) {
                console.error('Error fetching topics', error);
            }
        };

        fetchTopics();
    }, []);

    return (
        <div className="topic-list fade-in">
            <h2>Темы курса по операционным системам</h2>
            <div className="topic-item">
                <h3>Введение в операционные системы</h3>
                <p>Основные функции ОС, история и развитие, типы ОС.</p>
                <Link to={`/lessons/introduction`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Процессы и потоки</h3>
                <p>Понятия процессов и потоков, управление процессами, планирование и приоритеты.</p>
                <Link to={`/lessons/processes-and-threads`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Управление памятью</h3>
                <p>Механизмы распределения памяти, виртуальная память, страничная и сегментная организация.</p>
                <Link to={`/lessons/memory-management`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Файловые системы</h3>
                <p>Структура и организация файловых систем, методы доступа к данным, управление файловой системой.</p>
                <Link to={`/lessons/file-systems`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Ввод/вывод и драйверы устройств</h3>
                <p>Аппаратные и программные аспекты ввода/вывода, драйверы устройств.</p>
                <Link to={`/lessons/io-systems-and-drivers`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Безопасность и защита</h3>
                <p>Основы безопасности ОС, методы аутентификации, управление доступом, защита данных.</p>
                <Link to={`/lessons/security-and-protection`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Сетевые операционные системы</h3>
                <p>Основы сетевых взаимодействий, протоколы, сетевые службы.</p>
                <Link to={`/lessons/network-os`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Виртуализация</h3>
                <p>Концепции виртуальных машин, гипервизоры, преимущества виртуализации.</p>
                <Link to={`/lessons/virtualization`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Реальные операционные системы</h3>
                <p>Особенности ОС реального времени, управление ресурсами и временем выполнения задач.</p>
                <Link to={`/lessons/real-time-os`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Обработка прерываний и системных вызовов</h3>
                <p>Механизмы обработки прерываний, системные вызовы и их роль.</p>
                <Link to={`/lessons/interrupts-and-system-calls`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Мультиплатформенные и встраиваемые операционные системы</h3>
                <p>ОС для различных архитектур, особенности мобильных и встраиваемых систем.</p>
                <Link to={`/lessons/multiplatform-and-embedded-os`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Оптимизация производительности</h3>
                <p>Методы повышения эффективности работы ОС, управление энергопотреблением.</p>
                <Link to={`/lessons/performance-optimization`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
            <div className="topic-item">
                <h3>Разработка и отладка ОС</h3>
                <p>Основы создания операционных систем, методы отладки и тестирования.</p>
                <Link to={`/lessons/os-development-and-debugging`} className="lesson-link">
                    Перейти к уроку
                </Link>
            </div>
        </div>


    );
};

export default TopicList;
