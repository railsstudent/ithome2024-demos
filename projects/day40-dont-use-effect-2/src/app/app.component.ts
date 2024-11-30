import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { CharacterComponent } from './star-war/character.component';

@Component({
    selector: 'app-root',
    imports: [CharacterComponent],
    template: `
      <h1>Angular Version {{ version }} - {{ name }}!</h1>
      <app-character />
    `,
    styles: `
      h1 {
        padding-top: 1rem;
        padding-left: 1rem;
      }
    
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  name = 'ithome Ironman 2024 Day 40';
}
