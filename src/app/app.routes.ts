import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
        { path: 'artists', loadComponent: () => import('./features/artists/artists.component').then(m => m.ArtistsComponent) },
        { path: 'gallery', loadComponent: () => import('./features/gallery/gallery.component').then(m => m.GalleryComponent) },
        { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
        { path: '**', redirectTo: '' }
    ]
  }
];