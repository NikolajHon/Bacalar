package org.example.oslearning.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/compile")
public class CompileController {

    @PostMapping
    public ResponseEntity<String> compileCode(@RequestBody String code) {
        try {
            // Create a temporary directory
            Path tempDir = Files.createTempDirectory("compile");

            // Create a temporary file for the source code
            Path sourceFilePath = Files.createTempFile(tempDir, "code", ".c");
            String outputFileName = tempDir.resolve(UUID.randomUUID().toString()).toString();

            // Save the code to the temporary file
            BufferedWriter writer = new BufferedWriter(new FileWriter(sourceFilePath.toFile()));
            writer.write(code);
            writer.close();

            // Compile the code
            ProcessBuilder compileBuilder = new ProcessBuilder("gcc", sourceFilePath.toString(), "-o", outputFileName);
            Process compileProcess = compileBuilder.start();
            boolean compileCompleted = compileProcess.waitFor(10, TimeUnit.SECONDS);

            if (!compileCompleted) {
                return ResponseEntity.status(500).body("Compilation timed out");
            }

            int compileExitCode = compileProcess.exitValue();
            if (compileExitCode != 0) {
                String error = new BufferedReader(new InputStreamReader(compileProcess.getErrorStream())).lines().reduce("", String::concat);
                return ResponseEntity.status(500).body("Compilation failed:\n" + error);
            }

            // Run the compiled code
            ProcessBuilder runBuilder = new ProcessBuilder(outputFileName);
            Process runProcess = runBuilder.start();
            boolean runCompleted = runProcess.waitFor(10, TimeUnit.SECONDS);

            if (!runCompleted) {
                return ResponseEntity.status(500).body("Execution timed out");
            }

            String output = new BufferedReader(new InputStreamReader(runProcess.getInputStream())).lines().reduce("", String::concat);
            return ResponseEntity.ok(output);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred:\n" + e.getMessage());
        }
    }
}
