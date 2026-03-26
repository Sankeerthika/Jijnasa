package com.jijnasa.repository;

import com.jijnasa.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    // This allows us to find all topics belonging to a specific subject
    List<Topic> findBySubjectId(Long subjectId);
}