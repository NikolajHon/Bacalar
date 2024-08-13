package org.example.oslearning.service;

import org.example.oslearning.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    void deleteUser(Long id);

    User findByEmail(String email);
    List<User> getFiveBest();
    void save(User user);
    Optional<User> findById(Long id);
    User assignUserToGroup(Long userId, Long groupId);
    List<User> searchUsersByName(String name);



}
