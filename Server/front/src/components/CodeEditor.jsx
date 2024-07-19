import React, { useState } from 'react';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import '../styles/CodeEditor.css'

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
            setOutput(response.data.output); // Установка только значения output
        } catch (error) {
            setOutput('Error running code: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div>
            <AceEditor
                mode="c_cpp"
                theme="github"
                onChange={(newValue) => setCode(newValue)}
                name="C_CODE_EDITOR"
                editorProps={{ $blockScrolling: true }}
                value={code}
                width="100%"
                height="200px"
            />
            <button onClick={handleRun}>Run Code</button>
            <div className="output-window">
                <pre>{output}</pre> {/* Отображение только output */}
            </div>
        </div>
    );
};

export default CodeEditor;
