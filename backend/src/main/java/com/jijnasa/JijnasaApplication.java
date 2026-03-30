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
        
        // Handle JDBC URL with embedded credentials if provided via environment variable
        String dbUrl = System.getenv("DB_URL");
        if (dbUrl == null) {
            dbUrl = System.getenv("DATABASE_URL");
            if (dbUrl != null) {
                System.setProperty("DB_URL", dbUrl);
            }
        }
        if (dbUrl == null) {
            dbUrl = System.getProperty("DB_URL");
        }
        
        // Ensure any env var is set to system property for Spring to see
        if (System.getenv("DB_USERNAME") != null) System.setProperty("DB_USERNAME", System.getenv("DB_USERNAME"));
        if (System.getenv("DB_PASSWORD") != null) System.setProperty("DB_PASSWORD", System.getenv("DB_PASSWORD"));
        if (System.getenv("DB_PLATFORM") != null) System.setProperty("DB_PLATFORM", System.getenv("DB_PLATFORM"));
        if (System.getenv("GEMINI_KEY") != null) System.setProperty("GEMINI_KEY", System.getenv("GEMINI_KEY"));
        if (System.getenv("GEMINI_URL") != null) System.setProperty("GEMINI_URL", System.getenv("GEMINI_URL"));
        if (System.getenv("FRONTEND_URL") != null) System.setProperty("FRONTEND_URL", System.getenv("FRONTEND_URL"));
        
        if (dbUrl != null && (dbUrl.startsWith("jdbc:postgresql://") || dbUrl.startsWith("postgresql://")) && dbUrl.contains("@")) {
            try {
                // If it starts with postgresql://, prefix with jdbc: for parsing
                String parseUrl = dbUrl;
                if (dbUrl.startsWith("postgresql://")) {
                    parseUrl = "jdbc:" + dbUrl;
                }
                
                // Extract credentials from the URL (jdbc:postgresql://user:password@host:port/db)
                // Remove 'jdbc:' prefix to parse as URI
                String cleanUrl = parseUrl.substring(5);
                java.net.URI dbUri = new java.net.URI(cleanUrl);
                
                String userInfo = dbUri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] creds = userInfo.split(":");
                    System.setProperty("DB_USERNAME", creds[0]);
                    System.setProperty("DB_PASSWORD", creds[1]);
                    
                    // Reconstruct JDBC URL without credentials
                    String host = dbUri.getHost();
                    int port = dbUri.getPort();
                    String path = dbUri.getPath();
                    String query = dbUri.getQuery();
                    
                    String newJdbcUrl = "jdbc:postgresql://" + host + (port != -1 ? ":" + port : "") + path;
                    if (query != null) {
                        newJdbcUrl += "?" + query;
                    }
                    
                    System.setProperty("DB_URL", newJdbcUrl);
                }
            } catch (Exception e) {
                // Ignore parsing errors and fallback to original URL
            }
        }
        
        SpringApplication.run(JijnasaApplication.class, args);
    }
}