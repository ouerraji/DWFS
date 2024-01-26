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

  private loggedInUsername: string | null = null; // Assuming the username is a string

  // Assume that you set the username when the user logs in
  login(username: string): void {
    this.loggedInUsername = username;
  }

  // Assume that you clear the username when the user logs out
  logout(): void {
    this.loggedInUsername = null;
  }

  // Assume that you provide a method to get the logged-in username
  getLoggedInUsername(): string | null {
    return this.loggedInUsername;
  }

  registerUser(user: any): Observable<any> {
    console.log('Sending request with data:', user);
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials)
      .pipe( tap((response: any) => {
        console.log('Server response:', response); // Log the entire response
        const username = response.user.username; // Adjust this based on your server response
        this.login(username);
      }),
        catchError((error: any) => {
          console.error('Login failed:', error);
          return throwError('Login failed. Please check your credentials.');
        })
      );
  }
  
  
  
}