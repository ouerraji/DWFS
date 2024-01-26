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
  
          // Check the role in the response
          const role = response.user.role;
          const isActive = response.user.isActive;
          console.log("status is",isActive)
  
          // Navigate based on the role
          if (role === 'administrateur') {
            alert('Loginnnn successful');
            console.log('Login successful:', response);
            this.router.navigate(['/home-admin']); // Navigate to the admin page
          } else if (role === 'standard') {
            if(isActive){
              alert('Loginnnn successful');
              this.router.navigate(['/home']);
            }
            else {
              alert('Votre compte est desactiver par administrateur');
              this.router.navigate(['/login']);
            }

           // console.log('Login successful:', response);

//this.router.navigate(['/home']); // Navigate to the standard user page
          } else {
            console.error('Unknown role:', role);
          }
  
          // Optionally, you can also store the user information in a service for future use
          // this.authService.setCurrentUser(response.user);
  
          // Alert can be removed or replaced with a more user-friendly notification
          
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please check your credentials.');
        }
      );
    }
  }

  switchToRegistration() {
    this.router.navigate(['/inscription'])
  }
}
