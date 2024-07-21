import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Подключите стили для react-resizable
import '../../styles/CodeEditor.css'; // Подключите ваш файл стилей

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
            setOutput(result); // Устанавливаем полный результат в output
        } catch (error) {
            setOutput('Error running code: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className="code-editor-container">
            <h2>Задание:</h2>
            <p>Напишите программу на языке C, которая пытается открыть файл с именем "testfile.txt" и выводит сообщение об ошибке, если файл не может быть открыт. Используйте функции errno и perror для обработки ошибок.</p>
            <p>Пример кода:</p>
            <pre>{`#include <stdio.h>
#include <errno.h>

int main() {
    FILE *file;

    // Попытка открыть файл
    file = fopen("testfile.txt", "r");
    if (file == NULL) {
        // Обработка ошибки открытия файла
        perror("Ошибка открытия файла");
        return 1;
    }

    // Закрытие файла, если он был успешно открыт
    fclose(file);
    printf("Файл успешно открыт и закрыт.\\n");
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
                <pre>{output}</pre> {/* Отображение полного результата */}
            </div>
        </div>
    );
};

export default CodeEditor;
