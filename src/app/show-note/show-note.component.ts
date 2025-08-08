import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Note } from '../notes';
import { NotesService } from '../notes.service';
import { RouterLink } from '@angular/router';
import { NoteIdService } from '../note-id.service';

@Component({
  selector: 'app-show-note',
  imports: [RouterModule,RouterLink],
  template: `
        <div id="note-detail-section">
            <h1 id="note-title">{{note.title}}</h1>
            <p id="note-text">{{note.text}}</p>
        </div>
    <button class="button" (click) = "deleteNote()">Delete</button>
    <button class="button" routerLink="/note-update">Update</button>
  `,
  styleUrl: '../../styles.css'
})

export class ShowNoteComponent implements OnInit{
  activeRoute:ActivatedRoute 
  notes:Note[] 
  id:number 
  note:Note 
  router:Router

  constructor(private notesService:NotesService,private noteIdService:NoteIdService){
    this.activeRoute = inject(ActivatedRoute)
    this.note={id:undefined,title:"",text:""}
    this.notes = []
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.router = inject(Router)
  }

  ngOnInit(){
    this.noteIdService.setIdSubject(this.id)
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes
      this.note = <Note>notes.find((note) => note.id === this.id)
    })
  }

  deleteNote(){
    this.notesService.deleteNote(this.id).subscribe(note => {
      console.log("Deleted note:" + note)
    })
    this.router.navigateByUrl('')
  }
  
}
