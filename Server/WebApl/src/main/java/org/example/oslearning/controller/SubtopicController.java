package org.example.oslearning.controller;

import org.example.oslearning.model.Subtopic;
import org.example.oslearning.service.SubtopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtopics")
public class SubtopicController {

    @Autowired
    private SubtopicService subtopicService;

    @GetMapping
    public List<Subtopic> getAllSubtopics() {
        return subtopicService.getAllSubtopics();
    }

    @GetMapping("/{id}")
    public Subtopic getSubtopicById(@PathVariable Long id) {
        return subtopicService.getSubtopicById(id);
    }

    @PostMapping
    public Subtopic createSubtopic(@RequestBody Subtopic subtopic) {
        return subtopicService.saveSubtopic(subtopic);
    }

    @PutMapping("/{id}")
    public Subtopic updateSubtopic(@PathVariable Long id, @RequestBody Subtopic subtopic) {
        subtopic.setId(id);
        return subtopicService.saveSubtopic(subtopic);
    }

    @DeleteMapping("/{id}")
    public void deleteSubtopic(@PathVariable Long id) {
        subtopicService.deleteSubtopic(id);
    }
}
