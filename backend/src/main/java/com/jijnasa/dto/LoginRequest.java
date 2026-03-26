package com.jijnasa.dto;

// No Lombok annotations needed
public class LoginRequest {
    private String email;
    private String role;

    // Getters
    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }
}