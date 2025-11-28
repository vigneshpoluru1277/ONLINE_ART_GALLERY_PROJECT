package com.klef.dev.controller;

import com.klef.dev.model.User;
import com.klef.dev.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        User user = userRepository.findByUsername(loginUser.getUsername());

        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("username", user.getUsername());
            response.put("role", user.getRole() != null ? user.getRole().toString() : "");
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        List<User> users = userRepository.findByRole(role.toUpperCase());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    @PutMapping("/users/{id}/refund")
    public ResponseEntity<?> refundToSeller(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        Double amount = Double.parseDouble(body.get("amount").toString());
        User user = userRepository.findById(id).orElse(null);
        if (user == null || !user.getRole().toString().equalsIgnoreCase("SELLER")) {
            return ResponseEntity.badRequest().body(Map.of("message", "Seller not found"));
        }
        user.setBalance(user.getBalance() + amount);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Refunded " + amount + " to seller", "balance", user.getBalance()));
    }
}
