package org.example.oslearning.repository;

import org.example.oslearning.model.Image;
import org.example.oslearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByUser(User user);

}
