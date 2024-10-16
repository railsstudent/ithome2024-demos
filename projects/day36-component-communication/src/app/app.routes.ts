import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'input-output',
    loadComponent: () => import('./communication/components/app-input-output.component'),
    data: {
      secretValue: 'my-secret',
    }
  },
  {
    path: 'signal-in-service',
    loadComponent: () => import('./communication/components/app-signal-in-service.component'),
  },
  {
    path: 'provide-inject',
    loadComponent: () => import('./communication/components/app-provide-inject.component'),
  },
  {
    path: 'signal-state',
    loadComponent: () => import('./communication/components/app-signal-state.component'),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/input-output',
  },
  {
    path: '**',
    redirectTo: '/input-output',
  }
];

export const navLinks = [
  {
    link: 'Communication using inputs and outputs',
    path: ['input-output'],
  },
  {
    link: 'Signals in a service',
    path: ['signal-in-service'],
  },
  {
    link: 'Provide and inject signals',
    path: ['provide-inject'],
  },
  {
    link: 'Use Signal State',
    path: ['signal-state'],
  },
]
