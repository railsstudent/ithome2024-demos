import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-requireSync-example',
  standalone: true,
  template: `
    <div>
      @for (v of btnValues(); track v) {
        <button (click)="update(v)">{{ v }}</button>
      }
    </div>
    <div>
      <p>total: {{ total() }}</p>
      <p>source: {{ source.getValue() }}</p>
      <p>sum: {{ sum() }}</p>
    </div>
    <button (click)="changeArray()">Update the BehaviorSubject</button>
  `,
  styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExampleComponent {
  btnValues = input.required<number[]>();
  something = new BehaviorSubject(0);
  total = toSignal(this.something, { requireSync: true });

  source = new BehaviorSubject([1,2,3,4,5]);
  sum = toSignal(
    this.source.pipe(map((values) => values.reduce((acc, v) => acc + v, 0))), { requireSync: true });

  update(v: number) {
    this.something.next(this.something.getValue() + v);
  }

  changeArray() {
    const values = this.source.getValue().length <= 5 ? [11,12,13,14,15,16,17,18] : [1,2,3,4,5];
    this.source.next(values);
  }
}
