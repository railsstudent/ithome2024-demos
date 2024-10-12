import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Injector, input, OnChanges, Signal } from '@angular/core';
import { StarWarService } from './star-war.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StarWarPersonComponent } from './star-war-person.component';
import { RgbType, validateRGB } from '../rgb';
import { Person } from './person.type';

@Component({
  selector: 'app-star-war',
  standalone: true,
  imports: [NgStyle, StarWarPersonComponent],
  template: `
    <h3>Star War Jedi vs Sith</h3>
    <div [ngStyle]="rgbs()">
      <div style="display: flex; justify-content: space-between;">
        <p>Jedi Id: {{ jedi() }}</p>
        <p>Sith Id: {{ sith() }}</p>
        <p>Star ship: {{ ship() }}</p>
      </div>
      <app-star-war-person [person]="light()" kind="Jedi Fighter" />
      <app-star-war-person [person]="evil()" kind="Sith Lord" />
    </div>
  `,
  styles: `
    div {
      border: 1px solid black;
      border-radius: 0.25rem;
      padding : 0.3rem;
      margin-bottom: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarComponent implements OnChanges {
  // required signal input
  jedi = input.required<number>();

  // required signal input
  sith = input.required<number>();

  // signal input with alias
  ship = input('Star Destroyer', { alias: 'starShip' })

  // signal input with transform
  rgbs = input.required({
    alias: 'rgbTuple',
    transform: (v: RgbType) => ({ backgroundColor: validateRGB(v) })
  });

  starWarService = inject(StarWarService);
  injector = inject(Injector);
  light!: Signal<Person>;
  evil!: Signal<Person>;

  ngOnChanges(): void {
    console.log('ngOnChanges fired');
    this.light = toSignal(this.starWarService.getData(this.jedi()), {
      injector: this.injector,
      requireSync: true,
    });

    this.evil = toSignal(this.starWarService.getData(this.sith()), { 
      injector: this.injector,
      requireSync: true 
    });
  }
}
