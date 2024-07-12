package org.example.oslearning.service;

import org.example.oslearning.model.Topic;

import java.util.List;

public interface TopicService {
    List<Topic> getAllTopics();
    Topic getTopicById(Long id);
    Topic saveTopic(Topic topic);
    void deleteTopic(Long id);
}
