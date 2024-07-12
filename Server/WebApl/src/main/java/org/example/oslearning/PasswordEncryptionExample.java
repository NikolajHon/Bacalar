package org.example.oslearning;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncryptionExample {

    public static void main(String[] args) {
        // Создаем экземпляр PasswordEncoder
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        // Пароль, который мы хотим зашифровать
        String rawPassword = "Tuke1234";

        // Шифруем пароль
        String encodedPassword = passwordEncoder.encode(rawPassword);
        System.out.println("Encoded password: " + encodedPassword);

        // Пароль, который мы будем проверять
        String passwordToCheck = "Tuke1234";

        // Проверяем, совпадает ли зашифрованный пароль с исходным паролем
        boolean isPasswordMatch = passwordEncoder.matches(passwordToCheck, encodedPassword);
        System.out.println("Passwords match: " + isPasswordMatch);

        // Пример неверного пароля
        String wrongPassword = "WrongPassword";
        boolean isWrongPasswordMatch = passwordEncoder.matches(wrongPassword, encodedPassword);
        System.out.println("Wrong password match: " + isWrongPasswordMatch);
    }
}
