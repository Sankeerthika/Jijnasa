package com.jijnasa.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/difficult-topics")
    public Map<String, Integer> getDifficultTopics() {
        // Dummy data - replace with real service logic
        return Map.of(
            "Binary Trees", 15,
            "CSS Flexbox", 12,
            "React Hooks", 10,
            "Spring Security", 8
        );
    }
}