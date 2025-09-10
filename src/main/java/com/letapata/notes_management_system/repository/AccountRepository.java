package com.letapata.notes_management_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.letapata.notes_management_system.entities.UserAccount;

@Repository
public interface AccountRepository extends JpaRepository<UserAccount,Long>{
    public UserAccount findByUsername(String username);
}
