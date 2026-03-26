package com.jijnasa.dto;

import java.time.Instant;

public class AnswerDto {
    private Long id;
    private String content;
    private Instant timestamp;
    private Long doubtId;
    private UserDto faculty;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public Long getDoubtId() { return doubtId; }
    public void setDoubtId(Long doubtId) { this.doubtId = doubtId; }
    public UserDto getFaculty() { return faculty; }
    public void setFaculty(UserDto faculty) { this.faculty = faculty; }
}