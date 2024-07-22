package org.example.oslearning.service;

import org.example.oslearning.model.Answer;
import org.example.oslearning.model.Question;

import java.util.List;

public interface QuestionService {
    List<Question> getAllQuestionToLesson(int lessonId);
    void deleteQuestion(Long id);
    Question saveQuestion(Question question);
    Question findById(Long id);
    Answer saveAnswer(Answer answer);
}
