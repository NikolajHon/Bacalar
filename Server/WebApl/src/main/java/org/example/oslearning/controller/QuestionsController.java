package org.example.oslearning.controller;

import lombok.RequiredArgsConstructor;
import org.example.oslearning.model.Answer;
import org.example.oslearning.model.Question;
import org.example.oslearning.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionsController {
@Autowired
    private  QuestionService questionService;

    @GetMapping("/lesson/{lessonId}")
    public List<Question> getAllQuestionToLesson(@PathVariable int lessonId) {
        return questionService.getAllQuestionToLesson(lessonId);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }

    @PostMapping
    public Question saveQuestion(@RequestBody QuestionRequest questionRequest) {
        Question question = new Question();
        question.setText(questionRequest.getText());
        question.setLessonId(questionRequest.getLessonId());
        question.setType(questionRequest.getType());
        question.setVariants(questionRequest.getVariants());

        Question savedQuestion = questionService.saveQuestion(question);

        if (questionRequest.getAnswer() != null) {
            Answer answer = new Answer();
            answer.setText(questionRequest.getAnswer().getText());
            answer.setQuestion(savedQuestion);
            questionService.saveAnswer(answer);
        }

        return savedQuestion;
    }

    @PostMapping("/{questionId}/answer")
    public Answer saveAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        Question question = questionService.findById(questionId);
        answer.setQuestion(question);
        return questionService.saveAnswer(answer);
    }
}
