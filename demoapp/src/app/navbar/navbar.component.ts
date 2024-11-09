import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [], // No need to add Router here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']  // Corrected styleUrls (plural)
})
export class NavbarComponent {

  constructor(private router: Router) {} // Inject Router here

  // Method to navigate to the "add-user" route
  adduser(): void {
    this.router.navigate(['/add-user']);
  }
}
