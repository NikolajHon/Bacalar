import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import '../styles/CodeExecution.css'; // Подключаем файл с CSS стилями

const CodeExecution = () => {
  const [code, setCode] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/testCase');
        setTestCases(response.data);
      } catch (error) {
        console.error('Error fetching test cases', error);
      }
    };

    fetchTestCases();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/execute/1', {
        code,
      });

      const result = response.data;
      setResults(result);

      const allPassed = result.every(test => test.correct);
      if (allPassed) {
        setStatus('Success: Все тесты пройдены успешно!');
      } else {
        setStatus('Error: Не все тесты пройдены. Проверьте свой код.');
      }
    } catch (error) {
      console.error('There was an error executing the code!', error);
      setStatus('Error: Произошла ошибка при выполнении кода.');
    }
  };

  return (
    <div className="code-execution-container">
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
  );
};

export default CodeExecution;
