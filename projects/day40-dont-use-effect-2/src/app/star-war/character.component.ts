import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { generateRGBCode } from './generate-rgb';
import { Person } from './star-war.type';

const initialId = 14;
const URL = 'https://swapi.dev/api/people';

function getPersonMovies(http: HttpClient) {
  return function(source: Observable<Person>) {
    return source.pipe(
      mergeMap((person) => {
        const urls = person?.films ?? [];
        const filmTitles$ = urls.map((url) => http.get<{ title: string }>(url).pipe(
          map(({ title }) => title),
          catchError((err) => {
            console.error(err);
            return of('');
          })
        ));

        return forkJoin([Promise.resolve(person), ...filmTitles$]);
      }),
      catchError((err) => {
        console.error(err);
        return of(undefined);
      }));
  }
}

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
      <input type="number" [(ngModel)]="searchId" />
    </div>
    SearchId: {{ searchId() }}
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

  personMoviesResource = rxResource({
    request: () => this.searchId(),
    loader: ({ request: id }) => {
      return this.http.get<Person>(`${URL}/${id}`)
        .pipe(
          getPersonMovies(this.http),
          catchError((e) => {
            console.error(e);
            return of(undefined);
          })
        );
    }    
  });

  personMovies = computed(() => {
    const value = this.personMoviesResource.value();
    return {
      person: value ? value[0] : undefined,
      films: value ? value.slice(1) : [],
    }
  });

  state = computed(() => ({ 
    fontSize: this.id() % 2 === 0 ? '1.25rem' : '1.75rem',
    rgb: generateRGBCode(),
  }));

  updateId(delta: number) {
    this.id.update((value) => Math.min(this.max, Math.max(this.min, value + delta)));
  }
}
