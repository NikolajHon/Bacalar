import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import '../styles/CodeEditor.css'; // Подключите ваш файл стилей

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const handleRun = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/compile', code, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const result = response.data;
            if (result.error) {
                setOutput(`Error: ${result.error}`);
            } else {
                setOutput(`Output: ${result.output}\nErrors: ${result.error}`);
            }
        } catch (error) {
            setOutput('Error running code: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    return (
        <div>
            <MonacoEditor
                height="200px"
                language="cpp"
                theme="vs-dark"
                value={code}
                onChange={(newValue) => setCode(newValue)}
                options={{
                    selectOnLineNumbers: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    fontSize: 14,
                    minimap: { enabled: false },
                }}
            />
            <button onClick={handleRun}>Run Code</button>
            <div className="output-window">
                <pre>{output}</pre> {/* Отображение только output */}
            </div>
        </div>
    );
};

export default CodeEditor;
