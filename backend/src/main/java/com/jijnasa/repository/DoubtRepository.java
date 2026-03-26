package com.jijnasa.repository;

import com.jijnasa.model.Doubt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoubtRepository extends JpaRepository<Doubt, Long> {
    List<Doubt> findByStudentId(Long studentId);
    List<Doubt> findByStatus(String status);
    
 // Inside DoubtRepository.java
    List<Doubt> findByTitleContainingIgnoreCaseAndStatus(String title, String status);
}