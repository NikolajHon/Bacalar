package org.example.oslearning.controller;

import lombok.Data;

import java.util.List;

@Data
public class QuestionRequest {
    private String text;
    private int lessonId;
    private String type;
    private List<String> variants;
    private AnswerRequest answer;

    @Data
    public static class AnswerRequest {
        private String text;

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getLessonId() {
        return lessonId;
    }

    public void setLessonId(int lessonId) {
        this.lessonId = lessonId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getVariants() {
        return variants;
    }

    public void setVariants(List<String> variants) {
        this.variants = variants;
    }

    public AnswerRequest getAnswer() {
        return answer;
    }

    public void setAnswer(AnswerRequest answer) {
        this.answer = answer;
    }
}
