package com.letapata.notes_management_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.letapata.notes_management_system.dto.AccountDto;
import com.letapata.notes_management_system.entities.UserAccount;
import com.letapata.notes_management_system.repository.AccountRepository;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepo;

    public Optional<AccountDto> createAccount(AccountDto accountDto){

        List<UserAccount> accounts = accountRepo.findAll();
        boolean usernameFound = false;
        UserAccount newAccount = new UserAccount();
        Optional<AccountDto> creationResult = Optional.empty();

        for(UserAccount acc:accounts){
            if(acc.getUsername().equalsIgnoreCase(accountDto.getUsername())){
                usernameFound = true;
            }
        }

        // Create account if the username does not exist
        if(usernameFound != true){
            newAccount.setUsername(accountDto.getUsername());
            newAccount.setPassword(accountDto.getPassword());
            newAccount.setEmail(accountDto.getEmail());
            accountRepo.save(newAccount);
            creationResult = Optional.of(accountDto);
        }

        return creationResult;
    }

    public boolean login(AccountDto accountDto){
        List<UserAccount> accounts =  accountRepo.findAll();
        boolean credentialsCorrect = false;

        for(UserAccount account:accounts){
            
            if(accountDto.getUsername().equalsIgnoreCase(account.getUsername())){
                if(accountDto.getPassword().equalsIgnoreCase(account.getPassword())){
                    credentialsCorrect = true;
                }
            }
        }
        return credentialsCorrect;
    }
    
}
