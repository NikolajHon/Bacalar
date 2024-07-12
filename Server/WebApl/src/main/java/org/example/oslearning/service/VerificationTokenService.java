package org.example.oslearning.service;

import org.example.oslearning.model.User;
import org.example.oslearning.model.VerificationToken;

public interface VerificationTokenService {
    VerificationToken createVerificationToken(User user);
    VerificationToken getVerificationToken(String token);
    void saveVerificationToken(VerificationToken token);
    VerificationToken getVerificationTokenByUser(User user);
}
