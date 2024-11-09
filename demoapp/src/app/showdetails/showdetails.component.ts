import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';    // Import CommonModule
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-showdetails',
  standalone: true,
  imports: [CommonModule, HttpClientModule],  // Add HttpClientModule here
  templateUrl: './showdetails.component.html',
  styleUrls: ['./showdetails.component.css']
})
export class ShowdetailsComponent implements OnInit {

  userId: number = 0;   // User ID from route
  user: any = {};        // Object to hold user details
  isLoading: boolean = true;  // Flag to handle loading state
  errorMessage: string = '';  // To display error messages

  constructor(
    private route: ActivatedRoute,    // To access route params
    private http: HttpClient,         // To make HTTP requests
    private router: Router            // For navigation
  ) {}

  ngOnInit(): void {
    // Get the user ID from the URL parameters
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      
      if (id && !isNaN(+id)) {
        this.userId = +id;  // Convert the ID to a number
        this.fetchUserDetails(this.userId); // Fetch the user details
      } else {
        console.error('Invalid user ID:', id);
        this.errorMessage = 'Invalid user ID!';
        this.isLoading = false;  // Stop loading if the ID is invalid
      }
    });
  }

  // Method to fetch user details from the backend
  fetchUserDetails(id: number): void {
    this.isLoading = true;  // Start loading
    this.http.get(`http://localhost:8080/${id}`).subscribe({
      next: (response) => {
        this.user = response;  // Assign the response to the user object
        console.log('User Details:', this.user);  // Log the user data (for debugging)
        this.isLoading = false;  // Stop loading once data is fetched
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
        this.errorMessage = 'Error fetching user details.';
        this.isLoading = false;  // Stop loading in case of an error
      }
    });
  }

  // Method to go back to the user list or home page
  goBack(): void {
    this.router.navigate(['/']);  // Navigate to the home page or user list
  }
}
