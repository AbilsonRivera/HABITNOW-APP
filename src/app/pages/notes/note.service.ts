import { Injectable } from '@angular/core';

export interface Note {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private storageKey = 'notes';

  getNotes(): Note[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  saveNote(note: Note): void {
    const notes = this.getNotes();
    notes.push(note);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  clearNotes(): void {
    localStorage.removeItem(this.storageKey);
  }

  deleteNote(index: number): void {
    const notes = this.getNotes();
    notes.splice(index, 1);
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }
}
