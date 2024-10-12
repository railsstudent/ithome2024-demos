import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { BehaviorSubject, catchError, map, scan, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import ErrorDialogComponent from '../errors/error-dialog.component';

@Component({
  selector: 'app-reject-errors-example',
  standalone: true,
  imports: [ErrorDialogComponent],
  template: `
    <h3>toSignal has rejectErrors: true option and error is thrown back to RxJS to be captured as uncaught exception.</h3>
    <div>
      <p>total: {{ total() }}</p>
    </div>
    <button (click)="something.next(1)">Add</button>
    <button (click)="something.next(-1)">Subtract</button>
    <app-error-dialog (closeClicked)="this.errorDialog().close()">
      <p>Error Dialog only opens once.</p>
    </app-error-dialog>
  `,
  styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RejectErrorsComponent {
  errorDialog = viewChild.required(ErrorDialogComponent);

  something = new BehaviorSubject(0);

  #total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      if (v === 5) {
        throw new Error('throw a rejectErrors error');
      }
      return v;
    }),
    catchError((e) => {
      this.errorDialog().open();
      return throwError(() => e);
    })
  )

  total = toSignal(this.#total$, { initialValue: 0, rejectErrors: true });
}
