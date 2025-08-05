package com.letapata.notes_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.letapata.notes_management_system.model.Note;

@Repository
public interface NotesRepository extends JpaRepository<Note,Long>{
}
