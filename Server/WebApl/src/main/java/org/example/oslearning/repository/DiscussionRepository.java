
package org.example.oslearning.repository;

import org.example.oslearning.model.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    Optional<Discussion> findById(Long id);
    List<Discussion> findByLessonId(Long lessonId); // New method for finding by lessonId
}