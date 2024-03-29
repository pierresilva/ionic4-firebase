import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, pipe } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, concat, of } from 'rxjs';
import { countrycodes } from '../models/countrycodes';

@Injectable({
  providedIn: 'root'
})
export class CountrycodesService {

  private url = './assets/countrycodes/countrycodes.json';

  constructor(private http: HttpClient) { }

  getPhoneCodes(): Observable<countrycodes[]> {
    return this.http.get<countrycodes[]>(this.url).pipe(
      tap(data => JSON.stringify(data), catchError(this.handleError))
    );
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(err.message);
  }
}
