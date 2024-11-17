package org.example.oslearning;

import org.example.oslearning.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication

public class OsLearningApplication {
    public static void main(String[] args) {
        SpringApplication.run(OsLearningApplication.class, args);
    }
}
