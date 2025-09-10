package com.letapata.notes_management_system.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.letapata.notes_management_system.dto.NoteCreationDTO;
import com.letapata.notes_management_system.dto.NoteDTO;
import com.letapata.notes_management_system.dto.NoteUpdateDTO;
import com.letapata.notes_management_system.entities.Note;
import com.letapata.notes_management_system.entities.UserAccount;
import com.letapata.notes_management_system.repository.AccountRepository;
import com.letapata.notes_management_system.service.NotesService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins="http://localhost:4200/",
             allowCredentials = "true")
@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NotesService notesService;
    
    @GetMapping("")
    public ResponseEntity<?> getNotes(HttpSession session){
        Long userId = (Long) session.getAttribute("userId");
        
        if(userId == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in");
        }
        return ResponseEntity.ok(notesService.findNotesByUserId(userId));

    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getNoteById(@PathVariable Long id, HttpSession session){
        Long userId = (Long) session.getAttribute("userId");
        
        if(userId == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In");
        }
        
        return ResponseEntity.ok(notesService.findNote(id));
    }
    
    @PostMapping("")
    public ResponseEntity<?> createNote(@RequestBody NoteCreationDTO note, HttpSession session){
        Long userId = (Long) session.getAttribute("userId");
        
        if(userId == null){
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged In");
        }
        
        // Save the newly created note
        NoteDTO createdNote = notesService.createNote(note,userId);

        // Build a URI for the created resource
        URI location = URI.create("/notes/" + createdNote.getId());

        // Return 201 created with saved note in the body
        return ResponseEntity.created(location).body(createdNote);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(@RequestBody NoteUpdateDTO note, @PathVariable Long id, HttpSession session){
        Long userId = (Long) session.getAttribute("userId");
        
        if(userId == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        NoteUpdateDTO updatedNote = notesService.updateNote(note, id);

        if(updatedNote != null){
            return ResponseEntity.ok(updatedNote);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id,HttpSession session){
        Long userId = (Long) session.getAttribute("userId");
        
        if(userId == null){
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not logged in");
        }

        NoteDTO note = notesService.deleteNote(id);

        if(note != null){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
