import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from './notes.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular/standalone';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    FormsModule
  ]
})
export class NotesPage {
  categories: string[] = [];
  selectedCategory = 'Todas';
  searchQuery = '';
  
  constructor(
    private notesService: NotesService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.categories = ['Todas', ...this.notesService.getCategories()];
  }

  get filteredNotes() {
    let notes = this.notesService.getNotesByCategory(this.selectedCategory);
    
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      notes = notes.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
    }
    
    return notes;
  }

  async confirmDelete(noteId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteNote(noteId);
          }
        }
      ]
    });

    await alert.present();
  }

  private deleteNote(noteId: string) {
    this.notesService.deleteNote(noteId);
    this.showToast('Nota eliminada correctamente');
    // No necesitamos actualizar filteredNotes porque es un getter que se recalcula automáticamente
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  navigateToEditNote(note: Note) {
    this.router.navigate(['/notes/add-note'], {
      state: { noteToEdit: note }
    });
  }

  navigateToAddNote() {
    this.router.navigate(['/notes/add-note']);
  }
}