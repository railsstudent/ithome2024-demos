import { computed, inject, Injectable, signal } from '@angular/core';
import { map, mergeMap, catchError, of, forkJoin, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { Person } from './star-war.type';
import { generateRGBCode } from './generate-rgb';

const initialId = 14;
const URL = 'https://swapi.dev/api/people';

// Not used to keep the demo simple
@Injectable({
  providedIn: 'root'
})
export class StarWarService {
  id = signal(initialId);

  http = inject(HttpClient);
  #personMovies = toSignal(toObservable(this.id)
    .pipe(
      switchMap((id) => this.http.get<Person>(`${URL}/${id}`)
        .pipe(
          mergeMap((person) => {
            const urls = person?.films ?? [];
            const filmTitles$ = urls.map((url) => this.http.get<{ title: string }>(url).pipe(
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
          }))
  )), { initialValue: undefined });

  state = computed(() => {
    const result = this.#personMovies();
    return { 
      fontSize: this.id() % 2 === 0 ? '1.25rem' : '1.75rem',
      rgb: signal(generateRGBCode()),
      person: signal(result && result.length > 0 ? result[0] : undefined),
      films: signal(result && result.length > 1 ? result.slice(1): []),
      searchId: signal(this.id()),
    };
  }); 
}