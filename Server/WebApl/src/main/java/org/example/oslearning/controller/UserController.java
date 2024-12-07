package org.example.oslearning.controller;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.example.oslearning.model.LoginRequest;
import org.example.oslearning.model.Role;
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
import java.util.*;
import java.util.stream.Collectors;

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

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        System.out.println("WE ARE HERE");
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
        System.out.println("WE ARE NOT SENDING MAIL");
        RuleResult result = validator.validate(new PasswordData(user.getPassword()));
        if (!result.isValid()) {
            return ResponseEntity.status(422).body("Password is too weak.");
        }
        System.out.println("WE ARE NOT SENDING MAIL");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userService.saveUser(user);

        VerificationToken token = verificationTokenService.createVerificationToken(savedUser);


        try {
            System.out.println("WE ARE SENDING MAIL");
            emailService.sendVerificationEmail(savedUser.getEmail(), token.getToken());
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send verification email.");
        }

        return ResponseEntity.ok("User registered. Please check your email to verify your account.");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "No user found with this email."));
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid password."));
        }

        if (!user.isEnabled()) {
            return ResponseEntity.status(403).body(Map.of("error", "User has not completed email verification."));
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful.");
        response.put("username", user.getUsername());
        response.put("userId", String.valueOf(user.getId()));
        response.put("role", String.valueOf(user.getRole()));
        response.put("photoUrl", String.valueOf(user.getPhotoUrl()));
        return ResponseEntity.ok(response);
    }


    @GetMapping
    public List<User> getAllUsers() {
        System.out.println(userService.getAllUsers().toString());
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id).orElse(null);
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

    @GetMapping("/top-five")
    public List<User> getTopFiveUsers() {
        return userService.getFiveBest();
    }
    @PostMapping("/changeRating")
    public ResponseEntity<String> changeUserRating(@RequestParam Long userId, @RequestParam int ratingChange) {
        Optional<User> userOptional = userService.findById(userId);

        if (!userOptional.isPresent()) {
            return ResponseEntity.status(404).body("User not found.");
        }

        User user = userOptional.get();
        user.changeRating(ratingChange);
        userService.save(user);

        return ResponseEntity.ok("User rating updated successfully. New rating: " + user.getRating());
    }
    @PutMapping("/{userId}/group/{groupId}")
    public User assignUserToGroup(@PathVariable Long userId, @PathVariable Long groupId) {
        return userService.assignUserToGroup(userId, groupId);
    }


    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name) {
        return userService.searchUsersByName(name);
    }
    @GetMapping("/teachers")
    public List<User> getAllTeachers() {
        return userService.getAllUsers().stream()
                .filter(user -> user.getRole() != null && user.getRole().equals(Role.ROLE_TEACHER))
                .collect(Collectors.toList());
    }

    @GetMapping("/search/teachers")
    public List<User> searchTeachers(@RequestParam String name) {
        return userService.searchUsersByName(name).stream()
                .filter(user -> user.getRole() != null && user.getRole().equals("ROLE_TEACHER"))
                .collect(Collectors.toList());
    }



}
