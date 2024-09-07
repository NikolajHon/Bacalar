package org.example.oslearning.service;

import org.example.oslearning.model.Solution;

import java.util.List;

public interface SolutionService {
    List<Solution> getAllSolutions();

    Solution getSolutionById(Long id);

    Solution createSolution(Solution solution);

    void deleteSolution(Long id);
}
