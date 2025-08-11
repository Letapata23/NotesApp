import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NoteDTO } from './DTO/note-dto';
import { NoteCreationDTO } from './DTO/note-creation-dto'; 
import { NoteUpdateDTO } from './DTO/note-update-dto';

@Injectable({
  providedIn: 'root'
})

export class NotesService {

  private url = "http://localhost:8080/notes"
  constructor(private httpClient:HttpClient) { }

  getNotes():Observable<NoteDTO[]>{
    return this.httpClient.get<NoteDTO[]>(this.url)
  }

  getNote(id:number):Observable<NoteDTO>{
    return this.httpClient.get<NoteDTO>(`${this.url}/${id}`)
  }

  createNote(note:NoteCreationDTO):Observable<NoteCreationDTO>{
    return this.httpClient.post<NoteCreationDTO>(this.url,note)
  }

  updateNote(note:NoteUpdateDTO,id:number):Observable<NoteUpdateDTO>{
    return this.httpClient.put<NoteUpdateDTO>(`${this.url}/${id}`, note)
  }

  deleteNote(id:number):Observable<NoteDTO>{
    return this.httpClient.delete<NoteDTO>(`${this.url}/${id}`)
  }
}
