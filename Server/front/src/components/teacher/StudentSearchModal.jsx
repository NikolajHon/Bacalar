import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/teacher/StudentSearchModal.css'; // Убедитесь, что путь к CSS верный

export default function StudentSearchModal({ groupId, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    // Эффект для получения списка всех студентов при загрузке компонента
    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении студентов:', error);
                toast.error('Ошибка при получении студентов.'); // Сообщение об ошибке
            });
    }, []);

    // Эффект для фильтрации студентов по поисковому запросу
    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                student.username?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, students]);

    // Обработчик изменения поискового запроса
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Обработчик добавления студента в группу
    const handleAddStudent = (studentId) => {
        axios.put(`http://localhost:8080/api/users/${studentId}/group/${groupId}`)
            .then(() => {
                toast.success('Студент успешно добавлен в группу'); // Сообщение об успешном добавлении
                onClose(); // Закрытие модального окна
            })
            .catch(error => {
                console.error('Ошибка при добавлении студента в группу:', error);
                toast.error('Ошибка при добавлении студента в группу.'); // Сообщение об ошибке
            });
    };

    return (
        <div className="modal-content">
            <span className="close-button" onClick={onClose}>×</span>
            <h2>Добавить студента в группу {groupId}</h2>
            <input 
                type="text" 
                placeholder="Поиск студентов по имени" 
                value={searchTerm} 
                onChange={handleSearchChange}
            />
            <ul>
                {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                        <li key={student.id} onClick={() => handleAddStudent(student.id)}>
                            {student.username}
                        </li>
                    ))
                ) : (
                    <li className="no-students">Студенты не найдены</li>
                )}
            </ul>
            {/* Контейнер для Toast сообщений */}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
