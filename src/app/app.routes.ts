import { Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';

export const routes: Routes = [{path:"",component:NotesListComponent},
                               {path:"add-notes-component", component:AddNoteComponent},
                               {path:"note/:id",component:ShowNoteComponent},
];
