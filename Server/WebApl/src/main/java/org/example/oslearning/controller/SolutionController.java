package org.example.oslearning.controller;

import org.example.oslearning.model.Solution;
import org.example.oslearning.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solutions")
public class SolutionController {

    @Autowired
    private SolutionService solutionService;

    @GetMapping
    public List<Solution> getAllSolutions() {
        return solutionService.getAllSolutions();
    }

    @GetMapping("/{id}")
    public Solution getSolutionById(@PathVariable Long id) {
        return solutionService.getSolutionById(id);
    }

    @PostMapping
    public Solution createSolution(@RequestBody Solution solution) {
        return solutionService.createSolution(solution);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolution(@PathVariable Long id) {
        solutionService.deleteSolution(id);
        return ResponseEntity.ok().build();
    }
}
