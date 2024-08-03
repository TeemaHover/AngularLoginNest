import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutPageService {
  private readonly apiUrl = 'http://localhost:3000/users/profile';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const token = this.getAuthToken();
    console.log(token);
    const headers = this.createAuthHeaders(token);
    return this.http
      .get<any>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError<any>('getUserData', {})));
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private createAuthHeaders(token: string | null): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`,
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`Operation ${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
