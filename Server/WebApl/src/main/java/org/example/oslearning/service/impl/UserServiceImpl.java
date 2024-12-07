package org.example.oslearning.service.impl;

import org.example.oslearning.model.Group;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.GroupRepository;
import org.example.oslearning.repository.UserRepository;
import org.example.oslearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroupRepository groupRepository;
    @Override
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }


    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getFiveBest(){
        return userRepository.findTopFiveUsers();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void save(User user) {
        userRepository.save(user);
    }


    @Override
    public User assignUserToGroup(Long userId, Long groupId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new IllegalArgumentException("Group not found"));
        user.setGroup(group);
        return userRepository.save(user);
    }
    @Override
    public List<User> searchUsersByName(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username);
    }

}
