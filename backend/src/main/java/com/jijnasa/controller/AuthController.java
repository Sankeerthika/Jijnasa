package com.jijnasa.controller;

import com.jijnasa.dto.LoginRequest;
import com.jijnasa.dto.RegisterRequest;
import com.jijnasa.dto.UserDto;
import com.jijnasa.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public UserDto login(@RequestBody LoginRequest loginRequest) {
        // USE THE SERVICE NOW
        return authService.login(loginRequest);
    }

    @PostMapping("/register")
    public UserDto register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("DEBUG: Registering user: " + registerRequest.getName()); // Add this line
        return authService.registerUser(registerRequest);
    }
}