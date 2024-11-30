import { ChangeDetectionStrategy, Component, linkedSignal, output, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  styleUrl: './character.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPickerComponent {
  readonly min = 1;
  readonly max = 83;

  id = signal(initialId);
  newSearchId = output<number>();

  searchId = linkedSignal<WritableSignal<number>, number>({
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
    this.id.update((value) => {
      if (this.isInRange(value, delta)) {
        return value + delta;
      } else if (this.isInRange(this.searchId(), delta)) {
        return this.searchId() + delta;
      }

      return this.searchId();
    });
  }
}
