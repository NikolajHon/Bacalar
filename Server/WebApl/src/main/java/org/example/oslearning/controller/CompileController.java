package org.example.oslearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/compile")
public class CompileController {

    private static final String JDoodle_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    @PostMapping()
    public ResponseEntity<String> compileCode(@RequestBody String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> request = new HashMap<>();
        request.put("script", code);
        request.put("language", "c");
        request.put("versionIndex", "0");
        request.put("clientId", CLIENT_ID);
        request.put("clientSecret", CLIENT_SECRET);

        ResponseEntity<String> response = restTemplate.postForEntity(JDoodle_URL, request, String.class);

        String output = response.getBody();

        // Валидация результата
        String validationMessage = validateOutput(output);

        return ResponseEntity.ok(validationMessage);
    }

    private String validateOutput(String output) {
        if (output.contains("Ошибка открытия файла")) {
            System.out.println("1");
            return "Программа успешно обработала ошибку открытия файла.";
        } else if (output.contains("Файл успешно открыт и закрыт.")) {
            System.out.println("2");
            return "Программа успешно открыла и закрыла файл.";
        } else {
            System.out.println("3");
            return "Программа не выполнила поставленную задачу.";
        }
    }
}
