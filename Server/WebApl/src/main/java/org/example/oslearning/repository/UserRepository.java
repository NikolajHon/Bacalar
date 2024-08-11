package org.example.oslearning.repository;

import org.example.oslearning.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("SELECT u FROM User u ORDER BY u.rating DESC")
    List<User> findTopFiveUsers();
    Optional<User> findById(Long id);

}
