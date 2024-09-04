package org.example.oslearning.service.impl;

import org.example.oslearning.model.Practice;
import org.example.oslearning.repository.PracticeRepository;
import org.example.oslearning.service.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PracticeServiceImpl implements PracticeService {

    @Autowired
    private PracticeRepository practiceRepository;

    @Override
    public List<Practice> getAllPractices() {
        return practiceRepository.findAll();
    }

    @Override
    public Optional<Practice> getPracticeById(Long id) {
        return practiceRepository.findById(id);
    }

    @Override
    public List<Practice> getPracticesByLessonId(Long lessonId) {
        return practiceRepository.findByLessonId(lessonId);
    }

    @Override
    public Practice savePractice(Practice practice) {
        return practiceRepository.save(practice);
    }

    @Override
    public void deletePractice(Long id) {
        practiceRepository.deleteById(id);
    }
}
