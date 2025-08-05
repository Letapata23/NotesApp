import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Note } from '../notes';
//import { notes } from '../notes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})

export class AddNoteComponent{

  notes:Note[] = [];
  router:Router = inject(Router)

  constructor(private noteService:NotesService){}

  formGroup = new FormGroup({
    title:new FormControl('',Validators.required),
    text:new FormControl('',Validators.required),
  })

  addNote(){

    if(this.formGroup.valid){
      
      var note:Note = {
        id:undefined,
        title: <string> this.formGroup.value.title ?? '',
        text:<string>this.formGroup.value.text ?? '',
      }

      console.log("the newly created note: " + note.id + "" + note.text + " " + note.title )
        // Add the note to th/e list of notes
        this.noteService.createNote(note).subscribe(note => {
          console.log("The note is: " + note.id + "" + note.text + " " + note.title)
        }) // Adds the note at the beginning of the notes list
        this.formGroup.reset()
        this.router.navigateByUrl("")
    }
  }

}
