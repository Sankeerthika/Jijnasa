package com.jijnasa.service;

import com.jijnasa.model.Answer;
import com.jijnasa.model.Doubt;
import com.jijnasa.repository.AnswerRepository;
import com.jijnasa.repository.DoubtRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@Service
public class ChatbotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DoubtRepository doubtRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public String getResponse(String query) {
        // 1. FIRST CHECK: Has this been resolved by a faculty already?
        List<Doubt> similarDoubts = doubtRepository.findByTitleContainingIgnoreCaseAndStatus(query, "ANSWERED");
        if (similarDoubts.isEmpty()) {
            similarDoubts = doubtRepository.findByTitleContainingIgnoreCaseAndStatus(query, "RESOLVED");
        }

        if (!similarDoubts.isEmpty()) {
            Doubt existingDoubt = similarDoubts.get(0);
            List<Answer> answers = answerRepository.findByDoubtId(existingDoubt.getId());
            if (!answers.isEmpty()) {
                return "This question was previously resolved! \n\n" +
                       "Faculty Answer: " + answers.get(0).getContent() + "\n\n" +
                       "(Source: " + existingDoubt.getTitle() + ")";
            }
        }

        // 2. SECOND CHECK: If no faculty answer exists, call Gemini AI
        try {
            String url = apiUrl + "?key=" + apiKey;
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", "You are Jijnasa AI. Answer this academic query: " + query);
            
            Map<String, Object> contentsPart = new HashMap<>();
            contentsPart.put("parts", Collections.singletonList(textPart));
            
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", Collections.singletonList(contentsPart));

            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.postForObject(url, requestBody, Map.class);

            if (response != null && response.containsKey("candidates")) {
                List<?> candidates = (List<?>) response.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<?, ?> candidate = (Map<?, ?>) candidates.get(0);
                    Map<?, ?> content = (Map<?, ?>) candidate.get("content");
                    if (content != null) {
                        List<?> parts = (List<?>) content.get("parts");
                        if (parts != null && !parts.isEmpty()) {
                            Map<?, ?> part = (Map<?, ?>) parts.get(0);
                            return (String) part.get("text");
                        }
                    }
                }
            }
            return "I couldn't find a faculty answer or generate a new one. Please try rephrasing.";
        } catch (Exception e) {
            return "I'm having trouble connecting to my brain. Error: " + e.getMessage();
        }
    }
}