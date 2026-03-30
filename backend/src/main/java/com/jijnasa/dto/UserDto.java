package com.jijnasa.dto;

// No Lombok annotations needed
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String university;
    private String subjects;

    // No-argument constructor
    public UserDto() {
    }

    // All-arguments constructor
    public UserDto(Long id, String name, String email, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public UserDto(Long id, String name, String email, String role, String university, String subjects) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.university = university;
        this.subjects = subjects;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getUniversity() {
        return university;
    }

    public String getSubjects() {
        return subjects;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public void setSubjects(String subjects) {
        this.subjects = subjects;
    }
}
