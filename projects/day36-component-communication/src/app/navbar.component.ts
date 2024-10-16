import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul style="display: flex;">
        @for (route of navLinks(); track $index) {
          <li>
            <a routerLinkActive='active' [routerLink]="route.path">{{ route.link }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    .active {
      font-weight: bold;
      color: darksalmon;
    }

    li {
      margin-right: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  navLinks = input.required<{ link: string; path: string[] }[]>();
}
