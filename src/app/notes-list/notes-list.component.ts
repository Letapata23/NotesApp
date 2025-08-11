import { Component, inject } from '@angular/core';
import { NoteDTO } from '../DTO/note-dto';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  standalone:true,
  imports: [NgFor,RouterLink,RouterModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})

export class NotesListComponent implements OnInit{
  notesList:NoteDTO[] = [];
  router:Router = inject(Router)

  constructor(private notesService:NotesService){
  }

  ngOnInit(){
    this.notesService.getNotes().subscribe(notes => {
      this.notesList = notes
      console.log(this.notesList)
    })
  }

  trackByNoteId(index:number,note:any):any{
    return note.id;
  }

  showContent(title:string,text:string){
    alert(`Title: ${title} '\n' Text: ${text}`)
  }

  showAddForm(){
    this.router.navigateByUrl("/add-notes-component")
  }
}
