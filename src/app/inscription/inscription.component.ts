import { Component, OnInit, NgZone } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      'phoneNumber': new FormControl('', [Validators.required]),
      'fullName': new FormControl('', [Validators.required]),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required]),
      'role': new FormControl('', [Validators.required])
    });
    
  }

  onSubmit() {
    const userData = this.registrationForm.value;
    console.log('Form data:', userData);
  
    this.authService.registerUser(userData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        alert('Account created successfully');
        this.router.navigate(['/login'])
        console.log('User data from server:', response.user); // Add this line
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
  
  
  
  

  switchToLogin() {
    this.router.navigate(['/login'])
  }
}
