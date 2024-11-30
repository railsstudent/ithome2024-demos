import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <app-navbar />
    <router-outlet />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
  name = 'iTHome Ironman 2024 day 34';
  description = 'Use requiredSync in toSignal';
}
