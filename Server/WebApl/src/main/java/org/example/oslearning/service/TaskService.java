package org.example.oslearning.service;

import org.example.oslearning.model.Task;

import java.util.List;

public interface TaskService {
    public List<Task> getAllTasksById(Long id);
    public Task getTaskById(Long id);
    public Task createTask(Task task);
    public void deleteTask(Long id);
}
