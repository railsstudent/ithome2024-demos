import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'starWar',
    loadComponent: () => import('./starwar/starwar-home.component'),
  },
  {
    path: 'requireSync-example',
    loadComponent: () => import('./require-sync/example.component'),
    data: {
      btnValues: [-5, -3, 1, 2, 4]
    }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/starWar',
  },
  {
    path: '**',
    redirectTo: '/starWar',
  }
];
