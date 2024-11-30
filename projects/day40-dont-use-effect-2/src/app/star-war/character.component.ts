import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateRGBCode } from './generate-rgb';
import { personFilmsComputed, personFilmsLoader } from './resources/person-movies.resource';
import { OptionalPersonFilmsTuple, PersonFilms } from './star-war.type';
import { createRxResourceComputed } from './utils/resource-computed';

const initialId = 14;

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>Display the 83 Star War Characters</h3>
    <div class="border">
      @if(personMovies().person; as person) {
        <p>Id: {{ searchId() }} </p>
        <p>Name: {{ person.name }}</p>
        <p>Height: {{ person.height }}</p>
        <p>Mass: {{ person.mass }}</p>
        <p>Hair Color: {{ person.hair_color }}</p>
        <p>Skin Color: {{ person.skin_color }}</p>
        <p>Eye Color: {{ person.eye_color }}</p>
        <p>Gender: {{ person.gender }}</p>
      } @else {
        <p>No info</p>
      }

      <p style="text-decoration: underline">Movies</p>
      @for(film of personMovies().films; track film) {
        <ul style="padding-left: 1rem;">
          <li>{{ film }}</li>
        </ul>
      } @empty {
        <p>No movie</p>
      }
    </div>
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
  host: {
    '[style.--main-color]': 'state().rgb',
    '[style.--main-font-size]': 'state().fontSize',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  readonly min = 1;
  readonly max = 83;

  id = signal(initialId);

  searchId = linkedSignal<WritableSignal<number>, number>({
    source: () => this.id,
    computation: (source, previous) => { 
      const id = source();
      if (!previous) {
        return id;
      }

      return (id >= this.min && id <= this.max) ? id : previous.value;
    }
  });

  http = inject(HttpClient);

  personMovies = createRxResourceComputed<number, OptionalPersonFilmsTuple, PersonFilms>(this.searchId, 
    personFilmsLoader(this.http),
    personFilmsComputed
  )

  state = computed(() => ({ 
    fontSize: this.id() % 2 === 0 ? '1.25rem' : '1.75rem',
    rgb: generateRGBCode(),
  }));

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
