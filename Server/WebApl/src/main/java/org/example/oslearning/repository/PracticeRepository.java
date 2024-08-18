package org.example.oslearning.repository;

import org.example.oslearning.model.Practice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PracticeRepository extends JpaRepository<Practice, Long> {
    List<Practice> findByLessonId(Long lessonId);
}