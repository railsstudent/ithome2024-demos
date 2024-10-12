import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of, startWith } from "rxjs";
import { Person } from "./person.type";

const URL = 'https://swapi.dev/api/people';

const DEFAULT: Person = {
  name: '',
  height: '',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color:  '',
  gender: '',
  films: [],
};


@Injectable({
  providedIn: 'root'
})
export class StarWarService {
  private readonly http = inject(HttpClient);

  getData(id: number): Observable<Person> {
    return this.http.get<Person>(`${URL}/${id}`).pipe(
      startWith(DEFAULT),
      catchError((err) => {
        console.error(err);
        return of(DEFAULT);
      }));
  }
}
