import { outputFromObservable } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-some',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Use Input and Output decorators</h2>
    <div>
      <p>bgColor: {{ bgColor() }}</p>
      <p>name: {{ name() }}</p>
      @let n = num();
      <p>num: {{ n }}</p>
      <div>
        Num: <input type="number" [ngModel]="n" (ngModelChange)="updateNum($event)" />
      </div>
      <button (click)="triple.emit(n * 3)" >Show triple in the parent</button>
      <button (click)="powerXBy3.emit(n * n * n)" >Show cube in the parent</button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomeComponent {
  readonly bgColor = input.required<string>({ alias: "backgroundColor" }); 
  readonly name = input<string, string>('input decorator', { transform: (x: string) => x.toLocaleUpperCase() });

  readonly triple = output<number>();
  readonly powerXBy3 = output<number>({ alias: 'cube' });

  num = signal(2);
  double = output<number>();

  updateNum(value: number) {
    this.num.set(value); 
    this.double.emit(value * 2);
  }
}
