package org.example.oslearning.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Person")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private boolean enabled = false;


}
