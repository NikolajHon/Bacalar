package org.example.oslearning.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.example.oslearning.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void sendVerificationEmail(String to, String token) throws MessagingException {
        String subject = "Подтверждение регистрации на гея";
        String confirmationUrl = "http://localhost:8080/api/users/confirm?token=" + token;
        System.out.println("Generated confirmation URL: " + confirmationUrl);
        String message = "Good afternoon!\n" +
                "We would like to inform you that there was an error in our company and we sent you an offer by mistake. We apologize to you. We remain in contact with you and if anything we will write to you. : ";
        String buttonHtml = "<a href=\"" + confirmationUrl + "\">Подтвердить</a>";

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setText("<html><body>" + message + "<br>" + buttonHtml + "</body></html>", true);
        helper.setTo(to);
        System.out.println("send to " + to);
        helper.setSubject(subject);
        helper.setFrom(from);

        javaMailSender.send(mimeMessage);
    }
}
