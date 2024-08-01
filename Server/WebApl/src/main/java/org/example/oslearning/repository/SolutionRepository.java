package org.example.oslearning.repository;

import org.example.oslearning.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolutionRepository extends JpaRepository<Solution, Long> {
    // Additional query methods if needed
}