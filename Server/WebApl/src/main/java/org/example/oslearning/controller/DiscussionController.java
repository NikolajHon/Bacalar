package org.example.oslearning.controller;

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
        System.out.println("We are here");
        return discussionService.getAllDiscussions();
    }

    @PostMapping
    public Discussion createDiscussion(@RequestBody Discussion discussion) {
        return discussionService.createDiscussion(discussion);
    }
    @GetMapping("/{id}")
    public Optional<Discussion> getDiscussionById(@PathVariable Long id) {
        return discussionService.getDiscussionById(id);
    }
}