import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentFolderService {
  private apiUrl = 'http://localhost:3000'; // Replace with your actual backend API endpoint

  constructor(private http: HttpClient,private authService:AuthenticationService) {}
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents`);
  }
  

  addDocument(documentData: any): Observable<any> {
    // Set the username of the logged-in user as the 'proprietaire'
    documentData.proprietaire = this.authService.getLoggedInUsername();
    console.log('Adding document with data:', documentData);
  
    return this.http.post(`${this.apiUrl}/documents`, documentData)
      .pipe(
        catchError((error: any) => {
          console.error('Document addition failed:', error);
          return throwError('Document addition failed. Please check your request.');
        })
      );
  }
  

  modifyDocument(documentId: string, documentData: any): Observable<any> {
    const apiUrl = `${this.apiUrl}/documents/${documentId}`;
    return this.http.put<any>(apiUrl, documentData).pipe(
      catchError((error: any) => {
        console.error('Document modification failed:', error);
        return throwError('Document modification failed. Please check your request.');
      })
    );
  }

  deleteDocument(documentId: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/documents/${documentId}`;
    return this.http.delete<any>(apiUrl);
  }
  
}
