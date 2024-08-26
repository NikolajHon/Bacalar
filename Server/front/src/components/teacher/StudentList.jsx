import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/teacher/StudentList.css';
import StudentSearchModal from './StudentSearchModal';

export default function StudentList({ groupId, onClose }) {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (groupId) {
            axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
                .then(response => {
                    // Сортируем студентов по рейтингу в порядке убывания
                    const sortedStudents = response.data.sort((a, b) => b.rating - a.rating);
                    setStudents(sortedStudents);
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
        axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
            .then(response => {
                const sortedStudents = response.data.sort((a, b) => b.rating - a.rating);
                setStudents(sortedStudents);
            })
            .catch(error => console.error('Ошибка при обновлении списка студентов:', error));
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose(); // Закрываем модальное окно при клике вне его области
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}> {/* Затемненный фон и обработчик клика */}
            <div className="modal-content student-list" onClick={(e) => e.stopPropagation()}> {/* Останавливаем всплытие события клика */}
                <h2>Students in Group {groupId}</h2>
                <ul>
                    {students.map(student => (
                        <li key={student.id}>{student.username} {student.rating}</li>
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
