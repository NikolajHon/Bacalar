package org.example.oslearning.service;

import org.example.oslearning.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestionsByLessonId(Long lessonId);
    void deleteQuestion(Long id);
    Question saveQuestion(Question question);
    Question findById(Long id);
    List<Question> saveQuestions(List<Question> questions);
    void deleteData();
}
