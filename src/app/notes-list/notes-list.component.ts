import { Component } from '@angular/core';
import { notes } from '../notes';
import { Note } from '../notes';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone:true,
  imports: [NgFor],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})

export class NotesListComponent {
  notesList:Note[] = notes;

  trackByNoteId(index:number,note:any):any{
    return note.id;
  }

  showContent(title:string,text:string){
    alert(`Title: ${title} '\n' Text: ${text}`)
  }
}
