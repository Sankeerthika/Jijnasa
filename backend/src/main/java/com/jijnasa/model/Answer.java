package com.jijnasa.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Instant timestamp;

    @ManyToOne
    private Doubt doubt;

    @ManyToOne
    private User faculty;

    @Column(columnDefinition = "TEXT")
    private String content;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public Doubt getDoubt() { return doubt; }
    public void setDoubt(Doubt doubt) { this.doubt = doubt; }
    public User getFaculty() { return faculty; }
    public void setFaculty(User faculty) { this.faculty = faculty; }
}