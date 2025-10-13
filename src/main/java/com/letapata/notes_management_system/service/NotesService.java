package com.letapata.notes_management_system.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.letapata.notes_management_system.dto.NoteCreationDTO;
import com.letapata.notes_management_system.dto.NoteDTO;
import com.letapata.notes_management_system.dto.NoteUpdateDTO;
import com.letapata.notes_management_system.entities.Note;
import com.letapata.notes_management_system.entities.UserAccount;
import com.letapata.notes_management_system.repository.AccountRepository;
import com.letapata.notes_management_system.repository.NotesRepository;

@Service
public class NotesService {

    @Autowired // Automatically inject the NotesRepository
    private NotesRepository notesRepo;

    @Autowired
    private AccountRepository accountRepo;

    private final SimpMessagingTemplate messagingTemplate;
    
    
    @Autowired
    public NotesService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public NoteDTO createNote(NoteCreationDTO note,Long userId){
        // Create Note object
        Note createdNote = new Note();

        UserAccount userAccount = accountRepo.findById(userId).get();

        // Transfer data from DTO to Note Entity
        createdNote.setTitle(note.getTitle());
        createdNote.setText(note.getText());

        // Set the note's user account
        createdNote.setUser(userAccount);

        // Create NoteCreationDTO to be returned
        NoteDTO createdNoteDTO = new NoteDTO();
        createdNoteDTO.setId(createdNote.getId());
        createdNoteDTO.setText(note.getText());
        createdNoteDTO.setTitle(note.getTitle());
        
        // Save the Note Entity
        notesRepo.save(createdNote);

        System.out.println("Sending WebSocket message for ADD");
        messagingTemplate.convertAndSend("/topic/notes", "ADD");
        
        // Return the NoteCreationDTO
        return createdNoteDTO;
    }
    
    public List<NoteDTO> findAllNotes(){
        List<Note> notes = notesRepo.findAll();

        // Convert the list of Note entities to list of NoteDTO
        List<NoteDTO> noteDtoList = notes.stream().
                                            map(note -> new NoteDTO(note.getId(),note.getTitle(),note.getText())).
                                            collect(Collectors.toList());
        //messagingTemplate.convertAndSend("/topic/notes", "REFRESH");
        return noteDtoList;
    }
    
    public NoteDTO findNote(Long id){
        Optional<Note> note = notesRepo.findById(id);
        NoteDTO noteDto = new NoteDTO();
        
        if(note.isPresent()){
            // Retrieve note entity
            Note retrievedNote = note.get();

            // Prepare note data object for the controller
            noteDto.setId(retrievedNote.getId());
            noteDto.setText(retrievedNote.getText());
            noteDto.setTitle(retrievedNote.getTitle());
        
            return noteDto;
        }else{
            // Throw an exception
            throw new IllegalArgumentException("Note with id " + id + " does not exist!");
        }
  
    }
    
    public NoteUpdateDTO updateNote(NoteUpdateDTO note, Long id){
        Optional<Note> theNote = notesRepo.findById(id);

        if(theNote.isPresent()){
            // Create the updated entity
            Note updatedNote = theNote.get();

            if(!note.getTitle().equals("")){
                updatedNote.setTitle(note.getTitle());
            }

            if(!note.getText().equals("")){
                updatedNote.setText(note.getText());}
            
            notesRepo.save(updatedNote);

            // Prepare the NoteUpdateDTO
            NoteUpdateDTO updatedNoteDto = new NoteUpdateDTO();
            updatedNoteDto.setText(updatedNote.getText());
            updatedNoteDto.setText(updatedNote.getTitle());
            
            System.out.print("Sending WebSocket message for Update");
            messagingTemplate.convertAndSend("/topic/notes", "UPDATE");
                
                
            return updatedNoteDto;
        }else {
            // Throw an exception
            throw new IllegalArgumentException("The note with id " + id + "does not exist");
        } 
    }
    
    public NoteDTO deleteNote(Long id){
        Optional<Note> note = notesRepo.findById(id);

        if(!note.isEmpty()){
            notesRepo.delete(note.get());

            // Create NoteDTO to return to controller
            NoteDTO deletedNoteDto = new NoteDTO();
            deletedNoteDto.setId(note.get().getId());
            deletedNoteDto.setText(note.get().getText());
            deletedNoteDto.setTitle(note.get().getTitle());

            messagingTemplate.convertAndSend("/topic/notes", "REFRESH");
            return deletedNoteDto;
        }
        else{
            // Throw an exception
            throw new IllegalArgumentException("The note with id " + id + "does not exist");
        }
    }

    public List<NoteDTO> findNotesByUserId(Long userId){
        List<NoteDTO> notes = notesRepo.findByUserId(userId).stream().
                                            map(note -> new NoteDTO(note.getId(),note.getTitle(),note.getText())).
                                            collect(Collectors.toList());
        
        return notes;
    }

}
