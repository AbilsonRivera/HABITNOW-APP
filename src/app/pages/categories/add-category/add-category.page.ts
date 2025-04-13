import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class AddCategoryPage {
  category = '';
  isEditing = false;
  originalCategory = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  async saveCategory() {
    if (this.category.trim()) {
      if (this.isEditing) {
        await this.categoriesService.updateCategory(this.originalCategory, this.category.trim());
      } else {
        await this.categoriesService.addCategory(this.category.trim());
      }
      
      // Navega a categories y fuerza recarga
      this.router.navigate(['/categories'], {
        state: { refresh: true }
      });
    }
  }
}