import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { StarWarComponent } from './star-war.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StarWarComponent],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <h2>Angular {{ version }} - {{ description }}</h2>
    <app-star-war [jedi]="1" [sith]="4" rgbTuple="yellow" />
    <app-star-war [jedi]="10" [sith]="44" starShip="Jedi starfighter" [rgbTuple]="lightBlue" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  name = 'iTHome Ironman 2024 day 33';
  description = 'Pass manual injector to toSignal';
  lightBlue = [137, 207, 240] as [number, number, number];

  // sith 67, 44, 4, 21
  // jedi 1, 20, 10, 51, 32, 11, 53, 52
}
