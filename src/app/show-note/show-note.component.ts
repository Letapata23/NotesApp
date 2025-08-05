import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Note } from '../notes';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-show-note',
  imports: [RouterModule],
  template: `
    <div>
        <ul>
            <li>{{note.title}}</li>
            <li>{{note.text}}</li>
        </ul>
    </div>
    <button (click) = "deleteNote()">Delete</button>
  `,
  styleUrl: './show-note.component.css'
})
export class ShowNoteComponent implements OnInit{
  activeRoute:ActivatedRoute 
  notes:Note[] 
  id:number 
  note:Note 
  router:Router

  constructor(private notesService:NotesService){
    this.activeRoute = inject(ActivatedRoute)
    this.note={id:undefined,title:"",text:""}
    this.notes = []
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.router = inject(Router)
  }

  ngOnInit(){
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
