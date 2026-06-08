import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-driver-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  template: `
    <div class="driver-dash-container">
      <div class="dash-header">
        <h1>Driver Dashboard</h1>
        <p>Welcome back, {{ authService.getUserName() }}</p>
      </div>

      <div class="grid-container">
        <!-- Booking cars -->
        <div class="action-card" (click)="navigateTo('/request-car')">
          <div class="icon-wrapper">
            <span nz-icon nzType="car" nzTheme="outline"></span>
          </div>
          <span class="card-label">Booking cars</span>
        </div>

        <!-- Booking lavage -->
        <div class="action-card" (click)="navigateTo('/lavage')">
          <div class="icon-wrapper">
            <span nz-icon nzType="highlight" nzTheme="outline"></span>
          </div>
          <span class="card-label">Booking lavage</span>
        </div>

        <!-- Add car -->
        <div class="action-card" (click)="navigateTo('/listing')">
          <div class="icon-wrapper">
            <span nz-icon nzType="plus-circle" nzTheme="outline"></span>
          </div>
          <span class="card-label">Add car</span>
        </div>

        <!-- Consul driver -->
        <div class="action-card" (click)="navigateTo('/drivers')">
          <div class="icon-wrapper">
            <span nz-icon nzType="idcard" nzTheme="outline"></span>
          </div>
          <span class="card-label">Consul driver</span>
        </div>

        <!-- CRM garage -->
        <div class="action-card" (click)="navigateTo('/garage-crm')">
          <div class="icon-wrapper">
            <span nz-icon nzType="shop" nzTheme="outline"></span>
          </div>
          <span class="card-label">CRM garage</span>
        </div>

        <!-- Cars -->
        <div class="action-card" (click)="navigateTo('/listing')">
          <div class="icon-wrapper">
            <span nz-icon nzType="car" nzTheme="outline"></span>
          </div>
          <span class="card-label">Cars</span>
        </div>

        <!-- Repairs -->
        <div class="action-card" (click)="navigateTo('/repairs')">
          <div class="icon-wrapper">
            <span nz-icon nzType="tool" nzTheme="outline"></span>
          </div>
          <span class="card-label">Repairs</span>
        </div>

        <!-- Settings -->
        <div class="action-card" (click)="navigateTo('/settings')">
          <div class="icon-wrapper">
            <span nz-icon nzType="setting" nzTheme="outline"></span>
          </div>
          <span class="card-label">Settings</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .driver-dash-container {
      padding: 32px;
      min-height: 100vh;
      background-color: #f8f9fa;
    }

    .dash-header {
      margin-bottom: 32px;
    }

    .dash-header h1 {
      font-size: 24px;
      font-weight: 600;
      color: #202124;
      margin: 0;
    }

    .dash-header p {
      font-size: 14px;
      color: #5f6368;
      margin: 4px 0 0 0;
    }

    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .action-card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 24px 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }

    .action-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #d2e3fc;
      transform: translateY(-2px);
    }

    .icon-wrapper {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #1a73e8; /* Blue icon like in the image */
    }

    .card-label {
      font-size: 15px;
      font-weight: 500;
      color: #3c4043;
    }
  `]
})
export class DriverDashboardComponent {
  authService = inject(AuthService);
  private router = inject(Router);

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
