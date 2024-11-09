import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClient and HttpClientModule
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],  // Import HttpClientModule here
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  userId: number = 0;
  userForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      mobileno: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]  // Validate mobile number format
    });
  }

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('id')!;
      this.loadUserDetails();
    });
  }

  loadUserDetails(): void {
    this.http.get(`http://localhost:8080/${this.userId}`).subscribe((data: any) => {
      // Populate the form with the user's data
      this.userForm.patchValue({
        name: data.name,
        mobileno: data.mobileno
      });
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.http.put(`http://localhost:8080/${this.userId}`, this.userForm.value).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
