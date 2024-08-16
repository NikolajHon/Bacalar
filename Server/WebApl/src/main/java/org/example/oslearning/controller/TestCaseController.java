package org.example.oslearning.controller;

import org.example.oslearning.model.TestCase;
import org.example.oslearning.service.TestCaseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestCaseController {

    private final TestCaseService testCaseService;

    public TestCaseController(TestCaseService testCaseService) {
        this.testCaseService = testCaseService;
    }

    @GetMapping("/testCases")
    public List<TestCase> getTestCases() {
        return testCaseService.getTestCases();
    }
}
