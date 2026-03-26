package com.jijnasa.controller;

import com.jijnasa.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @GetMapping("/ask")
    public Map<String, String> askChatbot(@RequestParam String query) {
        // This now calls the Real Gemini AI logic in your service
        String aiResponse = chatbotService.getResponse(query);
        return Map.of("response", aiResponse);
    }
}