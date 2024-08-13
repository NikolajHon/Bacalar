import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/teacher/StudentSearchModal.css'; // Убедитесь, что у вас есть CSS для стилизации

export default function StudentSearchModal({ groupId, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/users')
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data); // Изначально показываем всех студентов
            })
            .catch(error => console.error('Ошибка при получении студентов:', error));
    }, []);

    useEffect(() => {
        setFilteredStudents(
            students.filter(student =>
                student.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, students]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddStudent = (studentId) => {
        axios.put(`http://localhost:8080/api/users/${studentId}/group/${groupId}`)
            .then(() => {
                alert('Студент успешно добавлен в группу');
                onClose();
            })
            .catch(error => console.error('Ошибка при добавлении студента в группу:', error));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>×</span>
                <h2>Добавить студента в группу {groupId}</h2>
                <input 
                    type="text" 
                    placeholder="Поиск студентов по имени" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                />
                <ul className="student-list">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                            <li key={student.id} onClick={() => handleAddStudent(student.id)}>
                                {student.name}
                            </li>
                        ))
                    ) : (
                        <li>Студенты не найдены</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
