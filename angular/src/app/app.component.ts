import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,RouterLink,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce_sport';
  name=""
  isLoggedIn: boolean = false;  // This will hold the user's login state

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check login state when component initializes
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;  // Update the login state based on the service
    });
  }
 
}
