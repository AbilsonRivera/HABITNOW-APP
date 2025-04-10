import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, NavController } from '@ionic/angular'; // Añadido NavController
import { CommonModule } from '@angular/common';
import { NoteService, Note } from './note.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage {
  note: Note = { title: '', content: '' };
  notes: Note[] = [];

  constructor(
    private noteService: NoteService,
    private alertController: AlertController,
    private navCtrl: NavController // Añadido NavController
  ) {
    this.notes = this.noteService.getNotes();
  }

  saveNote() {
    if (this.note.title && this.note.content) {
      this.noteService.saveNote(this.note);
      this.notes = this.noteService.getNotes();
      this.note = { title: '', content: '' };
    }
  }

  clearAll() {
    this.noteService.clearNotes();
    this.notes = [];
  }

  async confirmDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar Nota',
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.noteService.deleteNote(index);
            this.notes = this.noteService.getNotes();
          }
        }
      ]
    });

    await alert.present();
  }
}