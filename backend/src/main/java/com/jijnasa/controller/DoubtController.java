package com.jijnasa.controller; 
 
import com.jijnasa.dto.DoubtDto; 
import com.jijnasa.service.DoubtService; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.web.bind.annotation.*; 
 
import java.util.List; 
 
@RestController 
@RequestMapping("/api/doubts") 
public class DoubtController { 
 
    @Autowired 
    private DoubtService doubtService; 
 
    @GetMapping 
    public List<DoubtDto> getAllDoubts() { 
        return doubtService.getAllDoubts(); 
    } 
 
    @PostMapping 
    public DoubtDto postDoubt(@RequestBody DoubtDto doubtDto) { 
        System.out.println("DEBUG: Posting doubt: " + doubtDto.getTitle());
        return doubtService.postDoubt(doubtDto); 
    } 
 
    @PostMapping("/{id}/resolve") 
    public DoubtDto resolveDoubt(@PathVariable Long id) { 
        return doubtService.resolveDoubt(id); 
    } 
    
    @GetMapping("/similar") 
    public List<DoubtDto> getSimilarDoubts(@RequestParam String topicName, @RequestParam String titleQuery) { 
        return doubtService.getSimilarDoubts(topicName, titleQuery); 
    }
 
    @GetMapping("/{id}") 
    public DoubtDto getDoubtById(@PathVariable Long id) { 
        return doubtService.getDoubtById(id); 
    } 
}