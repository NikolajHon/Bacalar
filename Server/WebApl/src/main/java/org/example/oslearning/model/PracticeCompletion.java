package org.example.oslearning.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "practice_completion")
public class PracticeCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "practice_id", nullable = false)
    private Practice practice;

    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    public PracticeCompletion() {
    }

    public PracticeCompletion(User user, Practice practice, LocalDateTime completedAt) {
        this.user = user;
        this.practice = practice;
        this.completedAt = completedAt;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Practice getPractice() {
        return practice;
    }

    public void setPractice(Practice practice) {
        this.practice = practice;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
