import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { AppService } from './app.service';
import { ChildComponent } from './child/child.component';

@Component({
    selector: 'app-root',
    imports: [ChildComponent],
    template: `
    <h1>Hello, {{ title }}</h1>
    <div>
      <p id="value">Value: {{ appService.value() }}</p>
      <button id="increase" (click)="increase(1)">Add 1</button>
      <button id="increase2" (click)="increase(2)">Add 2</button>
      <button id="decrease" (click)="decrease(1)">Decrease</button>
      <button id="decrease2" (click)="decrease(2)">Decrease 2</button>
      <button id="reset" (click)="reset()">Reset</button>  
      <app-child [count]="appService.value()" />
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
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
