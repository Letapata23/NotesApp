import { Injectable } from '@angular/core';
import { AccountDto } from './DTO/account-dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateAccountService {

  private url = "http://localhost:8080/accounts"

  constructor(private httpClient:HttpClient) {}

  createAccount(accountDto:AccountDto):Observable<AccountDto>{
    return this.httpClient.post<AccountDto>(this.url,accountDto)
  }



}
