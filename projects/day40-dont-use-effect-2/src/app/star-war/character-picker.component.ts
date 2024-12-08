import { ChangeDetectionStrategy, Component, linkedSignal, output, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounced } from './utils/debounced-signal';

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
      <input type="number" [(ngModel)]="id" />
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
  id = signal(initialId);
  debouncedSignal = debounced(this.id, {
    timeoutMs: 300,
    computation: (value, previous) => {
      let emittedValue = this.id();
      if (value && previous)  {
        emittedValue = (value >= this.min && value <= this.max) ? value : previous.value
      } else if (previous) {
        emittedValue = previous.value
      }

      this.newSearchId.emit(emittedValue);
      return emittedValue;
    },
  });
  
  searchId = linkedSignal<Signal<number>, number>({
    source: () => this.debouncedSignal,
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

  updateId(delta: number) {
    this.id.update((value) => value + delta);
  }
}
