import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CodeExecution from '../components/CodeExecution'; // Предполагается, что этот компонент уже существует
import { useParams } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { UserContext } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/PracticesList.css';

const PracticesList = () => {
  const { lessonId } = useParams(); // Получаем lessonId из параметров маршрута
  const [practices, setPractices] = useState([]);
  const { user } = useContext(UserContext); // Получаем информацию о пользователе из контекста
  const [showCreateForm, setShowCreateForm] = useState(false); // Состояние для отображения формы создания
  const [newPracticeName, setNewPracticeName] = useState(''); // Состояние для названия нового задания
  const [newPracticeDescription, setNewPracticeDescription] = useState(''); // Состояние для описания нового задания
  const [newPracticeDifficulty, setNewPracticeDifficulty] = useState(''); // Состояние для сложности нового задания
  const [methodSignature, setMethodSignature] = useState(''); // Состояние для сигнатуры метода
  const [mainTemplate, setMainTemplate] = useState(''); // Состояние для шаблона main
  const [testCases, setTestCases] = useState([{ inputData: '', expectedOutput: '', outputType: 'string' }]); // Состояние для тест-кейсов

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/practices/lesson/${lessonId}`);
        console.log('Received JSON:', response.data); // Логируем полученные данные
        setPractices(response.data);
      } catch (error) {
        console.error('Error fetching practices', error);
      }
    };

    fetchPractices();
  }, [lessonId]);

  const handleCreatePractice = async () => {
    try {
      // Формируем запрос с практикой, сигнатурой метода, шаблоном main и тест-кейсами
      const response = await axios.post(`http://localhost:8080/api/practices/with-testcases`, {
        description: newPracticeDescription,
        difficulty: newPracticeDifficulty,
        lessonId: lessonId,
        methodSignature: methodSignature,  // Добавляем сигнатуру метода в запрос
        mainTemplate: mainTemplate,        // Добавляем шаблон main
        testCases: testCases,              // Добавляем тест-кейсы с типом вывода
      });

      setPractices([...practices, response.data]); // Добавляем новое задание в список
      setNewPracticeName(''); // Очищаем поля ввода
      setNewPracticeDescription('');
      setNewPracticeDifficulty('');
      setMethodSignature(''); // Очищаем поле сигнатуры метода
      setMainTemplate('');    // Очищаем поле шаблона main
      setTestCases([{ inputData: '', expectedOutput: '', outputType: 'string' }]); // Сбрасываем тест-кейсы
      setShowCreateForm(false); // Закрываем форму
    } catch (error) {
      console.error('Error creating new practice', error);
    }
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index][field] = value;
    setTestCases(updatedTestCases);
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
    <div className="practices-list-container">
      <AppBar />
      <h1>Questions for Lesson {lessonId}</h1>
      {user.role === 'ROLE_TEACHER' ? (
        <div>
          <button className="create-practice-button" onClick={() => setShowCreateForm(true)}>ADD NEW PRACTISE</button>
          {showCreateForm && (
            <div className="modal-new-practise">
              <h2>ADD NEW PRACTISE</h2>
              <input
                type="text"
                className="modal-input"
                value={newPracticeName}
                onChange={(e) => setNewPracticeName(e.target.value)}
                placeholder="Заголовок"
              />
              <textarea
                className="modal-input"
                value={newPracticeDescription}
                onChange={(e) => setNewPracticeDescription(e.target.value)}
                placeholder="Описание"
              />
              <select
                className="modal-input"
                value={newPracticeDifficulty}
                onChange={(e) => setNewPracticeDifficulty(e.target.value)}
              >
                <option value="">Сложность</option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>

              <input
                type="text"
                className="modal-input"
                value={methodSignature}
                onChange={(e) => setMethodSignature(e.target.value)}
                placeholder="Сигнатура метода, например int add(int a, int b)"
              />

              <textarea
                className="modal-input"
                value={mainTemplate}
                onChange={(e) => setMainTemplate(e.target.value)}
                placeholder="Шаблон main"
              />

              <h3>TASTE CASES</h3>
              {testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                  <input
                    type="text"
                    className="modal-input small-input"
                    value={testCase.inputData}
                    onChange={(e) => handleTestCaseChange(index, 'inputData', e.target.value)}
                    placeholder="Входные данные"
                  />
                  <input
                    type="text"
                    className="modal-input small-input"
                    value={testCase.expectedOutput}
                    onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                    placeholder="Ожидаемый результат"
                  />
                  <select
                    className="modal-input select-input"
                    value={testCase.outputType}
                    onChange={(e) => handleTestCaseChange(index, 'outputType', e.target.value)}
                  >
                    <option value="string">Строка</option>
                    <option value="number">Число</option>
                    <option value="json">JSON</option>
                  </select>
                  <button className="remove-button" onClick={() => removeTestCase(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              <button className="add-testcase-button" onClick={addTestCase}>Добавить тест-кейс</button>

              <button className="save-button" onClick={handleCreatePractice}>Создать задание</button>
              <button className="cancel-button" onClick={() => setShowCreateForm(false)}>Отмена</button>
            </div>
          )}
          <ul>
            {practices.map(practice => (
              <li key={practice.id}>
                <h2>{practice.name}</h2>
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
  );
};

export default PracticesList;
