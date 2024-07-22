package org.example.oslearning.repository;

import org.example.oslearning.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT q FROM Question q WHERE q.lessonId = :lessonId")
    List<Question> getAllQuestionToLesson(@Param("lessonId") int lessonId);
}
