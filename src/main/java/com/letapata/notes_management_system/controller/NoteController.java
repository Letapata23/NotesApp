package com.letapata.notes_management_system.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.letapata.notes_management_system.model.Note;
import com.letapata.notes_management_system.service.NotesService;

@CrossOrigin(origins="http://localhost:4200/")
@RestController
@RequestMapping("/notes")
public class NoteController {
    @Autowired
    NotesService notesService;
    
    @GetMapping("")
    public ResponseEntity<List<Note>> getNote(){
        List<Note> notes = notesService.findAllNotes();

        if(notes != null){
            return ResponseEntity.ok(notes);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id){
        Note note = notesService.findNote(id);

        if(note != null){
            return ResponseEntity.ok(note);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("")
    public ResponseEntity<Note> createNote(@RequestBody Note note){
        // Save the newly created note
        Note createdNote = notesService.createNote(note);

        // Build a URI for the created resource
        URI location = URI.create("/notes/" + createdNote.getId());

        // Return 201 created with saved note in the body
        return ResponseEntity.created(location).body(createdNote);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@RequestBody Note note, @PathVariable Long id){
        Note updatedNote = notesService.updateNote(note, id);

        if(updatedNote != null){
            return ResponseEntity.ok(updatedNote);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id){
        Note note = notesService.deleteNote(id);

        if(note != null){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
