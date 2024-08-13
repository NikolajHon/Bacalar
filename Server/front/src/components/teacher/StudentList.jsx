import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentSearchModal from './StudentSearchModal';
import '../../styles/teacher/StudentList.css'; 

export default function StudentList({ groupId, onClose }) {
    const [students, setStudents] = useState([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    useEffect(() => {
        if (groupId) {
            axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
                .then(response => setStudents(response.data))
                .catch(error => console.error('Ошибка при получении студентов:', error));
        }
    }, [groupId]);

    const openSearchModal = () => {
        setIsSearchModalOpen(true);
    };

    const closeSearchModal = () => {
        setIsSearchModalOpen(false);
    };

    if (!groupId) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>×</span>
                <h2>Студенты в группе {groupId}</h2>
                <ul>
                    {students.map(student => (
                        <li key={student.id}>{student.name}</li>
                    ))}
                </ul>
                <button onClick={openSearchModal}>Добавить студента</button>
            </div>
            {isSearchModalOpen && (
                <StudentSearchModal groupId={groupId} onClose={closeSearchModal} />
            )}
        </div>
    );
}
