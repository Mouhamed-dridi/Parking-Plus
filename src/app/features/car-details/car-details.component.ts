import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CarService, CarDetail } from '../../core/services/car.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule, NzButtonModule],
  template: `
    <div class="details-container" *ngIf="car; else notFound">
      <!-- Header -->
      <div class="details-header">
        <button class="btn-back" (click)="goBack()">
          <span nz-icon nzType="arrow-left" nzTheme="outline"></span> Back to Listing
        </button>
        <div class="header-info">
          <h1 class="car-title">{{ car.name }}</h1>

        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="tabs-section">
        <div class="tabs-container">
          <div class="tab" [class.active]="activeTab === 'fiche'" (click)="setTab('fiche')">Fiche Technique</div>
          <div class="tab" [class.active]="activeTab === 'maintenance'" (click)="setTab('maintenance')">Maintenance</div>
          <div class="tab" [class.active]="activeTab === 'trips'" (click)="setTab('trips')">Trips History</div>
          <div class="tab" [class.active]="activeTab === 'driver'" (click)="setTab('driver')">Driver</div>
        </div>
      </div>

      <!-- Fiche Technique Tab -->
      <div *ngIf="activeTab === 'fiche'">
        <div class="car-image-section">
          <img [src]="car.image" [alt]="car.name" class="car-main-image" />
        </div>
        <div class="specs-grid">
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="info-circle" nzTheme="outline" class="section-icon"></span>
              Caracteristiques
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.caracteristiques">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="thunderbolt" nzTheme="outline" class="section-icon"></span>
              Motorisation
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.motorisation">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="swap" nzTheme="outline" class="section-icon"></span>
              Transmission
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.transmission">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="expand" nzTheme="outline" class="section-icon"></span>
              Dimensions
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.dimensions">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="dashboard" nzTheme="outline" class="section-icon"></span>
              Performances
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.performances">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="thunderbolt" nzTheme="fill" class="section-icon"></span>
              Consommation
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.consommation">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="safety" nzTheme="outline" class="section-icon"></span>
              Equipements de securite
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.securite">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="control" nzTheme="outline" class="section-icon"></span>
              Aides a la conduite
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.aidesConduite">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="camera" nzTheme="outline" class="section-icon"></span>
              Equipements exterieurs
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.exterieur">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="sound" nzTheme="outline" class="section-icon"></span>
              Audio et communication
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.audio">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="build" nzTheme="outline" class="section-icon"></span>
              Equipements interieurs
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.interieur">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
          <div class="spec-section">
            <h2 class="section-title">
              <span nz-icon nzType="tool" nzTheme="outline" class="section-icon"></span>
              Equipements fonctionnels
            </h2>
            <div class="spec-rows">
              <div class="spec-row" *ngFor="let s of car.specs.fonctionnels">
                <span class="spec-label">{{ s.label }}</span>
                <span class="spec-value">{{ s.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Maintenance Tab -->
      <div *ngIf="activeTab === 'maintenance'" class="tab-content">
        <h2 class="tab-section-title">Maintenance History</h2>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Garage</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of car.maintenanceHistory || []">
                <td class="cell-date">{{ m.date }}</td>
                <td>{{ m.description }}</td>
                <td>{{ m.garage }}</td>
                <td class="cell-cost">{{ '$' + m.cost }}</td>
              </tr>
              <tr *ngIf="!car.maintenanceHistory || car.maintenanceHistory.length === 0">
                <td colspan="4" class="empty-row">No maintenance records found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Trips Tab -->
      <div *ngIf="activeTab === 'trips'" class="tab-content">
        <h2 class="tab-section-title">Trip History</h2>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Driver</th>
                <th>From</th>
                <th>To</th>
                <th>Distance</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of car.trips || []">
                <td class="cell-date">{{ t.date }}</td>
                <td>{{ t.driver }}</td>
                <td>{{ t.from }}</td>
                <td>{{ t.to }}</td>
                <td>{{ t.distance }}</td>
                <td>{{ t.duration }}</td>
              </tr>
              <tr *ngIf="!car.trips || car.trips.length === 0">
                <td colspan="6" class="empty-row">No trips recorded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Driver Tab -->
      <div *ngIf="activeTab === 'driver'" class="tab-content">
        <h2 class="tab-section-title">Assigned Driver</h2>
        <div class="driver-info-card" *ngIf="car.driver.name; else noDriver">
          <div class="driver-avatar-wrap">
            <img [src]="car.driver.avatar" class="driver-avatar-img" />
          </div>
          <div class="driver-details">
            <h3>{{ car.driver.name }}</h3>
            <p class="driver-status">
              <span class="status-dot" [class.dot-road]="car.status === 'In Road'" [class.dot-free]="car.status === 'Free'" [class.dot-maint]="car.status === 'Maintenance'"></span>
              {{ car.status === 'In Road' ? 'Currently driving' : car.status === 'Free' ? 'Available' : 'In Maintenance' }}
            </p>
          </div>
        </div>
        <ng-template #noDriver>
          <div class="empty-driver">
            <span nz-icon nzType="user" nzTheme="outline" class="empty-icon-lg"></span>
            <p>No driver currently assigned to this vehicle</p>
          </div>
        </ng-template>
      </div>

    </div>

    <ng-template #notFound>
      <div class="not-found">
        <span nz-icon nzType="car" nzTheme="outline" class="nf-icon"></span>
        <h2>Car not found</h2>
        <p>The requested vehicle could not be found.</p>
        <button class="btn-back" (click)="goBack()">Back to Listing</button>
      </div>
    </ng-template>
  `,
  styles: [`
    :host { display: block; }
    .details-container {
      background: #f8fafc;
      min-height: 100vh;
      padding: 28px 32px;
      font-family: 'Inter', sans-serif;
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      margin-bottom: 20px;
    }
    .btn-back:hover { border-color: #6366f1; color: #6366f1; }

    .details-header { margin-bottom: 24px; }

    .car-title {
      margin: 0 0 12px;
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
    }

    /* Tabs - driver profile style */
    .tabs-section {
      border-bottom: 1px solid #f3f4f6;
      background: transparent;
      margin-bottom: 28px;
    }
    .tabs-container {
      display: flex;
      gap: 40px;
    }
    .tab {
      padding: 20px 0;
      font-size: 16px;
      font-weight: 600;
      color: #6b7280;
      cursor: pointer;
      position: relative;
      transition: color 0.2s;
    }
    .tab:hover { color: #6366f1; }
    .tab.active {
      color: #6366f1;
    }
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background: #6366f1;
      border-radius: 3px 3px 0 0;
    }

    .car-image-section {
      background: white;
      border-radius: 12px;
      padding: 32px;
      margin-bottom: 28px;
      display: flex;
      justify-content: center;
      border: 1px solid #f0f0f0;
    }
    .car-main-image {
      max-width: 100%;
      max-height: 300px;
      object-fit: contain;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .spec-section {
      background: white;
      border-radius: 12px;
      padding: 20px 24px;
      border: 1px solid #f0f0f0;
    }

    .section-title {
      margin: 0 0 16px;
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 8px;
      padding-bottom: 12px;
      border-bottom: 2px solid #f1f5f9;
    }
    .section-icon { color: #6366f1; font-size: 18px; }

    .spec-rows { display: flex; flex-direction: column; }

    .spec-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f9fafb;
    }
    .spec-row:last-child { border-bottom: none; }

    .spec-label {
      font-size: 13px;
      color: #6b7280;
      flex: 1;
    }
    .spec-value {
      font-size: 13px;
      font-weight: 600;
      color: #1f2937;
      text-align: right;
    }

    .tab-content {
      margin-bottom: 28px;
    }
    .tab-section-title {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 16px;
    }

    .table-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
      overflow: hidden;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    .data-table thead th {
      text-align: left;
      padding: 12px 16px;
      font-weight: 600;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #f0f0f0;
      background: #f9fafb;
    }
    .data-table tbody td {
      padding: 12px 16px;
      color: #374151;
      font-size: 13px;
      border-bottom: 1px solid #f9fafb;
    }
    .data-table tbody tr:last-child td { border-bottom: none; }
    .data-table tbody tr:hover td { background: #f8fafc; }

    .cell-date { font-size: 12px; color: #6b7280; white-space: nowrap; }
    .cell-cost { font-weight: 600; color: #1f2937; }

    .empty-row {
      text-align: center;
      padding: 48px 16px !important;
      color: #9ca3af !important;
      font-size: 14px;
    }

    .driver-info-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      border: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .driver-avatar-wrap {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      border: 3px solid #f1f5f9;
    }
    .driver-avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .driver-details h3 {
      margin: 0 0 6px;
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
    }
    .driver-status {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #6b7280;
    }
    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    .dot-road { background: #22c55e; }
    .dot-free { background: #3b82f6; }
    .dot-maint { background: #f59e0b; }

    .empty-driver {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
    }
    .empty-icon-lg { font-size: 48px; color: #d1d5db; margin-bottom: 12px; }
    .empty-driver p { margin: 0; color: #9ca3af; font-size: 14px; }

    .not-found {
      text-align: center;
      padding: 80px 20px;
      color: #6b7280;
    }
    .nf-icon { font-size: 64px; color: #d1d5db; margin-bottom: 16px; }
    .not-found h2 { margin: 0 0 8px; color: #1f2937; }
    .not-found p { margin: 0 0 24px; }

    @media (max-width: 1024px) {
      .details-container { padding: 20px 16px; }
      .specs-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CarDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);

  car: CarDetail | null = null;
  activeTab: string = 'fiche';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.car = this.carService.getCarById(+idParam) || null;
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  goBack(): void {
    window.history.back();
  }
}
