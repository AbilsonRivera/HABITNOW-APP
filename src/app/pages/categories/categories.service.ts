import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly STORAGE_KEY = 'habitnow_categories'; // <-- Correcto (con "T")

  constructor() {}

  getCategories(): string[] {
    const data = localStorage.getItem(this.STORAGE_KEY); // <-- Usando la constante correcta
    return data ? JSON.parse(data) : [];
  }

  addCategory(category: string): void {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      this.saveCategories(categories);
    }
  }

  updateCategory(oldCategory: string, newCategory: string): void {
    const categories = this.getCategories();
    const index = categories.indexOf(oldCategory);
    if (index !== -1) {
      categories[index] = newCategory;
      this.saveCategories(categories);
    }
  }

  deleteCategory(category: string): void {
    const categories = this.getCategories().filter(c => c !== category);
    this.saveCategories(categories);
  }

  private saveCategories(categories: string[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categories)); // <-- Corregido aquí
  }
}