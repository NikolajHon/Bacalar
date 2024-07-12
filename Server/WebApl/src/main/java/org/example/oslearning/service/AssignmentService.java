package org.example.oslearning.service;

import org.example.oslearning.model.Assignment;

import java.util.List;

public interface AssignmentService {
    List<Assignment> getAllAssignments();
    Assignment getAssignmentById(Long id);
    Assignment saveAssignment(Assignment assignment);
    void deleteAssignment(Long id);
}
