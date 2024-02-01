import { Component } from '@angular/core';
import { DocumentFolderService } from '../services/document-folder.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent {
  newFolderName: string = '';
  folders: any[] = [];
  selectedFolder: any | null = null;
  documents!: any[];
  showFolderListModal: boolean = false;
  docToBeAdded: any | null = null;
  selectedDocumentId: string | null = null;
  selectedFolderId: string | null = null;
  documentsInFolder!:any[]
  selectedFolderIdToshow!:any;
  selectedFolderToshow:any | null = null;
  documentsInSelectedFolder!: any[];
  username!:string |null;


  constructor( private folderService: DocumentFolderService,private auth:AuthenticationService,private router:Router) {}
  ngOnInit(): void {
    this.username=this.auth.getLoggedInUsername();
        this.loadDocuments(this.username);
        this.loadFolders(this.username);
        this.getDocumentsInSelectedFolder();
      }

      closeFolderListModal() {
        this.docToBeAdded = null;
        this.showFolderListModal = false;
      }
      addToFolder() {
        
        console.log(this.selectedDocumentId)
        console.log(this.selectedFolderId)
        if (this.selectedDocumentId && this.selectedFolderId) {
          const documentId = this.selectedDocumentId;
          const folderId = this.selectedFolderId;
    
          this.folderService.addToFolder(folderId, { documentId }).subscribe(
            (response) => {
              this.closeFolderListModal()
            },
            (error) => {
              console.error('Error adding document to folder:', error);
            }
          );
        }
      }
      logout():void{
        this.router.navigate(['/login'])
      }
  createFolder() {
    if (this.newFolderName) {
      const newFolder: any = {
        name: this.newFolderName,
        proprietaire:this.auth.getLoggedInUsername(),
        documents: []
      };

      this.folderService.createFolder(newFolder).subscribe(
        response => {
          console.log('Dossier creer en succes', response);
          alert("Dossier creer avec succes")

          // Clear the input field after creating the folder
          this.newFolderName = '';
          this.loadFolders(this.username)
        },
        error => {
          // Handle errors, e.g., show an error message
          console.error('Error de creation de dossier:', error);
        }
      );
    }
  }
  onFolderSelected(folder:any){}
  private loadDocuments(user:string | null): void {
    this.folderService.getDocuments(user).subscribe(
      (documents) => {
        this.documents = documents;
      },
      (error) => {
        console.error('Error de telechrager documents:', error);
      }
    );
  }
  loadFolders(username:string |null) {
    this.folderService.getFolders(username).subscribe(folders => {
      console.log("in load func:",username)
      this.folders = folders;
    });
  }
  openFolderListModal(doc: any) {
    this.docToBeAdded = doc;
    this.selectedDocumentId=doc._id

    this.showFolderListModal = true;
  }
  getDocumentsInSelectedFolder() {

    if (this.selectedFolderIdToshow) {
      const folderId = this.selectedFolderIdToshow;
      this.folderService.getfolderbyid(folderId).subscribe(
        (folder)=>{
          this.selectedFolderToshow=folder
        },
        (error) => {
          console.error('Error loading folderr:', error);
        }

      )

      this.folderService.getDocumentsInFolder(folderId).subscribe(
        (documents) => {
          this.documentsInSelectedFolder = documents;
        },
        (error) => {
          console.error('Error de telecharger les documents de dossier selectionner:', error);
        }
      );
    }
  }

  
}
