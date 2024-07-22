package org.example.oslearning.controller;

import lombok.RequiredArgsConstructor;
import org.example.oslearning.model.Answer;
import org.example.oslearning.model.Question;
import org.example.oslearning.service.QuestionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/question")
@RequiredArgsConstructor
public class QuestionsController {

    private final QuestionService questionService;

    @GetMapping("/lesson/{lessonId}")
    public List<Question> getAllQuestionToLesson(@PathVariable int lessonId) {
        return questionService.getAllQuestionToLesson(lessonId);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }

    @PostMapping
    public Question saveQuestion(@RequestBody Question question) {
        return questionService.saveQuestion(question);
    }

    @PostMapping("/{questionId}/answer")
    public Answer saveAnswer(@PathVariable Long questionId, @RequestBody Answer answer) {
        Question question = questionService.findById(questionId);
        answer.setQuestion(question);
        return questionService.saveAnswer(answer);
    }
}
