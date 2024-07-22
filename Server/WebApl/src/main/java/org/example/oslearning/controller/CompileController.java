package org.example.oslearning.controller;

import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

import java.io.IOException;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CompileController extends TextWebSocketHandler {

    private static final String JDoodle_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    @PostConstruct
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }

    @PostMapping("/compile")
    public ResponseEntity<String> compileCode(@RequestBody String code) {
        System.out.println("We got request");
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> request = new HashMap<>();
        request.put("script", code);
        request.put("language", "c");
        request.put("versionIndex", "0");
        request.put("clientId", CLIENT_ID);
        request.put("clientSecret", CLIENT_SECRET);

        ResponseEntity<String> response = restTemplate.postForEntity(JDoodle_URL, request, String.class);

        String output = response.getBody();

        String validationMessage = validateOutput(code, output);

        return ResponseEntity.ok(validationMessage);
    }

    @PostMapping("/startTerminal")
    public ResponseEntity<Map<String, String>> startTerminal() {
        Map<String, String> response = new HashMap<>();
        response.put("terminalUrl", "ws://localhost:8080/terminal");
        return ResponseEntity.ok(response);
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Path tempDir = Files.createTempDirectory("mytempdir");
        session.sendMessage(new TextMessage("cd " + tempDir.toString() + "\n"));
        session.sendMessage(new TextMessage("vim\n"));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        session.sendMessage(new TextMessage("Received: " + message.getPayload()));
    }

    private String validateOutput(String code, String output) {
        boolean test1 = runTest1(code);
        boolean test2 = runTest2(code);

        if (test1 && test2) {
            System.out.println("Программа успешно прошла все тесты.");
            return "Программа успешно прошла все тесты.";
        } else {
            System.out.println("Программа не прошла все тесты.");
            return "Программа не прошла все тесты.";
        }
    }

    private boolean runTest1(String code) {
        String testCode = code + "\n" + generateReadCode();
        String result = compileAndRun(testCode);
        return result.contains("Expected output from read operation");
    }

    private boolean runTest2(String code) {
        // Тест 2: Проверка записи и чтения с другим набором данных
        String altTestCode = code.replace("123", "456").replace("Test Name", "Another Name") + "\n" + generateAltReadCode();
        String result = compileAndRun(altTestCode);
        return result.contains("Expected output from alt read operation");
    }

    private String compileAndRun(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> request = new HashMap<>();
        request.put("script", code);
        request.put("language", "c");
        request.put("versionIndex", "0");
        request.put("clientId", CLIENT_ID);
        request.put("clientSecret", CLIENT_SECRET);

        ResponseEntity<String> response = restTemplate.postForEntity(JDoodle_URL, request, String.class);
        return response.getBody();
    }

    private String generateReadCode() {
        return "#include <stdio.h>\n" +
                "#include <stdlib.h>\n" +
                "#include <string.h>\n" +
                "typedef struct {\n" +
                "    int id;\n" +
                "    char name[50];\n" +
                "} Record;\n" +
                "int main() {\n" +
                "    FILE *file = fopen(\"output.dat\", \"rb\");\n" +
                "    if (!file) {\n" +
                "        perror(\"Ошибка открытия файла\");\n" +
                "        return 1;\n" +
                "    }\n" +
                "    Record record;\n" +
                "    fread(&record, sizeof(Record), 1, file);\n" +
                "    fclose(file);\n" +
                "    if (record.id == 123 && strcmp(record.name, \"Test Name\") == 0) {\n" +
                "        printf(\"Expected output from read operation\\n\");\n" +
                "    } else {\n" +
                "        printf(\"Unexpected output from read operation\\n\");\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n";
    }

    private String generateAltReadCode() {
        return "#include <stdio.h>\n" +
                "#include <stdlib.h>\n" +
                "#include <string.h>\n" +
                "typedef struct {\n" +
                "    int id;\n" +
                "    char name[50];\n" +
                "} Record;\n" +
                "int main() {\n" +
                "    FILE *file = fopen(\"output.dat\", \"rb\");\n" +
                "    if (!file) {\n" +
                "        perror(\"Ошибка открытия файла\");\n" +
                "        return 1;\n" +
                "    }\n" +
                "    Record record;\n" +
                "    fread(&record, sizeof(Record), 1, file);\n" +
                "    fclose(file);\n" +
                "    if (record.id == 456 && strcmp(record.name, \"Another Name\") == 0) {\n" +
                "        printf(\"Expected output from alt read operation\\n\");\n" +
                "    } else {\n" +
                "        printf(\"Unexpected output from alt read operation\\n\");\n" +
                "    }\n" +
                "    return 0;\n" +
                "}\n";
    }
}
