package org.example.oslearning.controller;

import org.example.oslearning.model.Comment;
import org.example.oslearning.model.CommentRequest;
import org.example.oslearning.model.Discussion;
import org.example.oslearning.repository.DiscussionRepository;
import org.example.oslearning.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @Autowired
    private DiscussionRepository discussionRepository;

    @GetMapping("/discussion/{discussionId}")
    public List<Comment> getCommentsByDiscussionId(@PathVariable Long discussionId) {
        System.out.println("we take all comments");
        return commentService.getCommentsByDiscussionId(discussionId);
    }

    @PostMapping
    public Comment createComment(@RequestBody CommentRequest commentRequest) {
        System.out.println(commentRequest.getDiscussionId());
        Discussion discussion = discussionRepository.findById(commentRequest.getDiscussionId())
                .orElseThrow(() -> new IllegalArgumentException("Discussion not found"));

        Comment comment = new Comment();
        comment.setDiscussion(discussion);
        comment.setContent(commentRequest.getContent());
        comment.setAuthor(commentRequest.getAuthor());

        return commentService.createComment(comment);
    }
}
