package org.example.oslearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/compile")
public class CompileController {

    private static final String JDoodle_URL = "https://api.jdoodle.com/v1/execute";
    private static final String CLIENT_ID = "f5a875bea9d3261f9594ea8552e792cc";
    private static final String CLIENT_SECRET = "5f496f47f4d98f0451f7d3eec7311b8eaa24c5d35bb3face94eb40fc8e0e7958";

    @PostMapping
    public ResponseEntity<Map<String, Object>> compileCode(@RequestBody String code) {
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Create a temporary directory
            Path tempDir = Files.createTempDirectory("compile");

            // Create a file named subor0
            Path subor0 = tempDir.resolve("subor0");
            Files.createFile(subor0);

            // Create a temporary file for the source code
            Path sourceFilePath = Files.createTempFile(tempDir, "code", ".c");
            String outputFileName = tempDir.resolve(UUID.randomUUID().toString()).toString();

            // Save the code to the temporary file
            BufferedWriter writer = new BufferedWriter(new FileWriter(sourceFilePath.toFile()));
            writer.write(code);
            writer.close();

            // Compile the code
            ProcessBuilder compileBuilder = new ProcessBuilder("gcc", sourceFilePath.toString(), "-o", outputFileName);
            compileBuilder.directory(tempDir.toFile());
            Process compileProcess = compileBuilder.start();
            boolean compileCompleted = compileProcess.waitFor(10, TimeUnit.SECONDS);

            if (!compileCompleted) {
                return ResponseEntity.status(500).body(Map.of("error", "Compilation timed out"));
            }

            int compileExitCode = compileProcess.exitValue();
            if (compileExitCode != 0) {
                String error = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream())).lines().reduce("", String::concat);
                return ResponseEntity.status(500).body(Map.of("error", "Compilation failed:\n" + error));
            }

            // Run the compiled code
            ProcessBuilder runBuilder = new ProcessBuilder(outputFileName);
            runBuilder.directory(tempDir.toFile());
            Process runProcess = runBuilder.start();
            boolean runCompleted = runProcess.waitFor(10, TimeUnit.SECONDS);

            if (!runCompleted) {
                return ResponseEntity.status(500).body(Map.of("error", "Execution timed out"));
            }

            String output = new BufferedReader(new InputStreamReader(runProcess.getInputStream())).lines().reduce("", String::concat);
            String errorOutput = new BufferedReader(new InputStreamReader(runProcess.getErrorStream())).lines().reduce("", String::concat);

            Map<String, Object> response = new HashMap<>();
            response.put("output", output);
            response.put("error", errorOutput);

            return ResponseEntity.ok(response);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "An error occurred:\n" + e.getMessage()));
        }
    }
}
