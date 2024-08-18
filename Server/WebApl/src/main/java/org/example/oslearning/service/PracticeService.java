package org.example.oslearning.service;

import org.example.oslearning.model.Practice;

import java.util.List;
import java.util.Optional;

public interface PracticeService {
    public List<Practice> getAllPractices();

    public Optional<Practice> getPracticeById(Long id);

    public List<Practice> getPracticesByLessonId(Long lessonId);

    public Practice savePractice(Practice practice);

    public void deletePractice(Long id);
}
