package org.example.oslearning.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.oslearning.model.Discussion;
import org.example.oslearning.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {
    @Autowired
    private DiscussionService discussionService;

    @GetMapping
    public List<Discussion> getAllDiscussions() {
        return discussionService.getAllDiscussions();
    }

    @PostMapping
    public Discussion createDiscussion(@RequestBody Discussion discussion) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(discussion);
            System.out.println("get JSON: " + jsonString);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return discussionService.createDiscussion(discussion);
    }

    @GetMapping("/{id}")
    public Optional<Discussion> getDiscussionById(@PathVariable Long id) {
        return discussionService.getDiscussionById(id);
    }

    @GetMapping("/lesson/{lessonId}")
    public List<Discussion> getDiscussionsByLessonId(@PathVariable Long lessonId) {
        System.out.println("Hello");
        return discussionService.getDiscussionsByLessonId(lessonId);
    }

    @DeleteMapping("/{id}")
    public void deleteDiscussionById(@PathVariable Long id){
        discussionService.deleteDiscussionById(id);
    }
}