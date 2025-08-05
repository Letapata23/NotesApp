package com.letapata.notes_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Note> getNote(){
        return notesService.findAllNotes();
    }
    
    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id){
        Note note = notesService.findNote(id);
        return note;
    }
    
    @PostMapping("")
    public Note createNote(@RequestBody Note note){
        return notesService.createNote(note);
    }
    
    @PutMapping("/{id}")
    public Note updateNote(@RequestBody Note note, @PathVariable Long id){
        Note theNote = notesService.updateNote(note, id);
        return theNote;
    }

    @DeleteMapping("/{id}")
    public Note deleteNote(@PathVariable Long id){
        Note note = notesService.deleteNote(id);
        return note;
    }
}
