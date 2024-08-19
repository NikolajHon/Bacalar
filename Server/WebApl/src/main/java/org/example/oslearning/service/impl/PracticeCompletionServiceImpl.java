package org.example.oslearning.service.impl;

import org.example.oslearning.model.Practice;
import org.example.oslearning.model.PracticeCompletion;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.PracticeCompletionRepository;
import org.example.oslearning.service.PracticeCompletionService;
import org.example.oslearning.service.PracticeService;
import org.example.oslearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PracticeCompletionServiceImpl implements PracticeCompletionService {

    @Autowired
    private PracticeCompletionRepository practiceCompletionRepository;

    @Autowired
    private UserService userService; // Предположим, что у вас есть UserService для работы с пользователями

    @Autowired
    private PracticeService practiceService; // Предположим, что у вас есть PracticeService для работы с практиками

    public boolean isPracticeCompleted(Long userId, Long practiceId) {
        return practiceCompletionRepository.existsByUserIdAndPracticeId(userId, practiceId);
    }

    public void markPracticeAsCompleted(Long userId, Long practiceId) {
        System.out.println(userId);
        User user = userService.getUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Practice practice = practiceService.getPracticeById(practiceId).orElseThrow(() -> new RuntimeException("Practice not found"));

        // Создаем запись о выполнении практики
        PracticeCompletion completion = new PracticeCompletion();
        completion.setUser(user);  // Устанавливаем объект User
        completion.setPractice(practice);  // Устанавливаем объект Practice
        completion.setCompletedAt(LocalDateTime.now());

        // Сохраняем запись в базе данных
        practiceCompletionRepository.save(completion);
    }
}