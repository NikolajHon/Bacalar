package org.example.oslearning.controller;

import org.example.oslearning.model.Solution;
import org.example.oslearning.model.SolutionRequest;
import org.example.oslearning.model.Task;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.SolutionRepository;
import org.example.oslearning.repository.TaskRepository;
import org.example.oslearning.repository.UserRepository;
import org.example.oslearning.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/solutions")
public class SolutionController {

    @Autowired
    private SolutionService solutionService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private SolutionRepository solutionRepository;

    @GetMapping
    public ResponseEntity<List<Solution>> getAllSolutions() {
        List<Solution> solutions = solutionService.getAllSolutions();
        return ResponseEntity.ok(solutions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Solution> getSolutionById(@PathVariable Long id) {
        Solution solution = solutionService.getSolutionById(id);
        if (solution == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(solution);
    }
    @GetMapping("/user/{userId}/lesson/{task_id}")
    public ResponseEntity<List<Solution>> getSolutionsByUserAndLesson(@PathVariable Long userId, @PathVariable Long task_id) {
        List<Solution> solutions = solutionRepository.findSolutionsByUserIdAndTaskLessonId(userId, task_id);
        if (solutions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(solutions);
    }

    @PostMapping
    public ResponseEntity<Solution> createOrUpdateSolution(@RequestBody SolutionRequest solutionRequest) {
        Task task = taskRepository.findById(solutionRequest.getTaskId())
                .orElseThrow(() -> new IllegalArgumentException("Задача не найдена"));
        User user = userRepository.findById(solutionRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("Пользователь не найден"));

        Optional<Solution> existingSolution = solutionRepository.findByTaskIdAndUserId(task.getId(), user.getId());

        Solution solution;
        if (existingSolution.isPresent()) {
            solution = existingSolution.get();
            solution.setContent(solutionRequest.getContent());
            solution.setGrade(solutionRequest.getGrade()); // Устанавливаем grade
            solution.setCreationTime(LocalDateTime.now());
        } else {
            solution = new Solution();
            solution.setContent(solutionRequest.getContent());
            solution.setCreationTime(LocalDateTime.now());
            solution.setTask(task);
            solution.setUser(user);
            solution.setGrade(solutionRequest.getGrade()); // Устанавливаем grade
        }

        Solution savedSolution = solutionService.createSolution(solution);
        return ResponseEntity.ok(savedSolution);
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolution(@PathVariable Long id) {
        Solution solution = solutionService.getSolutionById(id);
        if (solution == null) {
            return ResponseEntity.notFound().build();
        }
        solutionService.deleteSolution(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/grade")
    public ResponseEntity<Solution> updateSolutionGrade(@PathVariable Long id, @RequestBody int grade) {
        Solution solution = solutionService.getSolutionById(id);
        if (solution == null) {
            return ResponseEntity.notFound().build();
        }
        solution.setGrade(grade);
        Solution updatedSolution = solutionService.createSolution(solution); // Здесь происходит сохранение обновленного решения
        return ResponseEntity.ok(updatedSolution);
    }


}
