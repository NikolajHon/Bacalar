import React, { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import '../styles/CodeExecution.css';
import AppBar from './AppBar';
import ErrorMessage from '../components/Error/ErrorMessage'; 

const CodeExecution = ({ practiceId }) => {
  const [code, setCode] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(''); // Состояние для ошибок
  const { user } = useContext(UserContext);

  useEffect(() => {
    const checkCompletionStatus = async () => {
      try {
        if (practiceId) {
          const response = await axios.get(`http://localhost:8080/api/practices/${practiceId}/isCompleted`, {
            params: { userId: user.id } // Используем user.id из контекста
          });
          setIsCompleted(response.data);
        } else {
          console.error('practiceId is undefined');
          setError('Practice ID не определен.'); // Устанавливаем сообщение об ошибке
        }
      } catch (error) {
        console.error('Error checking completion status', error);
        setError('Ошибка при проверке статуса завершения задачи.');
      }
    };

    const fetchTaskTextAndDifficulty = async () => {
      try {
        if (practiceId) {
          const response = await axios.get(`http://localhost:8080/api/practices/${practiceId}`);
          setTaskText(response.data.description);
          setDifficulty(response.data.difficulty);
        } else {
          console.error('practiceId is undefined');
          setError('Practice ID не определен.'); // Устанавливаем сообщение об ошибке
        }
      } catch (error) {
        console.error('Error fetching task text', error);
        setError('Ошибка при получении текста задачи.');
      }
    };

    if (practiceId) {
      checkCompletionStatus();
      fetchTaskTextAndDifficulty();
    }
  }, [practiceId, user.id]); // Добавляем зависимость user.id

  const handleSubmit = () => {
    if (isCompleted) {
      setIsModalOpen(true);
      return;
    }

    const executeCode = async () => {
      try {
        if (practiceId) {
          const response = await axios.post(`http://localhost:8080/api/execute/${practiceId}`, {
            code,
            userId: user.id, 
          });

          const result = response.data;
          setResults(result);

          const allPassed = result.every(test => test.correct);
          if (allPassed) {
            setStatus('Success: Все тесты пройдены успешно!');
            awardPoints();
          } else {
            setStatus('Error: Не все тесты пройдены. Проверьте свой код.');
          }
        } else {
          console.error('practiceId is undefined');
          setError('Practice ID не определен.');
        }
      } catch (error) {
        console.error('There was an error executing the code!', error);
        setStatus('Error: Произошла ошибка при выполнении кода.');
        setError('Ошибка при выполнении кода. Попробуйте еще раз.');
      }
    };

    executeCode();
  };

  const awardPoints = async () => {
    let points = 0;
    if (difficulty === 'EASY') points = 5;
    if (difficulty === 'MEDIUM') points = 10;
    if (difficulty === 'HARD') points = 15;

    try {
      await axios.post('http://localhost:8080/api/users/changeRating', null, {
        params: {
          userId: user.id,
          ratingChange: points,
        }
      });
      console.log(`User awarded ${points} points`);
    } catch (error) {
      console.error('Error awarding points', error);
      setError('Ошибка при начислении очков пользователю.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="code-execution-container">
        <div className="task-text">
          <h2>Task Description:</h2>
          <p>{taskText}</p>
        </div>

        {error && <ErrorMessage message={error} type="error" />} {/* Используем компонент ошибок */}

        <Editor
          height="400px"
          language="c"
          value={code}
          onChange={(value) => setCode(value)}
          className="code-editor"
        />
        <button onClick={handleSubmit} className="run-button">Run</button>
        <div className="test-results">
          <h2>Test Results:</h2>
          {results.map((result, index) => (
            <div key={index} className={`test-result ${result.correct ? 'passed' : 'failed'}`}>
              <h3>Test {index + 1}: {result.correct ? 'Passed' : 'Failed'}</h3>
              <p><strong>Input:</strong> {result.input}</p>
              <p><strong>Expected Output:</strong> {result.expectedOutput}</p>
              <p><strong>Actual Output:</strong> {result.output}</p>
              {result.correct ? (
                <p className="test-passed">✓ Test passed successfully</p>
              ) : (
                <div className="test-failed">
                  <p className="error-message">✗ Expected: {result.expectedOutput} but got: {result.output}</p>
                  <button className="stack-trace-button">Stack Trace</button>
                </div>
              )}
              <p className="test-timing">Completed in 25ms</p>
            </div>
          ))}
        </div>
        {status && <p className="status-message">{status}</p>}
      </div>

      {isModalOpen && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <h2>Задача уже решена</h2>
            <p>Вы уже успешно решили эту задачу. Дополнительное выполнение не требуется.</p>
            <button onClick={closeModal} className="modal-close-button">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExecution;
