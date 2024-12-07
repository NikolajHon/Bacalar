import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentSearchModal from './StudentSearchModal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function StudentList({ groupId, onClose }) {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (groupId) {
            fetchStudents();
        }
    }, [groupId]);

    const fetchStudents = () => {
        axios.get(`http://localhost:8080/api/groups/${groupId}/students`)
            .then(response => {
                const sortedStudents = response.data.sort((a, b) => b.rating - a.rating);
                setStudents(sortedStudents);
            })
            .catch(error => console.error('Ошибка при получении студентов:', error));
    };

    if (!groupId) return null;

    const handleAddStudentClick = () => {
        setIsModalOpen(true);
    };

    const handleProfile = (studentId) => {
        navigate('/studentProfile', { state: { studentId } }); 
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchStudents(); // Refresh students list after closing the modal
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose(); 
        }
    };

    const handleDeleteStudent = (studentId) => {
        axios.delete(`http://localhost:8080/api/groups/${groupId}/students/${studentId}`)
            .then(() => {
                fetchStudents(); // Refresh the list after deletion
            })
            .catch(error => console.error('Ошибка при удалении студента:', error));
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content student-list" onClick={(e) => e.stopPropagation()}>
                <h2>Students in Group {groupId}</h2>
                
                {students.map(student => (
                    <div key={student.id} className="student-item">
                        <button 
                            onClick={() => handleProfile(student.id)} 
                            className="student-button"
                        >
                            <span className="student-name">{student.username}</span>
                            <span className="student-score">{student.rating}</span>
                        </button>
                        <button 
                            onClick={() => handleDeleteStudent(student.id)} 
                            className="delete-button"
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                    </div>
                ))}

                <button onClick={handleAddStudentClick} className="add-student-button">Add Student</button>

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
