package org.example.oslearning.service;

import org.example.oslearning.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestionsByLessonId(Long lessonId);
    Question findById(Long id);
    void deleteQuestion(Long id);
    List<Question> saveQuestions(List<Question> questions);
    void deleteData();
}
