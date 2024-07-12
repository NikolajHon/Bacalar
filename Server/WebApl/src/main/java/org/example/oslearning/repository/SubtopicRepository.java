package org.example.oslearning.repository;

import org.example.oslearning.model.Subtopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtopicRepository extends JpaRepository<Subtopic, Long> {
}