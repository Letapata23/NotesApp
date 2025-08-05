import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Note } from './notes';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private url = "http://localhost:8080/notes"
  constructor(private httpClient:HttpClient) { }

  getNotes():Observable<Note[]>{
    return this.httpClient.get<Note[]>(this.url)
  }

  getNote(id:number):Observable<Note>{
    return this.httpClient.get<Note>(`${this.url}/${id}`)
  }

  createNote(note:Note):Observable<Note>{
    return this.httpClient.post<Note>(this.url,note)
  }

  updateNote(note:Note,id:number):Observable<Note>{
    return this.httpClient.put<Note>(`${this.url}/${id}`, note)
  }

  deleteNote(id:number):Observable<Note>{
    return this.httpClient.delete<Note>(`${this.url}/${id}`)
  }
}
