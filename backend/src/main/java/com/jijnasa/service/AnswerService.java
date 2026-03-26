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
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private DoubtRepository doubtRepository;
    @Autowired
    private UserRepository userRepository;

    public AnswerDto postAnswer(AnswerDto answerDto) {
        Doubt doubt = doubtRepository.findById(answerDto.getDoubtId())
                .orElseThrow(() -> new RuntimeException("Doubt not found"));
        
        User faculty = userRepository.findById(answerDto.getFaculty().getId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        Answer answer = new Answer();
        answer.setContent(answerDto.getContent());
        answer.setTimestamp(Instant.now());
        answer.setDoubt(doubt);
        answer.setFaculty(faculty);

        // Update doubt status to ANSWERED
        doubt.setStatus("ANSWERED");
        doubtRepository.save(doubt);

        Answer saved = answerRepository.save(answer);
        return convertToDto(saved);
    }

    public List<AnswerDto> getAnswersForDoubt(Long doubtId) {
        return answerRepository.findByDoubtId(doubtId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private AnswerDto convertToDto(Answer a) {
        AnswerDto dto = new AnswerDto();
        dto.setId(a.getId());
        dto.setContent(a.getContent());
        dto.setTimestamp(a.getTimestamp());
        dto.setDoubtId(a.getDoubt().getId());
        
        UserDto facDto = new UserDto(a.getFaculty().getId(), a.getFaculty().getName(), a.getFaculty().getEmail(), a.getFaculty().getRole());
        dto.setFaculty(facDto);
        return dto;
    }
}