package org.example.oslearning.controller;

import lombok.RequiredArgsConstructor;
import org.example.oslearning.model.Question;
import org.example.oslearning.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionsController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/lesson/{lessonId}")
    public List<Question> getAllQuestionsByLessonId(@PathVariable Long lessonId) {
        return questionService.getAllQuestionsByLessonId(lessonId);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }

    @PostMapping()
    public List<Question> saveQuestions(@RequestBody List<QuestionRequest> questionRequests) {
        List<Question> questions = questionRequests.stream()
                .map(request -> {
                    Question question = new Question();
                    question.setText(request.getText());
                    question.setLessonId(Long.valueOf(request.getLessonId()));
                    question.setAnswer(request.getAnswer().getText());
                    return question;
                })
                .collect(Collectors.toList());

        return questionService.saveQuestions(questions);
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.findById(id);
    }
    @PostMapping("/delete")
    public void deleteData(){
        questionService.deleteData();
    }
}
