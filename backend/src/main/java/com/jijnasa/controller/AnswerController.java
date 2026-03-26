package com.jijnasa.controller;

import com.jijnasa.dto.AnswerDto;
import com.jijnasa.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping
    public AnswerDto postAnswer(@RequestBody AnswerDto answerDto) {
        return answerService.postAnswer(answerDto);
    }

    @GetMapping("/doubt/{doubtId}")
    public List<AnswerDto> getAnswersForDoubt(@PathVariable Long doubtId) {
        return answerService.getAnswersForDoubt(doubtId);
    }
}
