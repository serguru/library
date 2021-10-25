import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private authorsUrl = 'api/authors';


  constructor(private http: HttpClient) {
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  newAuthor(): Author {
    return {
      id: 0,
      name: ''
    };
  }

  createAuthor(author: Author): Observable<Author> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Author Id must be null for the Web API to assign an Id
    const newAuthor = { ...author, id: null };
    return this.http.post<Author>(this.authorsUrl, newAuthor, { headers })
      .pipe(
        tap(data => console.log('createAuthor: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteAuthor(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.authorsUrl}/${id}`;
    return this.http.delete<Author>(url, { headers })
      .pipe(
        tap(data => console.log('deleteAuthor: ' + id)),
        catchError(this.handleError)
      );
  }

  updateAuthor(author: Author): Observable<Author> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.authorsUrl}/${author.id}`;
    return this.http.put<Author>(url, author, { headers })
      .pipe(
        tap(() => console.log('updateAuthor: ' + author.id)),
        // Return the author on an update
        map(() => author),
        catchError(this.handleError)
      );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
