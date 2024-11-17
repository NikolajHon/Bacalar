package org.example.oslearning.service;

import org.example.oslearning.model.Discussion;

import java.util.List;
import java.util.Optional;

public interface DiscussionService {
    List<Discussion> getAllDiscussions();
    Discussion createDiscussion(Discussion discussion);
    Optional<Discussion> getDiscussionById(Long id);
    List<Discussion> getDiscussionsByLessonId(Long lessonId); // New method
    void deleteDiscussionById(Long id);
}