package com.jijnasa;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JijnasaApplication {

    public static void main(String[] args) {
        // Load .env file if it exists, otherwise ignore (useful for production/Railway)
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
        
        SpringApplication.run(JijnasaApplication.class, args);
    }
}