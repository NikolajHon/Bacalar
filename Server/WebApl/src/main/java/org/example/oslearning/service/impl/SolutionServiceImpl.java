package org.example.oslearning.service.impl;

import org.example.oslearning.model.Solution;
import org.example.oslearning.repository.SolutionRepository;
import org.example.oslearning.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SolutionServiceImpl implements SolutionService {

    @Autowired
    private SolutionRepository solutionRepository;

    @Override
    public List<Solution> getAllSolutions() {
        return solutionRepository.findAll();
    }

    @Override
    public Solution getSolutionById(Long id) {
        Optional<Solution> solution = solutionRepository.findById(id);
        return solution.orElse(null);
    }

    @Override
    public Solution createSolution(Solution solution) {
        return solutionRepository.save(solution);
    }

    @Override
    public void deleteSolution(Long id) {
        solutionRepository.deleteById(id);
    }
}
