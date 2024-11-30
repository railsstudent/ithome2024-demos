import { ChangeDetectionStrategy, Component, effect, inject, viewChild } from '@angular/core';
import { BehaviorSubject, map, scan } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import ErrorDialogComponent from '../errors/error-dialog.component';
import { ERROR_DIALOG_TOKEN } from '../errors/error-token.constant';

@Component({
    selector: 'app-default-errors-example',
    imports: [ErrorDialogComponent],
    template: `
    <h3>Default error handling of toSignal. Error is handled by the global error handler.</h3>
    <div>
      <p>total: {{ total() }}</p>
    </div>
    <button (click)="something.next(1)">Add</button>
    <button (click)="something.next(-1)">Subtract</button>
    <app-error-dialog (closeClicked)="modal.show.set(false)">
      <p>Error is thrown and the global error handler handles it.</p>
    </app-error-dialog>
  `,
    styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DefaultErrorsComponent {
  modal = inject(ERROR_DIALOG_TOKEN);
  errorDialog = viewChild.required(ErrorDialogComponent);

  something = new BehaviorSubject(0);

  #total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      if (v === 5) {
        throw new Error('Error is thrown and the global error handler handles it');
      }
      return v;
    }),
  );

  total = toSignal(this.#total$);

  constructor() {
    effect(() => {
      if (this.modal.show()) {
        console.log('in effect, open dialog');
        this.errorDialog().open();
      } else if (!this.modal.show()) {
        console.log('in effect, close dialog');
        this.errorDialog().close();
      }
    })
  }
}
