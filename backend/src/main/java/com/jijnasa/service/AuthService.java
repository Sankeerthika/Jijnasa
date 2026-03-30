package com.jijnasa.service;

import com.jijnasa.dto.LoginRequest;
import com.jijnasa.dto.RegisterRequest;
import com.jijnasa.dto.UserDto;
import com.jijnasa.model.User;
import com.jijnasa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public UserDto registerUser(RegisterRequest registerRequest) {
        try {
            if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
                throw new RuntimeException("Email is already in use!");
            }

            User user = new User();
            user.setName(registerRequest.getName());
            user.setEmail(registerRequest.getEmail());
            user.setRole(registerRequest.getRole());

            User savedUser = userRepository.save(user);
            return new UserDto(savedUser.getId(), savedUser.getName(), savedUser.getEmail(), savedUser.getRole());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error during registration: " + e.getMessage());
        }
    }

    // ADD THIS METHOD: Real Login Logic
 // Inside AuthService.java

    public UserDto login(LoginRequest loginRequest) { 
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail()); 
        
        if (userOpt.isPresent()) { 
            User user = userOpt.get(); 
            
            // Use equalsIgnoreCase to prevent "STUDENT" vs "Student" mismatches
            if (user.getRole().equalsIgnoreCase(loginRequest.getRole())) { 
                return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole()); 
            } else { 
                // This error is thrown if you register as STUDENT but try to login as FACULTY
                throw new RuntimeException("Role mismatch: You are registered as " + user.getRole()); 
            } 
        } else { 
            throw new RuntimeException("User not found with this email."); 
        } 
    }
    
}