import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { StarWarComponent } from './star-war.component';

@Component({
    selector: 'app-star-war-home',
    imports: [StarWarComponent],
    template: `
    <button (click)="toggle()">Toggle</button>
    <app-star-war [jedi]="jedi()" [sith]="sith()" rgbTuple="yellow" />
    <app-star-war [jedi]="10" [sith]="44" starShip="Jedi starfighter" [rgbTuple]="lightBlue" />
  `,
    styles: `
    div {
      border: 1px solid black;
      border-radius: 0.25rem;
      padding : 0.3rem;
      margin-bottom: 1rem;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class StarWarHomeComponent {
  lightBlue = [137, 207, 240] as [number, number, number];

  jedi = signal(1);
  sith = signal(4);

  toggle() {
    this.jedi.update((prev) => prev === 1 ? 20: 1);
    this.sith.update((prev) => prev === 4 ? 21 : 4);
  }

  // sith 67, 44, 4, 21
  // jedi 1, 20, 10, 51, 32, 11, 53, 52
}
