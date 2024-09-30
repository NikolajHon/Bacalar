import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import 'react-resizable/css/styles.css';
import '../../../styles/CodeEditor.css';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const terminalRef = useRef(null);
    const terminal = useRef(null);
    const fitAddon = useRef(new FitAddon());

    useEffect(() => {
        if (terminalRef.current) {
            terminal.current = new Terminal();
            terminal.current.loadAddon(fitAddon.current);
            terminal.current.open(terminalRef.current);
            fitAddon.current.fit();

            axios.post('http://localhost:8080/api/startTerminal').then((response) => {
                const ws = new WebSocket(response.data.terminalUrl);
                ws.onopen = () => {
                    terminal.current.writeln('WebSocket connection established');
                };
                ws.onmessage = (event) => {
                    terminal.current.write(event.data);
                };

                terminal.current.onData((data) => {
                    ws.send(data);
                });
            });

            return () => {
                terminal.current.dispose();
            };
        }
    }, []);

    const handleRun = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/compile', code, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            const result = response.data;
            setOutput(result);
        } catch (error) {
            setOutput('Error running code: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className="code-editor-container">
            <h2>Задание:</h2>
            <p>Напишите программу на языке C, которая сохраняет содержимое структурированной переменной в файл с помощью функции write() и затем считывает их с помощью read().</p>

            <pre>{`#include <stdio.h>
#include <stdlib.h>
#include <string.h>
typedef struct {
    int id;
    char name[50];
} Record;

int main() {
    Record record = {123, "Test Name"};
    FILE *file = fopen("output.dat", "wb");
    if (!file) {
        perror("Ошибка открытия файла");
        return 1;
    }
    fwrite(&record, sizeof(Record), 1, file);
    fclose(file);
    return 0;
}`}</pre>

            <ResizableBox
                width={600}
                height={400}
                minConstraints={[300, 200]}
                maxConstraints={[800, 600]}
                resizeHandles={['se']}
                className="resizable-editor"
            >
                <MonacoEditor
                    height="100%"
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
            </ResizableBox>
            <button onClick={handleRun}>Run Code</button>
            <div className="output-window">
                <pre>{output}</pre>
            </div>
            <div ref={terminalRef} className="terminal-container"></div>
        </div>
    );
};

export default CodeEditor;
