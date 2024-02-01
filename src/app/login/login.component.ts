import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthenticationService, private fb: FormBuilder,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.loginUser(loginData).subscribe(
        (response) => {
  
          const role = response.user.role;
          const isActive = response.user.isActive;
          console.log("status is",isActive)
  
          if (role === 'administrateur') {
            alert('Connexion réussie !');
            console.log('Login successful:', response);
            this.router.navigate(['/home-admin']); 
          } else if (role === 'standard') {
            if(isActive){
              alert('Connexion réussie !');
              this.router.navigate(['/home']);
            }
            else {
              alert('Votre compte est desactiver par administrateur');
              this.router.navigate(['/login']);
            }

          } else {
            console.error('role inconnu:', role);
          }
  
          
        },
        (error) => {
          console.error('Login failed:', error);
          alert("Échec de la connexion. Veuillez vérifier vos informations d\'identification");
        }
      );
    }
  }

  switchToRegistration() {
    this.router.navigate(['/inscription'])
  }
}
