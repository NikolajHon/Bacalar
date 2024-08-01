package org.example.oslearning.service.impl;

import org.example.oslearning.model.Solution;
import org.example.oslearning.repository.SolutionRepository;
import org.example.oslearning.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class SolutionServiceImpl implements SolutionService {
    @Autowired
    private SolutionRepository solutionRepository;

    public List<Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }

    public Solution getSolutionById(Long id) {
        return solutionRepository.findById(id).orElse(null);
    }

    public Solution createSolution(Solution solution) {
        return solutionRepository.save(solution);
    }

    public void deleteSolution(Long id) {
        solutionRepository.deleteById(id);
    }
}
