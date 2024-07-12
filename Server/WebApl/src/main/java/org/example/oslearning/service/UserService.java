package org.example.oslearning.service;

import org.example.oslearning.model.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User saveUser(User user);
    void deleteUser(Long id);

    User findByEmail(String email);

}
