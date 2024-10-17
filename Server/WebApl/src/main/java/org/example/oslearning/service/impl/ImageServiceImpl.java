package org.example.oslearning.service.impl;

import jakarta.transaction.Transactional;
import org.example.oslearning.model.Image;
import org.example.oslearning.model.User;
import org.example.oslearning.repository.ImageRepository;
import org.example.oslearning.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Transactional
    @Override
    public Image saveImage(MultipartFile file, User user) throws Exception {
        String fileName = file.getOriginalFilename();
        byte[] fileData = file.getBytes();
        System.out.println(user.getId());
        Optional<Image> existingImageOpt = null;
        try {
            existingImageOpt = imageRepository.findByUser(user);
            System.out.println(existingImageOpt.isPresent());
        } catch (Exception e) {
            e.printStackTrace(); 
        }

        System.out.println(existingImageOpt.isPresent());
        Image image;

        if (existingImageOpt.isPresent()) {
            System.out.println("Exist");
            image = existingImageOpt.get();
            image.setName(fileName);
            image.setData(fileData);
        } else {
            System.out.println("not Exist");
            image = new Image(fileName, fileData, user);
        }
        System.out.println("SMTH");
        return imageRepository.save(image);
    }



    @Override
    public Optional<Image> getImageById(Long id) {
        return imageRepository.findById(id);
    }

}
