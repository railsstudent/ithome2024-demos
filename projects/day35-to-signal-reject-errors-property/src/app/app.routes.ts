import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'catch-error',
    loadComponent: () => import('./catch-error/catch-error.component'),
  },
  {
    path: 'async-pipe-error',
    loadComponent: () => import('./async-pipe-error/async-pipe-error.component'),
  },
  {
    path: 'reject-errors',
    loadComponent: () => import('./reject-errors/reject-errors.component'),
  },
  {
    path: 'default-errors',
    loadComponent: () => import('./reject-errors/default-errors.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/catch-error',
  },
  {
    path: '**',
    redirectTo: '/catch-error',
  }
];

export const navLinks = [
  {
    link: 'toSignal Default Errors Example',
    path: ['default-errors'],
  },
  {
    link: 'Async Pipe Error Example',
    path: ['async-pipe-error'],
  },
  {
    link: 'toSignal RejectErrors: true Example',
    path: ['reject-errors'],
  },
  {
    link: 'CatchError example',
    path: ['catch-error'],
  },
]
