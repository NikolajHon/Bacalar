import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/teacher/StudentList.css';
import StudentSearchModal from './StudentSearchModal'; // Импорт модального окна для добавления студентов

export default function StudentList({ groupId, onClose }) {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (groupId) {
            axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
                .then(response => {
                    console.log(response.data); // Выводим данные в консоль для проверки
                    setStudents(response.data);
                })
                .catch(error => console.error('Ошибка при получении студентов:', error));
        }
    }, [groupId]);


    if (!groupId) return null;

    const handleAddStudentClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Обновляем список студентов после закрытия модального окна
        axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
            .then(response => setStudents(response.data))
            .catch(error => console.error('Ошибка при обновлении списка студентов:', error));
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>×</span>
                <h2>Students in Group {groupId}</h2>
                <ul>
                    {students.map(student => (
                        <li key={student.id}>{student.username} {student.rating} </li>
                    ))}
                </ul>

                <button onClick={handleAddStudentClick}>Add Student</button>

                {isModalOpen && (
                    <StudentSearchModal
                        groupId={groupId}
                        onClose={handleModalClose}
                    />
                )}
            </div>
        </div>
    );
}
