import { HttpClient } from '@angular/common/http';
import { inject, Injector, ResourceLoaderParams, runInInjectionContext } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { OptionalPersonFilmsTuple, Person } from '../star-war.type';
import { getPersonMovies } from '../utils/get-person-movies.util';

export const personFilmsLoader = (injector: Injector) => {
    return runInInjectionContext(injector, () => {
        const http = inject(HttpClient);
        const URL = 'https://swapi.py4e.com/api/people';
        return (params: ResourceLoaderParams<number>) => {
            if (params.request <= 0) {
                return of(undefined);
            }
            return http.get<Person>(`${URL}/${params.request}`)
                .pipe(
                    map((p) => ({ ...p, id: params.request })),
                    getPersonMovies(http),
                    catchError((e) => {
                        console.error(e);
                        return of(undefined);
                    })
                );
        }
    })
}
  
export const personFilmsComputed = (value: OptionalPersonFilmsTuple) => {
    const [person, ...films] = value || [undefined, ...([] as string[]) ];
    return { 
        person,
        films,
    };
}
