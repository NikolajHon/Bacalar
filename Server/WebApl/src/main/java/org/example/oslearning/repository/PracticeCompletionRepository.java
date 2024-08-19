package org.example.oslearning.repository;

import org.example.oslearning.model.PracticeCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PracticeCompletionRepository extends JpaRepository<PracticeCompletion, Long> {
    boolean existsByUserIdAndPracticeId(Long userId, Long practiceId);
}
