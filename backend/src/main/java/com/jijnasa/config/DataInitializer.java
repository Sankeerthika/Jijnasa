package com.jijnasa.config;

import com.jijnasa.model.Subject;
import com.jijnasa.model.Topic;
import com.jijnasa.repository.SubjectRepository;
import com.jijnasa.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Override
    public void run(String... args) throws Exception {
        if (subjectRepository.count() == 0) {
            // Add Subjects
            Subject ds = new Subject();
            ds.setName("Data Structures");
            subjectRepository.save(ds);

            Subject web = new Subject();
            web.setName("Web Development");
            subjectRepository.save(web);

            // Add Topics
            Topic trees = new Topic();
            trees.setName("Binary Trees");
            trees.setSubject(ds);
            topicRepository.save(trees);

            Topic css = new Topic();
            css.setName("CSS Flexbox");
            css.setSubject(web);
            topicRepository.save(css);

            System.out.println("Initial data loaded: Data Structures & Web Development.");
        }
    }
}