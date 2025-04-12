package org.example.oslearning.controller;

import org.example.oslearning.model.Practice;
import org.example.oslearning.model.TestCase;
import org.example.oslearning.service.PracticeCompletionService;
import org.example.oslearning.service.PracticeService;
import org.example.oslearning.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CodeExecutionController {

    private static final String JDoodle_API_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    @Autowired
    private TestCaseService testCaseService;
    @Autowired
    private PracticeCompletionService practiceCompletionService;
    @Autowired
    private PracticeService practiceService;

    public CodeExecutionController(TestCaseService testCaseService, PracticeCompletionService practiceCompletionService) {
        this.testCaseService = testCaseService;
        this.practiceCompletionService = practiceCompletionService;
    }

    @PostMapping("/execute/{practiceId}")
    public ResponseEntity<CodeResponse[]> executeCode(@PathVariable Long practiceId, @RequestBody CodeRequest codeRequest) {
        Long userId = codeRequest.getUserId();

        // Получаем задание Practice по practiceId
        Optional<Practice> practice = practiceService.getPracticeById(practiceId);
        if (!practice.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Получаем шаблон mainTemplate из Practice
        String mainTemplate = practice.get().getMainTemplate();
        String methodSignature = practice.get().getMethodSignature();
        List<TestCase> testCases = testCaseService.getTestCasesByPracticeId(practiceId);
        CodeResponse[] responses = new CodeResponse[testCases.size()];

        boolean allCorrect = true;

        for (int i = 0; i < testCases.size(); i++) {
            TestCase testCase = testCases.get(i);

            String completeCode = generateCompleteCode(mainTemplate, codeRequest.getCode(), testCase.getInputData(), methodSignature);
            System.out.println(completeCode);
            String actualOutput = executeCodeOnline(completeCode);

            boolean isCorrect = compareOutputs(testCase, actualOutput);
            if (!isCorrect) {
                allCorrect = false;
            }

            responses[i] = new CodeResponse(actualOutput, isCorrect, testCase.getInputData(), testCase.getExpectedOutput());
        }

        if (allCorrect) {
            practiceCompletionService.markPracticeAsCompleted(userId, practiceId);
        }

        // Логируем JSON-ответ
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(responses);
            System.out.println("Response JSON:\n" + jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(responses);
    }

    private String generateCompleteCode(String mainTemplate, String userCode, String input, String methodSignature) {
        String methodName = extractMethodName(methodSignature);

        return mainTemplate.replace("{{userCode}}", userCode)
                .replace("{{input}}", input)
                .replace("{{methodName}}", methodName);
    }

    private boolean compareOutputs(TestCase testCase, String actualOutput) {
        String expectedOutput = testCase.getExpectedOutput();

        switch (testCase.getOutputType()) {  // Добавьте тип вывода в TestCase (например, "number", "string", "json")
            case "number":
                return compareNumericOutput(expectedOutput, actualOutput);
            case "json":
                return compareJsonOutput(expectedOutput, actualOutput);
            default:
                return normalizeOutput(expectedOutput).equals(normalizeOutput(actualOutput));
        }
    }

    // Сравнение числовых результатов
    private boolean compareNumericOutput(String expectedOutput, String actualOutput) {
        try {
            double expected = Double.parseDouble(normalizeOutput(expectedOutput));
            double actual = Double.parseDouble(normalizeOutput(actualOutput));
            return expected == actual;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Сравнение JSON-данных
    private boolean compareJsonOutput(String expectedOutput, String actualOutput) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            Object expected = objectMapper.readValue(normalizeOutput(expectedOutput), Object.class);
            Object actual = objectMapper.readValue(normalizeOutput(actualOutput), Object.class);
            return expected.equals(actual);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Извлекаем имя метода из сигнатуры метода
    private String extractMethodName(String methodSignature) {
        return methodSignature.substring(0, methodSignature.indexOf('(')).split(" ")[1];
    }

    // Выполнение кода с использованием API JDoodle
    private String executeCodeOnline(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("clientId", CLIENT_ID);
        requestBody.put("clientSecret", CLIENT_SECRET);
        requestBody.put("script", code);
        requestBody.put("language", "c");
        requestBody.put("versionIndex", "0");

        ResponseEntity<Map> response = restTemplate.postForEntity(JDoodle_API_URL, requestBody, Map.class);

        if (response.getBody() != null) {
            return normalizeOutput((String) response.getBody().get("output"));
        } else {
            return "Error: API did not return any output.";
        }
    }

    // Нормализация вывода
    private String normalizeOutput(String output) {
        return output.trim().replaceAll("\\r\\n", "\n").replaceAll("\\s+$", "");
    }
}

class CodeRequest {
    private String code;
    private Long userId;
    private TestCase[] testCases;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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
