package com.jijnasa.service;

import com.jijnasa.dto.*;
import com.jijnasa.model.*;
import com.jijnasa.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoubtService {

    @Autowired
    private DoubtRepository doubtRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TopicRepository topicRepository;

    public DoubtDto postDoubt(DoubtDto doubtDto) {
        User student = userRepository.findById(doubtDto.getStudent().getId())
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        Topic topic = topicRepository.findById(doubtDto.getTopic().getId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Doubt doubt = new Doubt();
        doubt.setTitle(doubtDto.getTitle());
        doubt.setDescription(doubtDto.getDescription());
        doubt.setStatus("PENDING");
        doubt.setTimestamp(Instant.now());
        doubt.setStudent(student);
        doubt.setTopic(topic);

        Doubt saved = doubtRepository.save(doubt);
        return convertToDto(saved);
    }

    public List<DoubtDto> getAllDoubts() {
        return doubtRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DoubtDto resolveDoubt(Long id) {
        Doubt doubt = doubtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doubt not found"));
        doubt.setStatus("RESOLVED");
        Doubt saved = doubtRepository.save(doubt);
        return convertToDto(saved);
    }

    private DoubtDto convertToDto(Doubt d) { 
        DoubtDto dto = new DoubtDto(); 
        dto.setId(d.getId()); 
        dto.setTitle(d.getTitle()); 
        dto.setDescription(d.getDescription()); 
        dto.setStatus(d.getStatus()); 
        dto.setTimestamp(d.getTimestamp()); 
        
        // Add null checks to prevent 500 errors
        if (d.getStudent() != null) {
            UserDto userDto = new UserDto(d.getStudent().getId(), d.getStudent().getName(), d.getStudent().getEmail(), d.getStudent().getRole()); 
            dto.setStudent(userDto); 
        }
        
        if (d.getTopic() != null) {
            SubjectDto subDto = null;
            if (d.getTopic().getSubject() != null) {
                subDto = new SubjectDto(d.getTopic().getSubject().getId(), d.getTopic().getSubject().getName());
            }
            TopicDto topDto = new TopicDto(d.getTopic().getId(), d.getTopic().getName(), subDto); 
            dto.setTopic(topDto); 
        }
        
        return dto; 
    }
 // Inside DoubtService.java class

    public DoubtDto getDoubtById(Long id) {
        Doubt doubt = doubtRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doubt not found"));
        return convertToDto(doubt);
    }
 // Inside DoubtService.java class

    public List<DoubtDto> getSimilarDoubts(String topicName, String titleQuery) {
        return doubtRepository.findByTitleContainingIgnoreCaseAndStatus(titleQuery, "RESOLVED")
                .stream()
                .filter(d -> d.getTopic() != null && d.getTopic().getName().equalsIgnoreCase(topicName))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}