package org.example.oslearning.service.impl;

import org.example.oslearning.model.User;
import org.example.oslearning.model.VerificationToken;
import org.example.oslearning.repository.UserRepository;
import org.example.oslearning.service.EmailService;
import org.example.oslearning.service.UserService;
import org.example.oslearning.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private VerificationTokenService verificationTokenService;
    @Override
    public User findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}