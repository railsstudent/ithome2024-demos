import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, catchError, of, scan, concatMap, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catch-error',
  standalone: true,
  template: `
    <h3>The catchError operator catches the error and returns -5. Clicks the buttons to display the next value.</h3>
    <div>
      <p>total: {{ total() }}</p>
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
export default class CatchErrorComponent {
  something = new BehaviorSubject(0);

  total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    concatMap((v) => {
      if (v === 5) {
        return throwError(() => new Error('throw an error')).pipe(
          catchError((e) => {
            console.error(e);
            return of(-5);
          })
        )
      }
      return of(v);
    }),
  )

  total = toSignal(this.total$, { initialValue: 0 });
}
