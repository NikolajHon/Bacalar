package org.example.oslearning.controller;

import org.example.oslearning.model.TestCase;
import org.example.oslearning.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/testcases")
public class TestCaseController {

    @Autowired
    private TestCaseService testCaseService;

    @GetMapping
    public List<TestCase> getAllTestCases() {
        return testCaseService.getAllTestCases();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestCase> getTestCaseById(@PathVariable Long id) {
        Optional<TestCase> testCase = testCaseService.getTestCaseById(id);
        return testCase.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/practice/{practiceId}")
    public ResponseEntity<TestCase> createTestCase(@PathVariable Long practiceId, @RequestBody TestCase testCase) {
        Optional<TestCase> createdTestCase = testCaseService.getTestCaseById(practiceId);
        if (createdTestCase.isPresent()) {
            testCase.setPractice(createdTestCase.get().getPractice());
            TestCase savedTestCase = testCaseService.saveTestCase(testCase);
            return ResponseEntity.ok(savedTestCase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestCase> updateTestCase(@PathVariable Long id, @RequestBody TestCase testCaseDetails) {
        Optional<TestCase> optionalTestCase = testCaseService.getTestCaseById(id);
        if (optionalTestCase.isPresent()) {
            TestCase testCase = optionalTestCase.get();
            testCase.setInputData(testCaseDetails.getInputData());
            testCase.setExpectedOutput(testCaseDetails.getExpectedOutput());
            return ResponseEntity.ok(testCaseService.saveTestCase(testCase));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestCase(@PathVariable Long id) {
        testCaseService.deleteTestCase(id);
        return ResponseEntity.ok().build();
    }
}
