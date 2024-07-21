package org.example.oslearning.controller;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class CompileControllerTest {

    private static final String JDoodle_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    @Test
    public void testCompileCode() {
        RestTemplate restTemplate = new RestTemplate();

        // Шаг 1: Проверка отсутствия файла
        String codeCheckFile = "#include <stdio.h>\n#include <errno.h>\n\nint main() {\n    FILE *file = fopen(\"subor0\", \"r\");\n    if (file == NULL) {\n        printf(\"File does not exist. errno: %d\\n\", errno);\n    } else {\n        printf(\"File exists. errno: %d\\n\", errno);\n        char ch;\n        while ((ch = fgetc(file)) != EOF) {\n            putchar(ch);\n        }\n        fclose(file);\n    }\n    return 0;\n}";

        Map<String, String> request = new HashMap<>();
        request.put("script", codeCheckFile);
        request.put("language", "c");
        request.put("versionIndex", "0");
        request.put("clientId", CLIENT_ID);
        request.put("clientSecret", CLIENT_SECRET);

        ResponseEntity<String> response = restTemplate.postForEntity(JDoodle_URL, request, String.class);
        String result = response.getBody();

        // Проверка на то, что файл не существует
        assertTrue(result.contains("File does not exist. errno: 2"), "Test failed: File should not exist initially.");

        // Шаг 2: Создание файла и повторная проверка
        String codeCreateAndCheckFile = "#include <stdio.h>\n#include <errno.h>\n\nint main() {\n    FILE *createFile = fopen(\"subor0\", \"w\");\n    if (createFile != NULL) {\n        fputs(\"Test content\", createFile);\n        fclose(createFile);\n    }\n\n    FILE *file = fopen(\"subor0\", \"r\");\n    if (file == NULL) {\n        printf(\"File does not exist. errno: %d\\n\", errno);\n    } else {\n        printf(\"File exists. errno: %d\\n\", errno);\n        char ch;\n        while ((ch = fgetc(file)) != EOF) {\n            putchar(ch);\n        }\n        fclose(file);\n    }\n    return 0;\n}";

        request.put("script", codeCreateAndCheckFile);

        response = restTemplate.postForEntity(JDoodle_URL, request, String.class);
        result = response.getBody();

        // Проверка на то, что файл существует
        assertTrue(result.contains("File exists. errno: 0"), "Test failed: File should exist after creation.");
    }
}
