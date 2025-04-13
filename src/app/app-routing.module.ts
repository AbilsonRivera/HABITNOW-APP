import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'notes',
    loadComponent: () => import('./pages/notes/notes.page').then(m => m.NotesPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then(m => m.CategoriesPage)
  },
  {
    path: 'categories/add',
    loadComponent: () => import('./pages/categories/add-category/add-category.page').then(m => m.AddCategoryPage)
  },
  {
    path: 'notes/add-note',
    loadComponent: () => import('./pages/notes/add-note/add-note.page').then(m => m.AddNotePage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
