import { Component, inject, OnDestroy } from '@angular/core';
import { NoteDTO } from '../DTO/note-dto';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { WebSocketService } from '../web-socket.service';
import { NgZone } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  standalone:true,
  imports: [NgFor,RouterLink,RouterModule],
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css'
})

export class NotesListComponent implements OnInit, OnDestroy{
  notesList:NoteDTO[] = [];
  router:Router = inject(Router)
  private refreshSub?:Subscription

  constructor(private notesService:NotesService,
              private webSocketService: WebSocketService,
              private ngZone: NgZone
  ){
  }

  ngOnInit(){
    this.loadNotes()

    // Connect to WebSocket
    this.webSocketService.connect('/topic/notes',(message) => {
      console.log('WebSocket message received:', message);
    })

    // Subscribe to refresh events
    this.refreshSub = this.webSocketService.noteRefresh$.subscribe(() => {
      console.log("Refresh event triggered, reloading notes")
      this.loadNotes()
    })
  }

  loadNotes(){
    this.notesService.getNotes().subscribe((notes) => {
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

  ngOnDestroy(){ // Close off any connection to external resources
    //this.webSocketService.disconnect()
    this.refreshSub?.unsubscribe()
  }
}
