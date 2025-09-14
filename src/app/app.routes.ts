import { Routes } from '@angular/router';
import { NotesListComponent } from './notes-list/notes-list.component';
import { AddNoteComponent } from './add-note/add-note.component';
import { ShowNoteComponent } from './show-note/show-note.component';
import { NoteUpdateComponent } from './note-update/note-update.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { CreateAccountComponentComponent } from './create-account-component/create-account-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MainComponent } from './main-component/main.component';

export const routes: Routes = [
                               {path:"main",component:MainComponent,
                                children:[
                                {path:"add-notes-component", component:AddNoteComponent},
                                {path:"note/:id",component:ShowNoteComponent},
                                {path:"note-update",component:NoteUpdateComponent},
                                {path:"notes-list",component:NotesListComponent},
                                {path:"",redirectTo:"notes-list",pathMatch:"full"}]},
                                {path:"",component:HomeComponentComponent,
                                children:
                               [{path:"create-account",component:CreateAccountComponentComponent},
                                {path:"login",component:LoginComponentComponent},
                                {path:"",redirectTo:"create-account",pathMatch:"full"}]}
];
