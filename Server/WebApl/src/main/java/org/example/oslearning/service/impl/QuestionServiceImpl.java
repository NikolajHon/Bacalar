package org.example.oslearning.service.impl;

import org.example.oslearning.model.Question;
import org.example.oslearning.repository.QuestionRepository;
import org.example.oslearning.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestionsByLessonId(Long lessonId) {
        return questionRepository.findByLessonId(lessonId);
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public Question findById(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        return optionalQuestion.orElse(null);
    }
    @Override
    public List<Question> saveQuestions(List<Question> questions) {
        return questionRepository.saveAll(questions);
    }
    @Override
    public void deleteData(){
        questionRepository.deleteAll();
    }
}
