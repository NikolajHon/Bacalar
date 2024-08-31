package org.example.oslearning.controller;

import org.example.oslearning.model.User;
import org.example.oslearning.service.S3Service;
import org.example.oslearning.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UploadController {

    private final S3Service s3Service;
    private final UserService userService;

    @Autowired
    public UploadController(S3Service s3Service, UserService userService) {
        this.s3Service = s3Service;
        this.userService = userService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId) {
        try {
            // Убедитесь, что userId передан и пользователь существует
            Optional<User> userOptional = userService.findById(userId);
            if (userOptional.isPresent()) {
                String fileUrl = s3Service.uploadFile(file);

                // Обновление фото URL в профиле пользователя
                User user = userOptional.get();
                user.setPhotoUrl(fileUrl);
                userService.saveUser(user); // Сохранение пользователя с новым URL

                return ResponseEntity.ok(fileUrl);
            } else {
                return ResponseEntity.status(404).body("Пользователь не найден");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Ошибка при загрузке файла");
        }
    }


    @GetMapping("/download/user/{userId}")
    public ResponseEntity<InputStreamResource> downloadFileByUserId(@PathVariable Long userId) {
        try {
            Optional<User> userOptional = userService.getUserById(userId);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String fileUrl = user.getPhotoUrl();

                if (fileUrl != null && !fileUrl.isEmpty()) {
                    String fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

                    InputStream inputStream = s3Service.downloadFile(fileName);

                    return ResponseEntity.ok()
                            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                            .contentType(MediaType.APPLICATION_OCTET_STREAM)
                            .body(new InputStreamResource(inputStream));
                } else {
                    return ResponseEntity.status(404).body(null);
                }
            } else {
                return ResponseEntity.status(404).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
