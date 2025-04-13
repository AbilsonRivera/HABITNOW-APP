import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Añade ActivatedRoute
import { NotesService } from '../notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Añade la interfaz Note (o impórtala desde donde esté definida)
interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.page.html',
  styleUrls: ['./add-note.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class AddNotePage {
  categories: string[] = [];
  note: Note = {
    id: '',
    title: '',
    content: '',
    category: '',
    createdAt: new Date()
  };
  isEditing = false;

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories = this.notesService.getCategories();
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['noteToEdit']) {
      this.note = { ...navigation.extras.state['noteToEdit'] };
      this.isEditing = true;
    }
  }

  saveNote() {
    if (this.note.title && this.note.category) {
      if (this.isEditing) {
        this.notesService.updateNote(this.note);
      } else {
        this.notesService.addNote({
          title: this.note.title,
          content: this.note.content,
          category: this.note.category
        });
      }
      this.router.navigate(['/notes']);
    }
  }
}