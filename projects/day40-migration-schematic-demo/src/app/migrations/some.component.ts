import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-some',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Use Input and Output decorators</h2>
    <div>
      <p>bgColor: {{ bgColor }}</p>
      <p>name: {{ name }}</p>
      @let n = numSub.getValue();
      <p>num: {{ n }}</p>
      <div>
        Num: <input type="number" [ngModel]="n" (ngModelChange)="numSub.next($event)" />
      </div>
      <button (click)="triple.emit(n * 3)" >Show triple in the parent</button>
      <button (click)="powerXBy3.emit(n * n * n)" >Show cube in the parent</button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomeComponent {
  @Input({ required: true, alias: 'backgroundColor'}) bgColor!: string; 
  @Input({ transform: (x: string) => x.toLocaleUpperCase() }) name: string = 'input decorator';

  @Output() triple = new EventEmitter<number>();
  @Output('cube') powerXBy3 = new EventEmitter<number>();

  numSub = new BehaviorSubject<number>(2);  
  @Output() double = this.numSub.pipe(map((n) => n * 2));
}
