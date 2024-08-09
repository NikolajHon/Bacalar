package org.example.oslearning.service.impl;

import org.example.oslearning.model.Comment;
import org.example.oslearning.model.CommentRequest;
import org.example.oslearning.model.Discussion;
import org.example.oslearning.repository.CommentRepository;
import org.example.oslearning.repository.DiscussionRepository;
import org.example.oslearning.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CommentServiceImpl implements  CommentService{
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private DiscussionRepository discussionRepository;

    public List<Comment> getCommentsByDiscussionId(Long discussionId) {
        return commentRepository.findByDiscussionId(discussionId);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
