import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from '../notes.service';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NoteIdService } from '../note-id.service';

@Component({
  selector: 'app-note-update',
  imports: [FormsModule],
  template: `
    <form #updateForm = "ngForm" (ngSubmit) = "updateNote()">
      <label for="title"> Title:
        <input required name="id" id="title" type="text" [(ngModel)]="title"/>
      </label> <br/>
      <label for="text"> Text:
        <input required name="id" id="text" type="text" [(ngModel)]="text"/>
      </label> <br/>
      <button type="submit" [disabled]="!updateForm.form.valid">Update</button>
    </form>
  `,
  styleUrl: './note-update.component.css'
})

export class NoteUpdateComponent implements OnInit{
  router:Router = inject(Router)
  activeRoute:ActivatedRoute = inject(ActivatedRoute)
  id:number = 0
  title:string = ""
  text:string = ""


  constructor(private notesService:NotesService,private noteIdService:NoteIdService){}

  ngOnInit(): void {
      this.id = this.noteIdService.getIdSubject()
  }
  updateNote(){
    let note = {id:this.id,title:this.title,text:this.text}

    console.log("The retrieved id:" + this.id)

    this.notesService.updateNote(note,note.id).subscribe(note => {
      console.log("The updated note is:" + note)
    })

    this.router.navigateByUrl("")
  }

}
