package com.letapata.notes_management_system.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.letapata.notes_management_system.entities.UserAccount;
import com.letapata.notes_management_system.repository.AccountRepository;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:4200/",
             allowCredentials = "true"
)
public class AuthController {

    @Autowired
    private AccountRepository accountRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String,String> body, HttpSession session){
        String username = body.get("username");
        String password = body.get("password");

        UserAccount user = accountRepo.findByUsername(username);

        if(user != null && user.getPassword().equals(password)){
            session.setAttribute("userId", user.getId());
            System.out.println("Logged in");
            Map<String,String> response = new HashMap<>();
            response.put("response","Login successful");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        session.invalidate(); // destroy session
        Map<String,String> response = new HashMap<>();
        response.put("message","Logged out");
        return ResponseEntity.ok(response);
    }
}
