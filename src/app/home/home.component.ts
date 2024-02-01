import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentFolderService } from '../services/document-folder.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  documentForm!: FormGroup;
  documents!: any[]; 
  isEditMode = false;
  selectedDocument: any;
  welcomeusername!:string |null;

  constructor(private fb: FormBuilder, private documentService: DocumentFolderService,private auth:AuthenticationService,private router:Router) {}

  ngOnInit(): void {
const loggedusername=this.auth.getLoggedInUsername()
this.welcomeusername=loggedusername
console.log("username is ",loggedusername)
    this.documentForm = this.fb.group({
      nom: ['', Validators.required],
      extension: ['', Validators.required],
      taille: ['', Validators.required],
      type: ['', Validators.required],
      proprietaire: ['', Validators.required],
      chemin: ['', Validators.required]
    });

    this.loadDocuments(this.welcomeusername);
  }

  onSubmit(): void {
    
    const formData = this.documentForm.value;
  
    formData.proprietaire = this.welcomeusername;
  
    if (this.isEditMode) {
      this.documentService.modifyDocument(this.selectedDocument._id, formData).subscribe(
        (response) => {
          console.log('Document modifié en success:', response);
          this.clearForm();
          this.loadDocuments(this.welcomeusername);
        },
        (error) => {
          console.error('erreur modification de document:', error);
        }
      );
    } else {
      this.documentService.addDocument(formData).subscribe(
        (response) => {
          console.log('Document ajouter en succes:', response);
          this.clearForm();
          this.loadDocuments(this.welcomeusername);
        },
        (error) => {
          console.error("erreur d'ajout de Document ", error);
        }
      );
    }
  }
  
  
  
  
  managefolders() {
    this.router.navigate(['/folders'])
  }
  editDocument(document: any): void {
    this.isEditMode = true;
    this.selectedDocument = document;

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
      this.documentService.deleteDocument(this.selectedDocument._id).subscribe(
        (response) => {
          console.log('Document supprimeé en success:', response);
          this.clearForm();
          this.loadDocuments(this.welcomeusername);
        },
        (error) => {
          console.error('erreur de suppression de document:', error);
        }
      );
    }
  }

  private loadDocuments(user:string | null): void {
    this.documentService.getDocuments(user).subscribe(
      (documents) => {
        this.documents = documents;
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
