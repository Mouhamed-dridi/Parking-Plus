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
          <div class="car-badges">
            <span class="badge badge-fuel">{{ car.fuel }}</span>
            <span class="badge badge-trans">{{ car.transmission }}</span>
            <span class="badge badge-type">{{ car.type }}</span>
          </div>
        </div>
      </div>

      <!-- Image -->
      <div class="car-image-section">
        <img [src]="car.image" [alt]="car.name" class="car-main-image" />
      </div>

      <!-- Specs Grid -->
      <div class="specs-grid">
        <div class="spec-section">
          <h2 class="section-title">
            <span nz-icon nzType="info-circle" nzTheme="outline" class="section-icon"></span>
            Caractéristiques
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
            Équipements de sécurité
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
            Aides à la conduite
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
            Équipements extérieurs
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
            Équipements intérieurs
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
            Équipements fonctionnels
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

    .car-badges { display: flex; gap: 8px; flex-wrap: wrap; }
    .badge {
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .badge-fuel { background: #fef3c7; color: #d97706; }
    .badge-trans { background: #dbeafe; color: #2563eb; }
    .badge-type { background: #e0e7ff; color: #4338ca; }

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

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.car = this.carService.getCarById(+idParam) || null;
    }
  }

  goBack(): void {
    window.history.back();
  }
}