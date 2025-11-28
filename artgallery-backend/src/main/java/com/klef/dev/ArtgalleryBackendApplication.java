package com.klef.dev;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ArtgalleryBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArtgalleryBackendApplication.class, args);
    }

    @Configuration
    public static class WebConfig implements WebMvcConfigurer {
        
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            // Serve uploaded images
            registry.addResourceHandler("/uploads/**")
                    .addResourceLocations("file:uploads/");
        }
        
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("*")
                    .allowedHeaders("*");
        }
    }
}
