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
    return this.httpClient.get<NoteDTO[]>(this.url,{withCredentials:true})
  }

  getNote(id:number):Observable<NoteDTO>{
    return this.httpClient.get<NoteDTO>(`${this.url}/${id}`,{withCredentials:true})
  }

  createNote(note:NoteCreationDTO):Observable<NoteCreationDTO>{
    return this.httpClient.post<NoteCreationDTO>(this.url,note,{withCredentials:true})
  }

  updateNote(note:NoteUpdateDTO,id:number):Observable<NoteUpdateDTO>{
    return this.httpClient.put<NoteUpdateDTO>(`${this.url}/${id}`, note,{withCredentials:true})
  }

  deleteNote(id:number):Observable<NoteDTO>{
    return this.httpClient.delete<NoteDTO>(`${this.url}/${id}`,{withCredentials:true})
  }
}
