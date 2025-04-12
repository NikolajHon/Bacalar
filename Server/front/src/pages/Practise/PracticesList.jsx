import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import AppBar from '../../components/AppBar';

import TeacherPracticeList from './TeacherPracticeList';
import StudentPracticeList from './StudentPracticeList';
import CreatePracticeModal from './CreatePracticeModal';

import styles from '../../styles/PracticesList.module.css';

const PracticesList = () => {
    const { lessonId } = useParams();
    const { user } = useContext(UserContext);

    const [practices, setPractices] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Polia pre novú praktickú úlohu:
    const [newPracticeName, setNewPracticeName] = useState('');
    const [newPracticeDescription, setNewPracticeDescription] = useState('');
    const [newPracticeDifficulty, setNewPracticeDifficulty] = useState('');
    const [methodSignature, setMethodSignature] = useState('');
    const [mainTemplate, setMainTemplate] = useState('');
    const [testCases, setTestCases] = useState([{ inputData: '', expectedOutput: '', outputType: 'string' }]);

    // 1) Načítanie zoznamu praktických úloh
    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/practices/lesson/${lessonId}`);
                setPractices(response.data);
            } catch (error) {
                console.error('Chyba pri načítaní praktických úloh:', error);
            }
        };
        fetchPractices();
    }, [lessonId]);

    // 2) Vytvorenie novej praktickej úlohy (pre učiteľa)
    const handleCreatePractice = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/practices/with-testcases', {
                description: newPracticeDescription,
                difficulty: newPracticeDifficulty,
                lessonId: lessonId,
                methodSignature: methodSignature,
                mainTemplate: mainTemplate,
                testCases: testCases,
            });

            setPractices([...practices, response.data]);
            // Resetovanie polí formulára
            setNewPracticeName('');
            setNewPracticeDescription('');
            setNewPracticeDifficulty('');
            setMethodSignature('');
            setMainTemplate('');
            setTestCases([{ inputData: '', expectedOutput: '', outputType: 'string' }]);
            setShowCreateForm(false);
        } catch (error) {
            console.error('Chyba pri vytváraní praktickej úlohy:', error);
        }
    };

    // 3) Odstránenie praktickej úlohy
    const handleDeletePractice = async (practiceId) => {
        try {
            await axios.delete(`http://localhost:8080/api/practices/${practiceId}`);
            setPractices(practices.filter((p) => p.id !== practiceId));
        } catch (error) {
            console.error('Chyba pri odstraňovaní praktickej úlohy:', error);
        }
    };

    return (
        <div className={styles.mainPractice}>
            <AppBar title={`Praktické úlohy k lekcii ${lessonId}`} />

            <div className={styles.practicesListContainer}>
                <h1>Zoznam praktických úloh pre lekciu {lessonId}</h1>

                {user.role === 'ROLE_TEACHER' ? (
                    <>
                        <button className={styles.createPracticeButton} onClick={() => setShowCreateForm(true)}>
                            Vymyslieť novú úlohu
                        </button>

                        {showCreateForm && (
                            <div className={styles.modalOverlay}>
                                <CreatePracticeModal
                                    onClose={() => setShowCreateForm(false)}
                                    onCreate={handleCreatePractice}
                                    newPracticeName={newPracticeName}
                                    setNewPracticeName={setNewPracticeName}
                                    newPracticeDescription={newPracticeDescription}
                                    setNewPracticeDescription={setNewPracticeDescription}
                                    newPracticeDifficulty={newPracticeDifficulty}
                                    setNewPracticeDifficulty={setNewPracticeDifficulty}
                                    methodSignature={methodSignature}
                                    setMethodSignature={setMethodSignature}
                                    mainTemplate={mainTemplate}
                                    setMainTemplate={setMainTemplate}
                                    testCases={testCases}
                                    setTestCases={setTestCases}
                                />
                            </div>
                        )}

                        <TeacherPracticeList practices={practices} onDeletePractice={handleDeletePractice} />
                    </>
                ) : (
                    <StudentPracticeList practices={practices} />
                )}
            </div>
        </div>
    );
};

export default PracticesList;
