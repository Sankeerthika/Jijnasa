package com.jijnasa.dto;

public class TopicDto {
    private Long id;
    private String name;
    private SubjectDto subject;

    // Constructors
    public TopicDto() {}

    public TopicDto(Long id, String name, SubjectDto subject) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public SubjectDto getSubject() {
        return subject;
    }

    public void setSubject(SubjectDto subject) {
        this.subject = subject;
    }
}