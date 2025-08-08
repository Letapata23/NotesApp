import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteIdService {
  noteIdSubject = new BehaviorSubject<number>(0) // Create and initialize the behavioursubject object
  noteIdSubject$ = this.noteIdSubject.asObservable()

  setIdSubject(id:number){
    this.noteIdSubject.next(id)
  }

  getIdSubject():number{
    return this.noteIdSubject.getValue()
  }

}
