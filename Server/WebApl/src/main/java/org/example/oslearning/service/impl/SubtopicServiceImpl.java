package org.example.oslearning.service.impl;

import org.example.oslearning.model.Subtopic;
import org.example.oslearning.repository.SubtopicRepository;
import org.example.oslearning.service.SubtopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubtopicServiceImpl implements SubtopicService {

    @Autowired
    private SubtopicRepository subtopicRepository;

    @Override
    public List<Subtopic> getAllSubtopics() {
        return subtopicRepository.findAll();
    }

    @Override
    public Subtopic getSubtopicById(Long id) {
        return subtopicRepository.findById(id).orElse(null);
    }

    @Override
    public Subtopic saveSubtopic(Subtopic subtopic) {
        return subtopicRepository.save(subtopic);
    }

    @Override
    public void deleteSubtopic(Long id) {
        subtopicRepository.deleteById(id);
    }
}
