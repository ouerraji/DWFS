import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentFolderService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient,private authService:AuthenticationService) {}
  getDocuments(user:string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/documents/${user}`);
  }
  
  

  addDocument(documentData: any): Observable<any> {
    documentData.proprietaire = this.authService.getLoggedInUsername();
  
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
  getFolders(username:string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getfolders/${username}`);
  }
  addToFolder(folderId: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/folders/${folderId}/add-document`, payload);
  }

  createFolder(folder: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createfolder`, folder);
  }
  getDocumentsInFolder(folderId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getdocinfolder/${folderId}`);
  }
  getfolderbyid(folderId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getfolderbyid/${folderId}`);
  }
}
