package org.example.oslearning.service;

import org.example.oslearning.model.Subtopic;

import java.util.List;

public interface SubtopicService {
    List<Subtopic> getAllSubtopics();
    Subtopic getSubtopicById(Long id);
    Subtopic saveSubtopic(Subtopic subtopic);
    void deleteSubtopic(Long id);
}
