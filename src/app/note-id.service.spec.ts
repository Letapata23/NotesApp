import { TestBed } from '@angular/core/testing';

import { NoteIdService } from './note-id.service';

describe('NoteIdService', () => {
  let service: NoteIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
