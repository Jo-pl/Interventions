import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProbleme } from './probleme';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {

  private baseUrl = 'https://interventionsjp.azurewebsites.net/api/intervention';

  constructor(private _http: HttpClient) { }

  saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
}

private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  probleme.id = undefined;
  return this._http.post<IProbleme>(this.baseUrl, probleme).pipe(
      tap(data => console.log('createProbleme: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
}

private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
}