import { HttpClient } from '@angular/common/http';
import { ResourceLoaderParams } from '@angular/core';
import { catchError, of } from 'rxjs';
import { OptionalPersonFilmsTuple, Person } from '../star-war.type';
import { getPersonMovies } from '../utils/get-person-movies.util';

export const personFilmsLoader = (http: HttpClient) => {
    const URL = 'https://swapi.dev/api/people';
    return (params: ResourceLoaderParams<number>) => {
      return http.get<Person>(`${URL}/${params.request}`)
        .pipe(
          getPersonMovies(http),
          catchError((e) => {
            console.error(e);
            return of(undefined);
          })
        );
    }
}
  
export const personFilmsComputed = (value: OptionalPersonFilmsTuple) => ({
    person: value ? value[0] : undefined,
    films: value ? value.slice(1) as string[] : [] as string[],
});
