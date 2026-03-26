package com.jijnasa.dto;

import java.time.Instant;

public class DoubtDto {
    private Long id;
    private String title;
    private String description;
    private String status;
    private Instant timestamp;
    private UserDto student;
    private TopicDto topic;

    // Getters and Setters
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
    public UserDto getStudent() { return student; }
    public void setStudent(UserDto student) { this.student = student; }
    public TopicDto getTopic() { return topic; }
    public void setTopic(TopicDto topic) { this.topic = topic; }
}