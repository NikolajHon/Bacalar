package org.example.oslearning.service;

import org.example.oslearning.model.Solution;

import java.util.List;

public interface SolutionService {
    public List<Solution> getAllSolutions();

    public Solution getSolutionById(Long id);

    public Solution createSolution(Solution solution);

    public void deleteSolution(Long id);
}
