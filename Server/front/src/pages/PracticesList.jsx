import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CodeExecution from '../components/CodeExecution';
import { useParams } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { UserContext } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/PracticesList.css';

const PracticesList = () => {
  const { lessonId } = useParams();
  const [practices, setPractices] = useState([]);
  const { user } = useContext(UserContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPracticeName, setNewPracticeName] = useState('');
  const [newPracticeDescription, setNewPracticeDescription] = useState('');
  const [newPracticeDifficulty, setNewPracticeDifficulty] = useState('');
  const [methodSignature, setMethodSignature] = useState('');
  const [mainTemplate, setMainTemplate] = useState('');
  const [testCases, setTestCases] = useState([{ inputData: '', expectedOutput: '', outputType: 'string' }]);

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/practices/lesson/${lessonId}`);
        console.log('Received JSON:', response.data);
        setPractices(response.data);
      } catch (error) {
        console.error('Error fetching practices', error);
      }
    };

    fetchPractices();
  }, [lessonId]);

  const handleCreatePractice = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/practices/with-testcases`, {
        description: newPracticeDescription,
        difficulty: newPracticeDifficulty,
        lessonId: lessonId,
        methodSignature: methodSignature,
        mainTemplate: mainTemplate,
        testCases: testCases,
      });

      setPractices([...practices, response.data]);
      setNewPracticeName('');
      setNewPracticeDescription('');
      setNewPracticeDifficulty('');
      setMethodSignature('');
      setMainTemplate('');
      setTestCases([{ inputData: '', expectedOutput: '', outputType: 'string' }]);
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating new practice', error);
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
  };

  const handleDeletePractice = async (practiceId) => {
    try {
      await axios.delete(`http://localhost:8080/api/practices/${practiceId}`);
      setPractices(practices.filter(practice => practice.id !== practiceId));
    } catch (error) {
      console.error('Error deleting practice', error);
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { inputData: '', expectedOutput: '', outputType: 'string' }]);
  };

  const removeTestCase = (index) => {
    const updatedTestCases = [...testCases];
    updatedTestCases.splice(index, 1);
    setTestCases(updatedTestCases);
  };

  return (
      <div className='main-practice'>
        <AppBar />
        <div className="practices-list-container">
          <h1>Lesson Questions {lessonId}</h1>
          {user.role === 'ROLE_TEACHER' ? (
              <div className='new-practice-button'>
                <button className="create-practice-button" onClick={() => setShowCreateForm(true)}>ADD A NEW PRACTICE</button>
                {showCreateForm && (
                    <div className="modal-new-practice">
                      <h2>Add New Practice</h2>
                      <input
                          type="text"
                          className="modal-input"
                          value={newPracticeName}
                          onChange={(e) => setNewPracticeName(e.target.value)}
                          placeholder="Name"
                      />
                      <textarea
                          className="modal-input"
                          value={newPracticeDescription}
                          onChange={(e) => setNewPracticeDescription(e.target.value)}
                          placeholder="Description"
                      />
                      <select
                          className="modal-input"
                          value={newPracticeDifficulty}
                          onChange={(e) => setNewPracticeDifficulty(e.target.value)}
                      >
                        <option value="">Difficulty</option>
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                      </select>

                      <input
                          type="text"
                          className="modal-input"
                          value={methodSignature}
                          onChange={(e) => setMethodSignature(e.target.value)}
                          placeholder="Method Signature, e.g., int add(int a, int b)"
                      />

                      <textarea
                          className="modal-input"
                          value={mainTemplate}
                          onChange={(e) => setMainTemplate(e.target.value)}
                          placeholder="Main Template"
                      />

                      <h3>Test Cases</h3>
                      {testCases.map((testCase, index) => (
                          <div key={index} className="test-case">
                            <input
                                type="text"
                                className="modal-input small-input"
                                value={testCase.inputData}
                                onChange={(e) => handleTestCaseChange(index, 'inputData', e.target.value)}
                                placeholder="Input Data"
                            />
                            <input
                                type="text"
                                className="modal-input small-input"
                                value={testCase.expectedOutput}
                                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                placeholder="Expected Output"
                            />
                            <select
                                className="modal-input select-input"
                                value={testCase.outputType}
                                onChange={(e) => handleTestCaseChange(index, 'outputType', e.target.value)}
                            >
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="json">JSON</option>
                            </select>
                            <button className="remove-button" onClick={() => removeTestCase(index)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                      ))}
                      <div className='practice-button-container'>
                        <button className="add-testcase-button" onClick={addTestCase}>Add Test Case</button>

                        <button className="save-button" onClick={handleCreatePractice}>Create Practice</button>
                        <button className="cancel-button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                      </div>
                    </div>
                )}

                <ul>
                  {practices.map(practice => (
                      <li key={practice.id} className='practice-item'>
                        <h3>{practice.description}</h3>
                        <h3>Test Cases:</h3>
                        {practice.testCases && practice.testCases.length > 0 ? (
                            <ul className='practice-list-teacher'>
                              {practice.testCases.map((testCase, index) => (
                                  <li className='practice-item' key={index} >
                                    <strong>Input Data:</strong> {testCase.inputData} <br />
                                    <strong>Expected Output:</strong> {testCase.expectedOutput} <br />
                                    <strong>Output Type:</strong> {testCase.outputType}
                                  </li>
                              ))}
                            </ul>
                        ) : (
                            <p>No test cases for this practice.</p>
                        )}
                        <button className="delete-practice-button" onClick={() => handleDeletePractice(practice.id)}>
                          <FontAwesomeIcon icon={faTrash} /> Delete Practice
                        </button>
                      </li>
                  ))}
                </ul>
              </div>
          ) : (
              <ul>
                {practices.map(practice => (
                    <li key={practice.id}>
                      <h2>{practice.name}</h2>
                      <CodeExecution practiceId={practice.id} />
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
};

export default PracticesList;
