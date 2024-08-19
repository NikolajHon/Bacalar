package org.example.oslearning.controller;

import org.example.oslearning.model.Practice;
import org.example.oslearning.model.TestCase;
import org.example.oslearning.model.User;
import org.example.oslearning.service.PracticeCompletionService;
import org.example.oslearning.service.PracticeService;
import org.example.oslearning.service.TestCaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/practices")
public class PracticeController {

    @Autowired
    private PracticeService practiceService;
    @Autowired
    private TestCaseService testCaseService;
    @Autowired
    private PracticeCompletionService practiceCompletionService;


    @GetMapping
    public List<Practice> getAllPractices() {
        return practiceService.getAllPractices();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Practice> getPracticeById(@PathVariable Long id) {
        Optional<Practice> practice = practiceService.getPracticeById(id);
        return practice.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Practice> getPracticesByLessonId(@PathVariable Long lessonId) {
        return practiceService.getPracticesByLessonId(lessonId);
    }

    @PostMapping
    public ResponseEntity<Practice> createPractice(@RequestBody Practice practice) {
        Practice createdPractice = practiceService.savePractice(practice);
        return ResponseEntity.ok(createdPractice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Practice> updatePractice(@PathVariable Long id, @RequestBody Practice practiceDetails) {
        Optional<Practice> optionalPractice = practiceService.getPracticeById(id);
        if (optionalPractice.isPresent()) {
            Practice practice = optionalPractice.get();
            practice.setDescription(practiceDetails.getDescription());
            practice.setDifficulty(practiceDetails.getDifficulty());
            practice.setLessonId(practiceDetails.getLessonId());
            return ResponseEntity.ok(practiceService.savePractice(practice));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePractice(@PathVariable Long id) {
        practiceService.deletePractice(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/{practiceId}/testcase")
    public ResponseEntity<TestCase> addTestCaseToPractice(@PathVariable Long practiceId, @RequestBody TestCase testCase) {
        Optional<Practice> optionalPractice = practiceService.getPracticeById(practiceId);
        if (optionalPractice.isPresent()) {
            Practice practice = optionalPractice.get();
            testCase.setPractice(practice);
            TestCase createdTestCase = testCaseService.saveTestCase(testCase);
            return ResponseEntity.ok(createdTestCase);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/{practiceId}/complete")
    public ResponseEntity<Void> markPracticeAsCompleted(@PathVariable Long practiceId, @RequestParam Long userId) {
        System.out.println(userId);
        Optional<Practice> optionalPractice = practiceService.getPracticeById(practiceId);
        if (optionalPractice.isPresent()) {
            Practice practice = optionalPractice.get();
            boolean isAlreadyCompleted = practiceCompletionService.isPracticeCompleted(userId, practiceId);
            if (isAlreadyCompleted) {
                return ResponseEntity.status(HttpStatus.CONFLICT).build(); // Уже выполнено
            }
            practiceCompletionService.markPracticeAsCompleted(userId, practiceId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/{practiceId}/isCompleted")
    public ResponseEntity<Boolean> isPracticeCompleted(@PathVariable Long practiceId, @RequestParam Long userId) {
        System.out.println(userId);
        boolean isCompleted = practiceCompletionService.isPracticeCompleted(userId, practiceId);
        return ResponseEntity.ok(isCompleted);
    }


}
