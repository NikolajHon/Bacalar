package org.example.oslearning.controller;

import org.example.oslearning.model.Image;
import org.example.oslearning.model.User;
import org.example.oslearning.service.ImageService;
import org.example.oslearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;
    @Autowired
    private UserService userService;

    @PostMapping("/upload/user/{userId}")
    public ResponseEntity<String> uploadImageForUser(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();

                Image savedImage = imageService.saveImage(file, user);
                System.out.println("SMTH 2");
                return ResponseEntity.ok("Image uploaded successfully for user with ID: " + user.getId() + " and image ID: " + savedImage.getId());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + userId);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while uploading image for user ID: " + userId);
        }
    }




    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImageById(@PathVariable Long id) {
        Optional<Image> imageEntityOptional = imageService.getImageById(id);

        if (imageEntityOptional.isPresent()) {
            Image imageEntity = imageEntityOptional.get();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(imageEntity.getData(), headers, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
