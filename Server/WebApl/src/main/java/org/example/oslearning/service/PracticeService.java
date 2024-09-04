package org.example.oslearning.service;

import org.example.oslearning.model.Practice;

import java.util.List;
import java.util.Optional;

public interface PracticeService {
    List<Practice> getAllPractices();

    Optional<Practice> getPracticeById(Long id);

    List<Practice> getPracticesByLessonId(Long lessonId);

    Practice savePractice(Practice practice);

    void deletePractice(Long id);
}
