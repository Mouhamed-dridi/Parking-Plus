import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CarCardComponent, CarData } from '../../shared/components/car-card/car-card.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CarService, CarDetail } from '../../core/services/car.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, NzGridModule, NzButtonModule, NzIconModule, NzSelectModule, NzInputModule, CarCardComponent, NzTypographyModule],
  template: `
    <div class="page-header">
      <div class="header-titles">
        <h1 nz-typography>Listing</h1>
        <p nz-typography class="subtitle">Get you latest update for the last 7 days</p>
      </div>
      <div class="header-actions">
        <button nz-button nzType="default" class="report-btn" (click)="goToRepairs()" *ngIf="!authService.isOperator()">
          <span nz-icon nzType="warning" nzTheme="outline"></span>
          Report a Problem
        </button>
        <button nz-button nzType="primary" class="add-btn" (click)="showAddModal = true" *ngIf="!authService.isOperator()">
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          Add Car
        </button>
      </div>
    </div>

    <div class="listing-content">
      <div class="section-header" *ngIf="!isUsedCarPage">
        <h2 nz-typography>Available Cars</h2>
        <button nz-button nzType="default" class="filter-btn">
          <span nz-icon nzType="filter" nzTheme="outline"></span>
          Filter by
        </button>
      </div>

      <div class="section-header" *ngIf="isUsedCarPage">
        <h2 nz-typography>Used Cars</h2>
        <button nz-button nzType="default" class="filter-btn">
          <span nz-icon nzType="filter" nzTheme="outline"></span>
          Filter by
        </button>
      </div>

      <div nz-row [nzGutter]="[24, 24]" class="car-grid" *ngIf="!isUsedCarPage && cars.length > 0">
        <div nz-col nzXs="24" nzSm="24" nzMd="12" nzLg="12" nzXl="12" *ngFor="let car of cars" class="car-col" (click)="viewCar(car.id)">
          <app-car-card [car]="car"></app-car-card>
        </div>
      </div>

      <div nz-row [nzGutter]="[24, 24]" class="car-grid" *ngIf="isUsedCarPage">
        <div nz-col nzXs="24" nzSm="24" nzMd="12" nzLg="12" nzXl="12" *ngFor="let car of usedCars" class="car-col" (click)="viewCar(car.id)">
          <app-car-card [car]="car"></app-car-card>
        </div>
      </div>

      <div class="empty-state" *ngIf="!isUsedCarPage && cars.length === 0">
        <span nz-icon nzType="car" nzTheme="outline" class="empty-icon"></span>
        <p>No cars in this category yet.</p>
        <button nz-button nzType="primary" (click)="showAddModal = true" *ngIf="!authService.isOperator()">Add the first car</button>
      </div>
    </div>

    <!-- ═══ ADD CAR MODAL ═══ -->
    <div class="modal-overlay" *ngIf="showAddModal" (click)="showAddModal = false">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add New Car</h2>
          <button class="modal-close" (click)="showAddModal = false"><span nz-icon nzType="close" nzTheme="outline"></span></button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Car Name <span class="req">*</span></label>
              <input nz-input [(ngModel)]="newCar.name" placeholder="e.g. Toyota Camry" />
            </div>
            <div class="form-group">
              <label>Category <span class="req">*</span></label>
              <nz-select [(ngModel)]="newCar.type" nzPlaceHolder="Select type" style="width:100%;">
                <nz-option nzLabel="Car" nzValue="Car"></nz-option>
                <nz-option nzLabel="Delivery" nzValue="Delivery"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Transmission</label>
              <nz-select [(ngModel)]="newCar.transmission" nzPlaceHolder="Select" style="width:100%;">
                <nz-option nzLabel="Auto" nzValue="Auto"></nz-option>
                <nz-option nzLabel="Manual" nzValue="Manual"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Fuel Type</label>
              <nz-select [(ngModel)]="newCar.fuel" nzPlaceHolder="Select" style="width:100%;">
                <nz-option nzLabel="Diesel" nzValue="Diesel"></nz-option>
                <nz-option nzLabel="Petrol" nzValue="Petrol"></nz-option>
                <nz-option nzLabel="Electric" nzValue="Electric"></nz-option>
                <nz-option nzLabel="Hybrid" nzValue="Hybrid"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-group">
            <label>Driver Name</label>
            <input nz-input [(ngModel)]="newCar.driverName" placeholder="Driver name" />
          </div>
          <div class="form-group">
            <label>Car Image</label>
            <div class="upload-area" (click)="fileInput.click()">
              <input #fileInput type="file" accept="image/*" (change)="onImageSelected($event)" hidden />
              <div class="upload-placeholder" *ngIf="!imagePreview">
                <span nz-icon nzType="camera" nzTheme="outline" class="upload-icon"></span>
                <span class="upload-text">Upload Car Image</span>
              </div>
              <div class="upload-preview" *ngIf="imagePreview">
                <img [src]="imagePreview" alt="Car preview" />
                <button type="button" class="upload-remove" (click)="removeImage(); $event.stopPropagation()">
                  <span nz-icon nzType="close" nzTheme="outline"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="showAddModal = false">Cancel</button>
          <button class="btn-primary" (click)="addCar()" [class.disabled]="!isValid()">
            <span nz-icon nzType="plus" nzTheme="outline"></span> Add Car
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    h1 {
      font-size: 32px;
      margin: 0;
      color: var(--text-dark);
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .subtitle {
      color: #9ca3af;
      margin: 8px 0 0 0;
      font-size: 14px;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }
    .report-btn {
      border-radius: 8px;
      height: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #dc2626;
      border-color: #fca5a5;
    }
    .report-btn:hover {
      color: #b91c1c !important;
      border-color: #f87171 !important;
    }
    .add-btn {
      background-color: #6366f1;
      border-color: #6366f1;
      border-radius: 8px;
      height: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .add-btn:hover {
      background-color: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }

    .listing-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      padding-bottom: 48px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    h2 {
      font-size: 20px;
      margin: 0;
      font-weight: 600;
      color: var(--text-dark);
    }

    .filter-btn {
      border-radius: 8px;
      color: var(--primary-color);
      border-color: #cbd5e1;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .filter-btn:hover {
      border-color: var(--primary-color);
    }

    .car-col { cursor: pointer; }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #9ca3af;
    }
    .empty-icon {
      font-size: 48px;
      color: #d1d5db;
      margin-bottom: 16px;
    }
    .empty-state p {
      margin: 0 0 16px;
      font-size: 15px;
    }

    /* ── MODAL ── */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 20px;
      backdrop-filter: blur(4px);
    }
    .modal-card {
      background: white; border-radius: 16px;
      width: 100%; max-width: 560px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
      animation: slideUp 0.25s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 24px 28px 0;
    }
    .modal-header h2 {
      margin: 0; font-size: 20px; font-weight: 700; color: #1f2937;
    }
    .modal-close {
      width: 32px; height: 32px; border: none;
      background: #f1f5f9; border-radius: 8px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: #6b7280; transition: all 0.2s;
    }
    .modal-close:hover { background: #fee2e2; color: #dc2626; }
    .modal-body {
      padding: 24px 28px;
      display: flex; flex-direction: column; gap: 18px;
    }
    .form-row {
      display: flex; gap: 16px;
    }
    .form-row .form-group { flex: 1; }
    .form-group {
      display: flex; flex-direction: column; gap: 6px;
    }
    .form-group label {
      font-size: 13px; font-weight: 600; color: #374151;
    }
    .req { color: #dc2626; }
    .modal-footer {
      display: flex; justify-content: flex-end; gap: 12px;
      padding: 16px 28px 24px;
    }
    .btn-cancel {
      height: 40px; padding: 0 20px; border-radius: 8px;
      border: 1px solid #d1d5db; background: white;
      color: #374151; font-size: 14px; font-weight: 500; cursor: pointer;
    }
    .btn-cancel:hover { background: #f9fafb; }
    .btn-primary {
      height: 40px; padding: 0 22px; border-radius: 8px; border: none;
      background: #6366f1; color: white; font-size: 14px; font-weight: 600;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary:hover { background: #4f46e5; }
    .btn-primary.disabled { opacity: 0.5; cursor: not-allowed; }

    @media (max-width: 768px) {
      .form-row { flex-direction: column; }
    }

    /* ── IMAGE UPLOAD ── */
    .upload-area {
      border: 2px dashed #e5e7eb;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .upload-area:hover { border-color: #6366f1; background: #f5f3ff; }
    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .upload-icon { font-size: 28px; color: #9ca3af; }
    .upload-text { font-size: 14px; color: #6b7280; font-weight: 500; }
    .upload-preview {
      position: relative;
      width: 100%;
      max-width: 200px;
      margin: 0 auto;
    }
    .upload-preview img {
      width: 100%;
      height: 100px;
      object-fit: contain;
      border-radius: 6px;
    }
    .upload-remove {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background: #ef4444;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    .upload-remove:hover { background: #dc2626; }
  `]
})
export class ListingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private carService = inject(CarService);
  authService = inject(AuthService);

  cars: CarDetail[] = [];
  usedCars: CarDetail[] = [];
  isUsedCarPage = false;
  showAddModal = false;
  imagePreview: string | null = null;

  newCar = {
    name: '',
    type: 'Car',
    transmission: 'Auto',
    fuel: 'Diesel',
    driverName: ''
  };

  allCars: CarDetail[] = [];

  ngOnInit() {
    this.allCars = this.carService.getCars();
    const vehicleType = this.route.snapshot.data['vehicleType'] as string | undefined;
    if (vehicleType === 'Used') {
      this.isUsedCarPage = true;
      this.usedCars = this.carService.getCarsByType('Used');
    } else if (vehicleType) {
      this.cars = this.allCars.filter(c => c.type?.toLowerCase() === vehicleType.toLowerCase());
    } else {
      this.cars = this.allCars;
    }
  }

  goToRepairs(): void {
    this.router.navigate(['/repairs']);
  }

  viewCar(id: number): void {
    this.router.navigate(['/listing', id]);
  }

  isValid(): boolean {
    return this.newCar.name.trim().length > 0;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imagePreview = null;
  }

  addCar(): void {
    if (!this.isValid()) return;

    const car: CarDetail = {
      id: 0,
      name: this.newCar.name.trim(),
      type: this.newCar.type,
      transmission: this.newCar.transmission,
      fuel: this.newCar.fuel,
      price: 0,
      status: 'Free',
      image: this.imagePreview || '/images/cars/default-car.png',
      driver: { name: this.newCar.driverName || '', avatar: '' },
      specs: this.carService.defaultSpecs(this.newCar.name, '-', '2025', this.newCar.fuel, '-', this.newCar.transmission, this.newCar.type)
    };

    this.carService.addCar(car);
    this.allCars = this.carService.getCars();
    this.cars = this.allCars.filter(c => c.type.toLowerCase() === this.newCar.type.toLowerCase());

    this.showAddModal = false;
    this.newCar = { name: '', type: 'Car', transmission: 'Auto', fuel: 'Diesel', driverName: '' };
    this.imagePreview = null;
  }
}
