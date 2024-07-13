package org.example.oslearning.controller;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.example.oslearning.model.LoginRequest;
import org.example.oslearning.model.User;
import org.example.oslearning.model.VerificationToken;
import org.example.oslearning.service.EmailService;
import org.example.oslearning.service.UserService;
import org.example.oslearning.service.VerificationTokenService;
import org.passay.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private VerificationTokenService verificationTokenService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/confirm")
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String token) {
        System.out.println("Received token from URL: " + token);

        VerificationToken verificationToken = verificationTokenService.getVerificationToken(token);

        if (verificationToken == null || verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userService.saveUser(user);

        return ResponseEntity.ok("User confirmed successfully.");
    }
//P@ssw0rd1
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {

        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(409).body("User with this email already exists.");
        }

        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(8, 30),
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.Digit, 1),
                new CharacterRule(EnglishCharacterData.Special, 1),
                new WhitespaceRule()
        ));

        RuleResult result = validator.validate(new PasswordData(user.getPassword()));
        if (!result.isValid()) {
            return ResponseEntity.status(422).body("Password is too weak.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.saveUser(user);

        VerificationToken token = verificationTokenService.createVerificationToken(savedUser);
        try {
            emailService.sendVerificationEmail(savedUser.getEmail(), token.getToken());
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send verification email.");
        }

        return ResponseEntity.ok("User registered. Please check your email to verify your account.");
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(404).body("No user found with this email.");
        }

        System.out.println("User found: " + user.getEmail());
        System.out.println("Provided password: " + loginRequest.getPassword());
        System.out.println("Stored password: " + user.getPassword());

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            System.out.println("Passwords do not match");
            return ResponseEntity.status(401).body("Invalid password.");
        }

        if (!user.isEnabled()) {
            return ResponseEntity.status(403).body("User has not completed email verification.");
        }

        return ResponseEntity.ok("Login successful.");
    }






    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }


}
