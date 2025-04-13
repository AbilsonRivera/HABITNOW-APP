import { Injectable } from '@angular/core';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly NOTES_KEY = 'habitnow_notes';
  private readonly CATEGORIES_KEY = 'habitnow_categories';

  constructor() {}

  // Métodos para categorías
  getCategories(): string[] {
    const categories = localStorage.getItem(this.CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [];
  }

  addCategory(category: string): void {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      this.saveCategories(categories);
    }
  }

  private saveCategories(categories: string[]): void {
    localStorage.setItem(this.CATEGORIES_KEY, JSON.stringify(categories));
  }

  // Métodos para notas
  getNotesByCategory(category: string): Note[] {
    const allNotes = this.getAllNotes();
    return category === 'Todas' 
      ? allNotes 
      : allNotes.filter(note => note.category === category);
  }

  addNote(note: Omit<Note, 'id' | 'createdAt'>): void {
    const notes = this.getAllNotes();
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    localStorage.setItem(this.NOTES_KEY, JSON.stringify([...notes, newNote]));
  }

  deleteNote(noteId: string): void {
    const notes = this.getAllNotes();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(updatedNotes));
  }

  private getAllNotes(): Note[] {
    const notes = localStorage.getItem(this.NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  }

  updateNote(updatedNote: Note): void {
    const notes = this.getAllNotes();
    const index = notes.findIndex(n => n.id === updatedNote.id);
    if (index !== -1) {
      notes[index] = updatedNote;
      localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
    }
  }
}