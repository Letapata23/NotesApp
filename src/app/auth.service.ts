import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url:string = "http://localhost:8080/auth"

  constructor(private httpClient:HttpClient) { }

  login(username:string,password:string){
    return this.httpClient.post(`${this.url}/login`,{username,password},{withCredentials:true})
  }

  logout(){
    this.httpClient.post(`${this.url}/logout`,{},{withCredentials:true})
  }

}
