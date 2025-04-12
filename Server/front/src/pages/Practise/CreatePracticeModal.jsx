import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import {
    Form,
    Input,
    Radio,
    Button,
    Select,
    Typography
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import styles from '../../styles/PracticesList.module.css';

const { TextArea } = Input;
const { Title } = Typography;

export default function CreatePracticeModal(props) {
    const {
        onClose,
        onCreate,
        newPracticeName, setNewPracticeName,
        newPracticeDescription, setNewPracticeDescription,
        newPracticeDifficulty, setNewPracticeDifficulty,
        methodSignature, setMethodSignature,
        mainTemplate, setMainTemplate,
        testCases, setTestCases
    } = props;

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
        <div className={styles.modalNewPractice}>
            <Title level={3}>Vytvoriť novú úlohu</Title>

            <Form
                layout="vertical"
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Názov praxe">
                    <Input
                        value={newPracticeName}
                        onChange={(e) => setNewPracticeName(e.target.value)}
                        placeholder="Názov praxe"
                    />
                </Form.Item>

                <Form.Item label="Popis">
                    <TextArea
                        rows={3}
                        value={newPracticeDescription}
                        onChange={(e) => setNewPracticeDescription(e.target.value)}
                        placeholder="Popis"
                    />
                </Form.Item>

                <Form.Item label="Nadpis metódy">
                    <Input
                        value={methodSignature}
                        onChange={(e) => setMethodSignature(e.target.value)}
                        placeholder="Napríklad: int add(int a, int b)"
                    />
                </Form.Item>

                <Form.Item label="Zložitosť">
                    <Radio.Group
                        onChange={(e) => setNewPracticeDifficulty(e.target.value)}
                        value={newPracticeDifficulty}
                    >
                        <Radio.Button value="EASY">Ľahké</Radio.Button>
                        <Radio.Button value="MEDIUM">Priemerná</Radio.Button>
                        <Radio.Button value="HARD">Ťažké</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Hlavná časť kódu (šablóna)">
                    <TextArea
                        rows={4}
                        value={mainTemplate}
                        onChange={(e) => setMainTemplate(e.target.value)}
                        placeholder="Zdrojový kód - šablónu môžete vložiť sem"
                    />
                </Form.Item>

                <Form.Item label="Testovacie prípady">
                    {testCases.map((testCase, index) => (
                        <div key={index} className={styles.testCase} style={{ marginBottom: '1rem' }}>

                            <Input
                                className={styles.smallInput}
                                value={testCase.inputData}
                                onChange={(e) => handleTestCaseChange(index, 'inputData', e.target.value)}
                                placeholder="Vstupné údaje"
                                style={{ width: '25%', marginRight: 8 }}
                            />

                            <Input
                                className={styles.smallInput}
                                value={testCase.expectedOutput}
                                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                placeholder="Očakávaný výstup"
                                style={{ width: '25%', marginRight: 8 }}
                            />

                            <Select
                                style={{ width: '20%', marginRight: 8 }}
                                value={testCase.outputType}
                                onChange={(value) => handleTestCaseChange(index, 'outputType', value)}
                            >
                                <Select.Option value="string">String</Select.Option>
                                <Select.Option value="number">Císlo</Select.Option>
                                <Select.Option value="json">JSON</Select.Option>
                            </Select>

                            <Button
                                type="default"
                                danger
                                onClick={() => removeTestCase(index)}
                                icon={<FontAwesomeIcon icon={faTrash} />}
                            />
                        </div>
                    ))}

                    <Button
                        icon={<PlusOutlined />}
                        onClick={addTestCase}
                        style={{ marginTop: 8 }}
                    >
                        Pridanie testu
                    </Button>
                </Form.Item>

                <Form.Item style={{ marginTop: 24 }}>
                    <Button
                        type="primary"
                        onClick={onCreate}
                        style={{ marginRight: 8 }}
                    >
                        Uložiť
                    </Button>

                    <Button onClick={onClose}>Zrušenie</Button>
                </Form.Item>
            </Form>
        </div>
    );
}
