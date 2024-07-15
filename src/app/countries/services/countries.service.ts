import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    const url = `${this.baseUrl}/alpha/${alphaCode}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/capital/${term}`;

    // This doesn't send the request. To send the request you should use .subscribe() method
    return this.http.get<Country[]>(url).pipe(catchError(() => of([]))); // Uses .pipe() method to catch an error and return a new Observable that's an empty array
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${term}`;

    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.baseUrl}/region/${region}`;

    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
