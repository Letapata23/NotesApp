import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Note } from '../notes';
import { notes } from '../notes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {

  notes:Note[] = notes;
  router:Router = inject(Router)

  formGroup = new FormGroup({
    title:new FormControl('',Validators.required),
    text:new FormControl('',Validators.required),
  })

  addNote(){
    var noteIds = notes.map(note => note.id)
    console.log("executing addNote, noteIds:" + noteIds)

    if(this.formGroup.valid){
      let maxId = 0;
      if(noteIds.length > 0){
        maxId = Math.max(...noteIds)
        console.log("maximum id is" + " " + maxId)
      }
      var note:Note = {
        id:maxId + 1,
        title: <string> this.formGroup.value.title ?? '',
        text:<string>this.formGroup.value.text ?? '',
      }

      console.log("the newly created note: " + note.id + " " + note.title )
        // Add the note to th/e list of notes
        notes.unshift(note) // Adds the note at the beginning of the notes list
        this.formGroup.reset()
        this.router.navigateByUrl("")
    }
  }

}
