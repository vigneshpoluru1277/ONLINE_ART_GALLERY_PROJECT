package com.klef.dev.controller;

import com.klef.dev.model.Art;
import com.klef.dev.repository.ArtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/arts")
public class ArtController {

    @Autowired
    private ArtRepository repo;

    private final String UPLOAD_DIR = "uploads/";

    @GetMapping
    public List<Art> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Art> add(
            @RequestParam("title") String title,
            @RequestParam("artist") String artist,
            @RequestParam("price") Double price,
            @RequestParam(value = "image", required = false) MultipartFile image) {
        
        try {
            Art art = new Art();
            art.setTitle(title);
            art.setArtist(artist);
            art.setPrice(price);
            
            if (image != null && !image.isEmpty()) {
                // Create uploads directory if it doesn't exist
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                
                // Generate unique filename
                String filename = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filepath = Paths.get(UPLOAD_DIR + filename);
                
                // Save file
                Files.write(filepath, image.getBytes());
                
                // Store relative URL
                art.setImageUrl("http://localhost:2004/uploads/" + filename);
            } else {
                // Default placeholder if no image
                art.setImageUrl("https://via.placeholder.com/300x200?text=No+Image");
            }
            
            Art saved = repo.save(art);
            return ResponseEntity.ok(saved);
            
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public Art update(@PathVariable Long id, @RequestBody Art art) {
        art.setId(id);
        return repo.save(art);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
