import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { navLinks } from './app.routes';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <h3>The demos throws an error when the value is 5.</h3>
    <app-navbar [navLinks]="navLinks" />
    <router-outlet />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
  name = 'iTHome Ironman 2024 day 35';
  description = 'Use rejectErrors to throw error in toSignal';
  navLinks = navLinks;
}
