import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  activateUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}/activate`, {});
  }
  
  deactivateUser(userId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}/deactivate`, {});
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
