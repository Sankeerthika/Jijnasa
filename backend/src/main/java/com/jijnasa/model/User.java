package com.jijnasa.model;

import jakarta.persistence.*;

// No Lombok annotations needed
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    private String role;
    private String university;
    private String subjects;

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