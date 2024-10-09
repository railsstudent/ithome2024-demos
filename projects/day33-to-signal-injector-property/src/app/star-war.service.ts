import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Person } from "./person.type";

const URL = 'https://swapi.dev/api/people';

@Injectable({
  providedIn: 'root'
})
export class StarWarService {
  private readonly http = inject(HttpClient);

  getData(id: number): Observable<Person | undefined> {
    return this.http.get<Person>(`${URL}/${id}`).pipe(
      tap((data) => console.log('data', data)),
      catchError((err) => {
        console.error(err);
        return of(undefined);
      }));
  }
}