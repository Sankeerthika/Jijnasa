package com.jijnasa.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Doubt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String status; // PENDING, ANSWERED, RESOLVED
    private Instant timestamp;
    
    @ManyToOne
    private User student;

    @ManyToOne
    private Topic topic;
 // Inside Doubt.java
    @Column(columnDefinition = "TEXT") // This allows detailed doubt descriptions
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }
    public Topic getTopic() { return topic; }
    public void setTopic(Topic topic) { this.topic = topic; }
}