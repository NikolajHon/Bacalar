package org.example.oslearning.service.impl;

import org.example.oslearning.model.User;
import org.example.oslearning.model.VerificationToken;
import org.example.oslearning.repository.VerificationTokenRepository;
import org.example.oslearning.service.VerificationTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class VerificationTokenServiceImpl implements VerificationTokenService {

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Override
    public VerificationToken createVerificationToken(User user) {
        VerificationToken token = new VerificationToken(user);
        return verificationTokenRepository.save(token);
    }

    @Override
    public VerificationToken getVerificationToken(String token) {
        return verificationTokenRepository.findByToken(token);
    }

    @Override
    public void saveVerificationToken(VerificationToken token) {
        verificationTokenRepository.save(token);
    }

    @Override
    public VerificationToken getVerificationTokenByUser(User user) {
        return verificationTokenRepository.findByUser(user);
    }
}
