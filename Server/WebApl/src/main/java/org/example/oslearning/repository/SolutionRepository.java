package org.example.oslearning.repository;

import org.example.oslearning.model.Solution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SolutionRepository extends JpaRepository<Solution, Long> {
    Optional<Solution> findByTaskIdAndUserId(Long taskId, Long userId);

    List<Solution> findSolutionsByUserIdAndTaskLessonId(Long userId, Long lessonId);
    List<Solution> findByGrade(int grade);
}