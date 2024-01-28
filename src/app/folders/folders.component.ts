import { Component } from '@angular/core';
import { DocumentFolderService } from '../services/document-folder.service';

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


  constructor( private folderService: DocumentFolderService) {}
  ngOnInit(): void {
    
        this.loadDocuments();
        this.loadFolders()
      }

      closeFolderListModal() {
        // Clear the document to be added and hide the folder list modal
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
              console.log('Document added to folder successfully:', response);
            },
            (error) => {
              console.error('Error adding document to folder:', error);
            }
          );
        }
      }
  createFolder() {
    if (this.newFolderName) {
      const newFolder: any = {
        name: this.newFolderName,
        documents: []
      };

      // Call the service to create a new folder
      this.folderService.createFolder(newFolder).subscribe(
        response => {
          // Handle the successful response, e.g., update the UI or show a success message
          console.log('Folder created successfully:', response);
          alert("Dossier creer avec succes")

          // Clear the input field after creating the folder
          this.newFolderName = '';
          this.loadFolders()
        },
        error => {
          // Handle errors, e.g., show an error message
          console.error('Error creating folder:', error);
        }
      );
    }
  }
  private loadDocuments(): void {
    this.folderService.getDocuments().subscribe(
      (documents) => {
        this.documents = documents;
        console.log('Documents loaded successfully:', documents);
      },
      (error) => {
        console.error('Error loading documents:', error);
      }
    );
  }
  loadFolders() {
    this.folderService.getFolders().subscribe(folders => {
      this.folders = folders;
    });
  }
  openFolderListModal(doc: any) {
    // Set the document to be added to a folder
    this.docToBeAdded = doc;
    this.selectedDocumentId=doc._id

    // Show the folder list modal
    this.showFolderListModal = true;
  }

  addDocument(folder: any) {
    
  }
}
