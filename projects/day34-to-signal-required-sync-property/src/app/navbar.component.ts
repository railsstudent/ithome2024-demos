import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul style="display: flex;">
        <li>
          <a routerLinkActive='active' routerLink='starWar'>Star War Home</a>
        </li>
        <li>
          <a routerLinkActive='active' routerLink='requireSync-example'>toSignal RequireSync Example</a>
        </li>
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
}
