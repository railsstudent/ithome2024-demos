import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, scan, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-async-pipe-error',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>AsyncPipe displays the last good value after an error is thrown.</h3>
    <div>
      <p>total: {{ total$ | async }}</p>
    </div>
    <button (click)="something.next(1)">Add</button>
    <button (click)="something.next(-1)">Subtract</button>
  `,
  styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AsyncPipeErrorComponent {
  something = new BehaviorSubject(0);

  total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      if (v === 5) {
        throw new Error('throw an async pipe error');
      }
      return v;
    }),
  );
}
