package org.example.oslearning.service;

import org.example.oslearning.model.Image;
import org.example.oslearning.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface ImageService {
    Image saveImage(MultipartFile file, User user) throws Exception;

    Optional<Image> getImageById(Long id);
}