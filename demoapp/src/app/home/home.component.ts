import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShowuserComponent } from '../showuser/showuser.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,ShowuserComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
