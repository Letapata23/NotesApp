package com.letapata.notes_management_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letapata.notes_management_system.model.Note;
import com.letapata.notes_management_system.repository.NotesRepository;

@Service
public class NotesService {

    @Autowired // Automatically inject the NotesRepository
    NotesRepository notesRepo;
    
    public Note createNote(Note note){
        return notesRepo.save(note);
    }
    
    public List<Note> findAllNotes(){
        List<Note> notes = notesRepo.findAll();
        return notes;
    }
    
    public Note findNote(Long id){
        Optional<Note> note = notesRepo.findById(id);
        Note theNote = null;
        
        if(!note.isEmpty()){
            theNote = note.get();
        }else{
            // Throw an exception
        }
        return theNote;
    }
    
    public Note updateNote(Note note, Long id){
        Optional<Note> theNote = notesRepo.findById(id);
        Note updatedNote = null;

        if(!theNote.isEmpty()){
            updatedNote = notesRepo.save(note);
        }else {
            // Throw an exception
        } 
        return updatedNote;
        
    }
    
    public Note deleteNote(Long id){
        Optional<Note> note = notesRepo.findById(id);

        if(!note.isEmpty()){
            notesRepo.delete(note.get());
        }
        else{
            // Throw an exception
        }
        return note.get();
    }

}
