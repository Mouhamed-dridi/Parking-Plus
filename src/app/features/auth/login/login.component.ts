import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NzIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // Clear previous error
    this.errorMessage = '';

    // Check empty fields
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Check alphabetic only
    if (!/^[a-zA-Z]+$/.test(this.email.trim())) {
      this.errorMessage = 'Login must contain only letters.';
      return;
    }

    // Check credentials
    if (this.email !== 'admin' || this.password !== 'admin') {
      this.errorMessage = 'Invalid login or password.';
      return;
    }

    // Credentials correct — navigate
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 600);
  }
}
