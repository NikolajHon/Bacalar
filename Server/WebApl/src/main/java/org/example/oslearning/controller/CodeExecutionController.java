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

        // Получаем объект Practice по practiceId
        Optional<Practice> practice = practiceService.getPracticeById(practiceId);
        if (!practice.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        String methodSignature = practice.get().getMethodSignature(); // Получаем сигнатуру метода из Practice
        List<TestCase> testCases = testCaseService.getTestCasesByPracticeId(practiceId);
        CodeResponse[] responses = new CodeResponse[testCases.size()];

        boolean allCorrect = true; // Флаг для отслеживания, прошли ли все тесты

        for (int i = 0; i < testCases.size(); i++) {
            TestCase testCase = testCases.get(i);

            String completeCode = generateCompleteCode(codeRequest.getCode(), testCase.getInputData(), methodSignature);
            System.out.println(completeCode);
            String actualOutput = executeCodeOnline(completeCode);

            boolean isCorrect = normalizeOutput(testCase.getExpectedOutput()).equals(normalizeOutput(actualOutput));
            if (!isCorrect) {
                allCorrect = false;
            }

            responses[i] = new CodeResponse(actualOutput, isCorrect, testCase.getInputData(), testCase.getExpectedOutput());
        }

        if (allCorrect) {
            practiceCompletionService.markPracticeAsCompleted(userId, practiceId);
        }

        // Логирование JSON-ответа перед его отправкой
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(responses);
            System.out.println("Response JSON:\n" + jsonResponse);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(responses);
    }


    private String generateCompleteCode(String userCode, String input, String methodSignature) {

        String methodName = extractMethodName(methodSignature);
        String[] parameterTypes = extractMethodParameters(methodSignature).split(", ");
        StringBuilder variableDeclarations = new StringBuilder();

        // Формируем строки объявлений переменных и форматов sscanf
        StringBuilder sscanfArgs = new StringBuilder();
        StringBuilder sscanfFormat = new StringBuilder();

        for (int i = 0; i < parameterTypes.length; i++) {
            String typeAndVar = parameterTypes[i];
            String[] parts = typeAndVar.split(" ");
            String type = parts[0];
            String varName = parts[1];

            // Формируем строку объявления переменной
            variableDeclarations.append(type).append(" ").append(varName).append(";\n");

            // Формируем строку формата для sscanf
            if (type.equals("int")) {
                sscanfFormat.append("%d");
            } else if (type.equals("float")) {
                sscanfFormat.append("%f");
            } // Добавьте другие типы по необходимости

            if (i < parameterTypes.length - 1) {
                sscanfFormat.append(",");
            }

            // Формируем строку аргументов для sscanf
            sscanfArgs.append("&").append(varName);
            if (i < parameterTypes.length - 1) {
                sscanfArgs.append(", ");
            }
        }

        return "#include <stdio.h>\n" +
                userCode + "\n" +
                "int main() {\n" +
                "    " + variableDeclarations + "\n" +
                "    sscanf(\"" + input + "\", \"" + sscanfFormat.toString() + "\", " + sscanfArgs.toString() + ");\n" +
                "    int result = " + methodName + "(" + sscanfArgs.toString().replace("&", "") + ");\n" +
                "    printf(\"%d\\n\", result);\n" +
                "    return 0;\n" +
                "}";
    }


    // Метод для извлечения имени метода из сигнатуры
    private String extractMethodName(String methodSignature) {
        // Например, methodSignature может быть "int findSum(int x, int y)"
        return methodSignature.substring(0, methodSignature.indexOf('(')).split(" ")[1];
    }

    // Метод для извлечения параметров метода из сигнатуры
    private String extractMethodParameters(String methodSignature) {
        // Например, methodSignature может быть "int findSum(int x, int y)"
        return methodSignature.substring(methodSignature.indexOf('(') + 1, methodSignature.indexOf(')'));
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
    private Long userId; // Добавляем поле userId
    private TestCase[] testCases;

    // Геттеры и сеттеры
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
