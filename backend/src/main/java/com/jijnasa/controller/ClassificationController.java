package com.jijnasa.controller;

import com.jijnasa.dto.SubjectDto;
import com.jijnasa.dto.TopicDto;
import com.jijnasa.model.Subject;
import com.jijnasa.model.Topic;
import com.jijnasa.repository.SubjectRepository;
import com.jijnasa.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/classification")
public class ClassificationController {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/subjects")
    public List<SubjectDto> getAllSubjects() {
        // Fetches all subjects and converts them to DTOs for the frontend
        return subjectRepository.findAll().stream()
                .map(s -> new SubjectDto(s.getId(), s.getName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/subjects/{subjectId}/topics")
    public List<TopicDto> getTopicsBySubject(@PathVariable Long subjectId) {
        // Fetches topics for a specific subject
        return topicRepository.findBySubjectId(subjectId).stream()
                .map(t -> new TopicDto(t.getId(), t.getName(), 
                    new SubjectDto(t.getSubject().getId(), t.getSubject().getName())))
                .collect(Collectors.toList());
    }
}