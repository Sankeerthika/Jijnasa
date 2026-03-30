package com.jijnasa.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${frontend.url:http://localhost:5173,https://jijnasa.vercel.app}")
    private String frontendUrl;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Split and trim to handle spaces in comma-separated list
        String[] origins = frontendUrl.split(",");
        for (int i = 0; i < origins.length; i++) {
            origins[i] = origins[i].trim();
            // Remove trailing slash if it exists
            if (origins[i].endsWith("/")) {
                origins[i] = origins[i].substring(0, origins[i].length() - 1);
            }
        }
        
        registry.addMapping("/**")
            .allowedOrigins(origins)
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}