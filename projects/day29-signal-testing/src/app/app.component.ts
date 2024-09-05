import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello, {{ title }}</h1>
    <div>
      <p id="value">Value: {{ this.appService.value() }}</p>
      <button id="increase" (click)="increase(1)">Add 1</button>
      <button id="increase2" (click)="increase(2)">Add 2</button>
      <button id="decrease" (click)="decrease(1)">Decrease</button>
      <button id="decrease2" (click)="decrease(2)">Decrease 2</button>
      <button id="reset" (click)="reset()">Reset</button>  
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'day29-signal-testing';

  appService = inject(AppService);

  constructor() {
    effect(() => this.appService.log());
  }

  increase(num = 1) {
    this.appService.increase(num);
  }

  decrease(num = 1) {
    this.appService.decrease(num);
  }

  reset() {
    this.appService.reset();
  }
}
