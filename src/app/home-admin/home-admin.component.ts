import { Component } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  users: any[] = []; // Replace 'any[]' with the actual type of your user model

  constructor(private userService: UserServicesService,private router:Router) {}

  ngOnInit(): void {
    // Load the list of users when the component is initialized
    this.loadUsers();
  }

  loadUsers(): void {
    // Assuming you have a method in your user service to fetch the list of users
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }
  logout():void{
    this.router.navigate(['/login'])
  }

  activateUser(userId: string): void {
    this.userService.activateUser(userId).subscribe(
      (response) => {
        console.log('User activated successfully:', response);
        // Reload the list of users after activation
        this.loadUsers();
      },
      (error) => {
        console.error('User activation failed:', error);
      }
    );
  }
  
  deactivateUser(userId: string): void {
    this.userService.deactivateUser(userId).subscribe(
      (response) => {
        console.log('User deactivated successfully:', response);
        // Reload the list of users after deactivation
        this.loadUsers();
      },
      (error) => {
        console.error('User deactivation failed:', error);
      }
    );
  }
  
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          // Reload the list of users after deletion
          this.loadUsers();
        },
        (error) => {
          console.error('User deletion failed:', error);
        }
      );
    }
  }

}
