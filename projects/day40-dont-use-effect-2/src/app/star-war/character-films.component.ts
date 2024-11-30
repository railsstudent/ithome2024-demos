import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-character-films',
  standalone: true,
  template: `
    <p style="text-decoration: underline">Films</p>
    @for(film of films(); track film) {
        <ul style="padding-left: 1rem;">
          <li>{{ film }}</li>
        </ul>
    } @empty {
        <p>No film</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterFilmsComponent {
    films = input<string[]>([]);
}
