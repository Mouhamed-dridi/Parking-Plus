import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../../core/services/auth.service';

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

  private authService = inject(AuthService);
  private router = inject(Router);

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const user = this.authService.login(this.email.trim(), this.password.trim());
    if (!user) {
      this.errorMessage = 'Invalid login or password.';
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      if (user.role === 'driver') {
        this.router.navigate(['/listing']);
      } else {
        this.router.navigate(['/dashboard']);
      }
      this.isLoading = false;
    }, 600);
  }
}
