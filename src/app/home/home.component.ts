import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentFolderService } from '../services/document-folder.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  documentForm!: FormGroup;
  documents!: any[]; // Replace 'any[]' with the actual type of your document model
  isEditMode = false;
  selectedDocument: any;
  welcomeusername!:string |null;

  constructor(private fb: FormBuilder, private documentService: DocumentFolderService,private auth:AuthenticationService) {}

  ngOnInit(): void {
const loggedusername=this.auth.getLoggedInUsername()
this.welcomeusername=loggedusername
console.log("usernme is ",loggedusername)
    this.documentForm = this.fb.group({
      nom: ['', Validators.required],
      extension: ['', Validators.required],
      taille: ['', Validators.required],
      type: ['', Validators.required],
      proprietaire: ['', Validators.required],
      chemin: ['', Validators.required]
    });

    this.loadDocuments();
  }

  onSubmit(): void {
    // Comment out or remove the following block for testing purposes
    // if (this.documentForm.valid) {
    const formData = this.documentForm.value;
  
    // Set the 'proprietaire' field to the logged-in username
    formData.proprietaire = this.welcomeusername;
  
    if (this.isEditMode) {
      // Modify existing document
      this.documentService.modifyDocument(this.selectedDocument._id, formData).subscribe(
        (response) => {
          console.log('Document modified successfully:', response);
          this.clearForm();
          this.loadDocuments();
        },
        (error) => {
          console.error('Document modification failed:', error);
        }
      );
    } else {
      // Add new document
      this.documentService.addDocument(formData).subscribe(
        (response) => {
          console.log('Document added successfully:', response);
          this.clearForm();
          this.loadDocuments();
        },
        (error) => {
          console.error('Document addition failed:', error);
        }
      );
    }
    // }
  }
  
  
  
  

  editDocument(document: any): void {
    this.isEditMode = true;
    this.selectedDocument = document;

    // Set form values for editing
    this.documentForm.patchValue({
      nom: document.nom,
      extension: document.extension,
      taille: document.taille,
      type: document.type,
      proprietaire: document.proprietaire,
      chemin: document.chemin
    });
  }

  deleteDocument(): void {
    if (this.selectedDocument) {
      // Delete the selected document
      this.documentService.deleteDocument(this.selectedDocument._id).subscribe(
        (response) => {
          console.log('Document deleted successfully:', response);
          this.clearForm();
          this.loadDocuments();
        },
        (error) => {
          console.error('Document deletion failed:', error);
        }
      );
    }
  }

  private loadDocuments(): void {
    this.documentService.getDocuments().subscribe(
      (documents) => {
        this.documents = documents;
        console.log('Documents loaded successfully:', documents);
      },
      (error) => {
        console.error('Error loading documents:', error);
      }
    );
  }
  

  private clearForm(): void {
    this.isEditMode = false;
    this.selectedDocument = null;
    this.documentForm.reset();
  }
}
