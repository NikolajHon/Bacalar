package org.example.oslearning.controller;

import org.example.oslearning.model.TestCase;
import org.example.oslearning.service.TestCaseService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CodeExecutionController {

    private static final String JDoodle_API_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    private final TestCaseService testCaseService;

    public CodeExecutionController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @PostMapping("/execute")
    public ResponseEntity<CodeResponse[]> executeCode(@RequestBody CodeRequest codeRequest) {
        List<TestCase> testCases = testCaseService.getTestCases();
        CodeResponse[] responses = new CodeResponse[testCases.size()];

        for (int i = 0; i < testCases.size(); i++) {
            TestCase testCase = testCases.get(i);
            String completeCode = generateCompleteCode(codeRequest.getCode(), testCase.getInput());
            String actualOutput = executeCodeOnline(completeCode);

            // Сравниваем нормализованные строки
            boolean isCorrect = normalizeOutput(testCase.getExpectedOutput()).equals(normalizeOutput(actualOutput));

            responses[i] = new CodeResponse(actualOutput, isCorrect, testCase.getInput(), testCase.getExpectedOutput());
        }

        // Логирование JSON-ответа перед его отправкой
        try {
            ObjectMapper objectMapper = new ObjectMapper(); // Создаем ObjectMapper для преобразования объектов в JSON
            String jsonResponse = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(responses);
            System.out.println("Response JSON:\n" + jsonResponse); // Логируем JSON-ответ
        } catch (Exception e) {
            e.printStackTrace(); // В случае ошибки логируем исключение
        }

        return ResponseEntity.ok(responses);
    }

    private String generateCompleteCode(String userCode, String input) {
        // Подключаем необходимые библиотеки и добавляем пользовательский код и main функцию
        return "#include <stdio.h>\n" +
                userCode + "\n" +
                "int main() {\n" +
                "    int a, b;\n" +
                "    sscanf(\"" + input + "\", \"%d %d\", &a, &b);\n" +
                "    int result = yourMethod(a, b);\n" +
                "    printf(\"%d\\n\", result);\n" +
                "    return 0;\n" +
                "}";
    }

    private String executeCodeOnline(String code) {
        RestTemplate restTemplate = new RestTemplate();

        // Формируем тело запроса
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("clientId", CLIENT_ID);
        requestBody.put("clientSecret", CLIENT_SECRET);
        requestBody.put("script", code);
        requestBody.put("language", "c");
        requestBody.put("versionIndex", "0");

        // Отправляем POST-запрос на API JDoodle
        ResponseEntity<Map> response = restTemplate.postForEntity(JDoodle_API_URL, requestBody, Map.class);

        // Получаем и возвращаем результат
        if (response.getBody() != null) {
            return normalizeOutput((String) response.getBody().get("output"));
        } else {
            return "Error: API did not return any output.";
        }
    }

    private String normalizeOutput(String output) {
        return output.trim().replaceAll("\\r\\n", "\n").replaceAll("\\s+$", "");
    }
}


class CodeRequest {
    private String code;
    private TestCase[] testCases;

    // Геттеры и сеттеры
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public TestCase[] getTestCases() {
        return testCases;
    }

    public void setTestCases(TestCase[] testCases) {
        this.testCases = testCases;
    }
}

class CodeResponse {
    private String output;
    private boolean isCorrect;
    private String input;
    private String expectedOutput;

    public CodeResponse(String output, boolean isCorrect, String input, String expectedOutput) {
        this.output = output;
        this.isCorrect = isCorrect;
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    // Геттеры и сеттеры
    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }
}
