package com.letapata.notes_management_system.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import com.letapata.notes_management_system.dto.AccountDto;
import com.letapata.notes_management_system.service.AccountService;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/accounts")
@CrossOrigin(origins="http://localhost:4200/")
public class AccountController {
    @Autowired
    AccountService accService;

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody AccountDto accountDto){
        Optional<AccountDto> creationResult = accService.createAccount(accountDto);

        if(creationResult.isPresent()){
            return ResponseEntity.ok(creationResult.get());
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
    }

}
