import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { map, mergeMap, catchError, of, forkJoin, switchMap, Observable } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Person } from './star-war.type';
import { generateRGBCode } from './generate-rgb';

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
      @if(state().person(); as person) {
        <p>Id: {{ id() }} </p>
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
      @for(film of state().films(); track film) {
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
      <input type="number" [ngModel]="state().searchId()" (ngModelChange)="syncId($event)" />
    </div>
    SearchId: {{ state().searchId() }}
  `,
  styles: `
    :host {
      display: block;
      font-size: 1.5rem;
      padding: 1rem;
      --main-font-size: 1.25rem;
    }

    .border {
      border: 1px solid black; 
      border-radius: 0.5rem; 
      padding: 1rem; 
      margin-bottom: 1rem;

      color: var(--main-color);
      font-size: var(--main-font-size);
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
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

  http = inject(HttpClient);
  #personMovies = toSignal(toObservable(this.id)
    .pipe(
      switchMap((id) => this.http.get<Person>(`${URL}/${id}`)
        .pipe(getPersonMovies(this.http))
      ),
  ), { initialValue: undefined });

  state = computed(() => {
    const result = this.#personMovies();
    return { 
      fontSize: this.id() % 2 === 0 ? '1.25rem' : '1.75rem',
      rgb: generateRGBCode(),
      person: signal(result && result.length > 0 ? result[0] : undefined),
      films: signal(result && result.length > 1 ? result.slice(1): []),
      searchId: signal(this.id()),
    };
  }); 

  updateId(delta: number) {
    this.id.update((value) => Math.min(this.max, Math.max(this.min, value + delta)));
  }
  
  syncId(id: number) {
    if (id >= this.min && id <= this.max) {
      this.state().searchId.set(id);
      this.id.set(id);
    }
  }
}
