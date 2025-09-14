import { Component} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { NotesService } from '../notes.service';
import { NoteCreationDTO } from '../DTO/note-creation-dto';
import { NoteDTO } from '../DTO/note-dto';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})

export class AddNoteComponent{

  notes:NoteDTO[] = [];
  router:Router = inject(Router)

  constructor(private noteService:NotesService){}

  formGroup = new FormGroup({
    title:new FormControl('',Validators.required),
    text:new FormControl('',Validators.required),
  })

  addNote(){

    if(this.formGroup.valid){
      
      var note:NoteCreationDTO = {
        title: <string> this.formGroup.value.title ?? '',
        text:<string>this.formGroup.value.text ?? '',
      }

      console.log("the newly created note: " + note.text + " " + note.title )
        // Add the note to th/e list of notes
        this.noteService.createNote(note).subscribe(note => {
          console.log("The note is: " + "" + note.text + " " + note.title)
          this.formGroup.reset()
          this.router.navigateByUrl("/main/notes-list")
        }) 
        
    }
  }

}
