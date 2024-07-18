package org.example.oslearning.controller;

import org.example.oslearning.model.Topic;
import org.example.oslearning.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @GetMapping
    public List<Topic> getAllTopics() {
        return topicService.getAllTopics();
    }

    @GetMapping("/{id}")
    public Topic getTopicById(@PathVariable Long id) {
        return topicService.getTopicById(id);
    }

    @GetMapping("/{id}/content")
    public ResponseEntity<byte[]> getTopicContent(@PathVariable Long id) {
        Topic topic = topicService.getTopicById(id);
        byte[] content = topic.getContent();
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF) // предположим, что содержимое в формате PDF
                .body(content);
    }

    @PostMapping
    public Topic createTopic(@RequestBody Topic topic) {
        return topicService.saveTopic(topic);
    }

    @PutMapping("/{id}")
    public Topic updateTopic(@PathVariable Long id, @RequestBody Topic topic) {
        topic.setId(id);
        return topicService.saveTopic(topic);
    }

    @DeleteMapping("/{id}")
    public void deleteTopic(@PathVariable Long id) {
        topicService.deleteTopic(id);
    }
}