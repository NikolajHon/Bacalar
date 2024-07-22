package org.example.oslearning.repository;

import org.example.oslearning.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> getAllQuestionToLesson(int lessonId);
}