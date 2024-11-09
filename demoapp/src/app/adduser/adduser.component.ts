import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-adduser',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Ensure HttpClientModule is imported
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  private http = inject(HttpClient);  // Inject HttpClient service
  private router = inject(Router);    // Inject Router service

  // Define the user object that binds to the form
  user = {
    name: '',
    mobileno: '',
  };

  // Method to handle form submission and add user
  addUser() {
    console.log('Form Submitted', this.user);  // Log the user data for debugging

    // Make HTTP POST request to add the user
    this.http.post('http://localhost:8080', this.user).subscribe({
      next: () => {
        console.log('User added successfully');
        // Navigate to another route (home page or user list) after successful submission
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error adding user:', err);
        // Optionally, you can display an error message to the user
      }
    });
  }
}
