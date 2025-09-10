package com.letapata.notes_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.letapata.notes_management_system.entities.Note;

@Repository
public interface NotesRepository extends JpaRepository<Note,Long>{
    public List<Note> findByUserId(Long id);
}
