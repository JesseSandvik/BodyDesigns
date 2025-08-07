import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
        { path: 'artists', loadComponent: () => import('./features/artists/artists.component').then(m => m.ArtistsComponent) },
        { path: '**', redirectTo: '' }
    ]
  }
];