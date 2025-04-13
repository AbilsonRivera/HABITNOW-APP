import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CategoriesPage implements OnInit {
  categories: string[] = [];
  editingIndex: number | null = null;
  editedCategory = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ionViewDidEnter() {
    this.loadCategories();
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoriesService.getCategories();
  }

  startEditing(index: number) {
    this.editingIndex = index;
    this.editedCategory = this.categories[index];
  }

  saveEdit() {
    if (this.editingIndex !== null && this.editedCategory.trim()) {
      const oldCategory = this.categories[this.editingIndex];
      this.categoriesService.updateCategory(oldCategory, this.editedCategory.trim());
      this.cancelEditing();
      this.loadCategories();
    }
  }

  cancelEditing() {
    this.editingIndex = null;
    this.editedCategory = '';
  }

  async confirmDelete(category: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Eliminar la categoría "${category}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.categoriesService.deleteCategory(category);
            this.loadCategories();
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToAddCategory() {
    this.router.navigate(['/categories/add']);
  }
}