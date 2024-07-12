package org.example.oslearning.service;

import org.example.oslearning.model.Submission;

import java.util.List;

public interface SubmissionService {
    List<Submission> getAllSubmissions();
    Submission getSubmissionById(Long id);
    Submission saveSubmission(Submission submission);
    void deleteSubmission(Long id);
}
