import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  private loggedInUsername: string | null = null; 

  login(username: string): void {
    this.loggedInUsername = username;
  }

  logout(): void {
    this.loggedInUsername = null;
  }

  getLoggedInUsername(): string | null {
    return this.loggedInUsername;
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe( tap((response: any) => {
        const username = response.user.username; 
        this.login(username);
      }),
        catchError((error: any) => {
          console.error('erreur Login:', error);
          return throwError('erreur login. verfier vos infos.');
        })
      );
  }
  
  
  
}