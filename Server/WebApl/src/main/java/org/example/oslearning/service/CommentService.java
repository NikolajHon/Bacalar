package org.example.oslearning.service;

import org.example.oslearning.model.Comment;
import org.example.oslearning.model.CommentRequest;

import java.util.List;

public interface CommentService {
    public List<Comment> getCommentsByDiscussionId(Long discussionId);

    public Comment createComment(Comment comment);
}
