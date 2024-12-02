import { ChangeDetectionStrategy, Component, linkedSignal, output, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';

const initialId = 14;

@Component({
  selector: 'app-character-picker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container">
      <button (click)="updateId(-2)">-2</button>
      <button (click)="updateId(-1)">-1</button>
      <button (click)="updateId(1)">+1</button>
      <button (click)="updateId(2)">+2</button>
      <input type="number" [ngModel]="idSub.getValue()" (ngModelChange)="idSub.next($event)" />
    </div>
    SearchId: {{ searchId() }}, Id: {{ id() }}
  `,
  styles: `
    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPickerComponent {
  readonly min = 1;
  readonly max = 83;

  newSearchId = output<number>();
  idSub = new BehaviorSubject<number>(initialId);
  id = toSignal(this.idSub.asObservable().pipe(debounceTime(300)), { initialValue: initialId });
  
  searchId = linkedSignal<Signal<number>, number>({
    source: () => this.id,
    computation: (source, previous) => { 
      const id = source();
      if (!previous) {
        this.newSearchId.emit(id);
        return id;
      }

      const withinRangeId = (id >= this.min && id <= this.max) ? id : previous.value;
      this.newSearchId.emit(withinRangeId);
      return withinRangeId;
    }
  });

  private isInRange(value: number, delta: number) {
    const newId = value + delta;
    return newId >= this.min && newId <= this.max;
  }

  updateId(delta: number) {
    let value = this.searchId(); 
    if (this.isInRange(this.idSub.getValue(), delta)) {
      value = this.idSub.getValue() + delta;
    } else if (this.isInRange(this.searchId(), delta)) {
      value = this.searchId() + delta;
    }
    this.idSub.next(value);
  }
}
