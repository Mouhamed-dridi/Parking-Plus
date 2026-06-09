import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AuthService } from '../../../core/services/auth.service';

interface ModeOption {
  label: string;
  role: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NzIconModule, NzSelectModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  selectedMode: string | null = null;

  modes: ModeOption[] = [
    { label: 'Admin', role: 'admin', username: 'admin', password: 'admin123' },
    { label: 'Operator-Gate', role: 'operator', username: 'opt', password: 'opt123' },
    { label: 'Driver', role: 'driver', username: 'driver', password: 'driver123' },
  ];

  private authService = inject(AuthService);
  private router = inject(Router);

  onModeChange(): void {
    const mode = this.modes.find(m => m.role === this.selectedMode);
    if (mode) {
      this.email = mode.username;
      this.password = mode.password;
    } else {
      this.email = '';
      this.password = '';
    }
  }

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
