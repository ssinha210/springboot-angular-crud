import { Component } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-showuser',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './showuser.component.html',
  styleUrl: './showuser.component.css'
})
export class ShowuserComponent {private http = inject(HttpClient);
  users: any[] = [];

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:8080/').subscribe((data) => {
      this.users = data;
    });
  }

  editUser(id: number) {
    // Navigate to the update user page
    window.location.href = `/update-user/${id}`;
  }
  show(id: number){

    window.location.href = `/show-details/${id}`;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:8080/${id}`).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}