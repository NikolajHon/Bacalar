package org.example.oslearning.service.impl;

import org.example.oslearning.model.Discussion;
import org.example.oslearning.repository.DiscussionRepository;
import org.example.oslearning.service.DiscussionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiscussionServiceImpl implements DiscussionService {
    @Autowired
    private DiscussionRepository discussionRepository;

    @Override
    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    @Override
    public Discussion createDiscussion(Discussion discussion) {
        return discussionRepository.save(discussion);
    }

    @Override
    public Optional<Discussion> getDiscussionById(Long id) { // Реализация нового метода
        return discussionRepository.findById(id);
    }

    @Override
    public void deleteDiscussionById(Long id) {
        discussionRepository.deleteById(id);
    }

}
