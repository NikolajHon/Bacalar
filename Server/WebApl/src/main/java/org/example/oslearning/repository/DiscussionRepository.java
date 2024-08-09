package org.example.oslearning.repository;

import org.example.oslearning.model.Discussion;
import org.example.oslearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
    Optional<Discussion> findById(Long id);
}