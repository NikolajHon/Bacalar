package org.example.oslearning.service;

public interface PracticeCompletionService {
    public boolean isPracticeCompleted(Long userId, Long practiceId);

    public void markPracticeAsCompleted(Long userId, Long practiceId);
}
