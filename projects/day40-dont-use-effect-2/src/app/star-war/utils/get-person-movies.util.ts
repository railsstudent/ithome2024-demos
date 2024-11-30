import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { Person } from '../star-war.type';

export function getPersonMovies(http: HttpClient) {
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