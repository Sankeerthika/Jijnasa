package com.jijnasa.dto;

// No Lombok annotations needed
public class RegisterRequest {
    private String name;
    private String email;
    private String role;
    private String university;
    private String subjects;

    // Getters
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