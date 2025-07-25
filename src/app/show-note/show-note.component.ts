import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { notes } from '../notes';
import { Note } from '../notes';

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
  `,
  styleUrl: './show-note.component.css'
})
export class ShowNoteComponent {
  activeRoute:ActivatedRoute 
  notes:Note[] 
  id:number 
  note:Note 

  constructor(){
    this.activeRoute = inject(ActivatedRoute)
    this.notes = notes
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.note = notes.find((note) => note.id === this.id)!
  }
  
}
