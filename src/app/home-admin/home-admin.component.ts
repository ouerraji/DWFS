import { Component } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  users: any[] = []; 

  constructor(private userService: UserServicesService,private router:Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
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
          this.loadUsers();
        },
        (error) => {
          console.error('User deletion failed:', error);
        }
      );
    }
  }

}
