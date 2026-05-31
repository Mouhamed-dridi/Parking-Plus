import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';

interface Provider {
  id: string;
  name: string;
  image: string;
  website: string;
  location: string;
  phone: string;
  serviceType: string;
}

@Component({
  selector: 'app-garage-crm',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzIconModule, NzButtonModule,
    NzSelectModule, NzInputModule, NzModalModule
  ],
  template: `
    <div class="crm-container">

      <!-- ═══ HEADER ═══ -->
      <div class="crm-header">
        <div>
          <h1 class="page-title">Garage CRM</h1>
          <p class="page-sub">Manage your service providers, garages, and parts suppliers</p>
        </div>
        <div class="header-btns">
          <button class="btn-blue" (click)="showAddModal = true">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Add Provider
          </button>
        </div>
      </div>

      <!-- ═══ FILTERS (Optional for layout consistency) ═══ -->
      <div class="filters-bar">
        <div class="search-wrap">
          <span nz-icon nzType="search" nzTheme="outline" class="search-icon"></span>
          <input type="text" class="search-input" placeholder="Search providers by name, location..." [(ngModel)]="searchQuery" />
        </div>
        <nz-select [(ngModel)]="filterService" nzPlaceHolder="All Services" style="width:160px; height: 34px;">
          <nz-option nzLabel="All Services" nzValue=""></nz-option>
          <nz-option nzLabel="Repair" nzValue="Repair"></nz-option>
          <nz-option nzLabel="Spare Parts" nzValue="Spare Parts"></nz-option>
          <nz-option nzLabel="Accessories" nzValue="Accessories"></nz-option>
          <nz-option nzLabel="Tires" nzValue="Tires"></nz-option>
        </nz-select>
      </div>

      <!-- ═══ PROVIDER CARDS GRID ═══ -->
      <div class="cards-grid">
        <div class="provider-card" *ngFor="let p of filteredProviders">
          <!-- Top Image -->
          <div class="card-image">
            <img *ngIf="p.image" [src]="p.image" [alt]="p.name" />
            <div *ngIf="!p.image" class="card-image-fallback">
              <span nz-icon nzType="shop" nzTheme="outline"></span>
            </div>
          </div>
          
          <!-- Content Body -->
          <div class="card-body">
            <div class="card-category">{{ p.serviceType }}</div>
            <h3 class="card-title">{{ p.name }}</h3>
            
            <div class="card-desc">
              <p>Located at {{ p.location }}. For more details, visit <a [href]="p.website" target="_blank">{{ p.website.replace('https://', '') }}</a>.</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="card-footer">
            <div class="footer-item">
              <span nz-icon nzType="phone" nzTheme="outline"></span>
              <span>{{ p.phone }}</span>
            </div>
            <div class="footer-spacer"></div>
            <button class="footer-action-btn"><span nz-icon nzType="edit" nzTheme="outline"></span></button>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="filteredProviders.length === 0">
          <span nz-icon nzType="shop" nzTheme="outline" class="empty-icon"></span>
          <p>No providers found matching your criteria</p>
        </div>
      </div>
      
    </div>

    <!-- ═══ ADD PROVIDER MODAL ═══ -->
    <div class="modal-overlay" *ngIf="showAddModal" (click)="showAddModal = false">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Add New Provider</h2>
          <button class="modal-close" (click)="showAddModal = false"><span nz-icon nzType="close" nzTheme="outline"></span></button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Provider Name <span class="req">*</span></label>
              <input nz-input [(ngModel)]="newProvider.name" placeholder="e.g. AutoPro Main" />
            </div>
            <div class="form-group">
              <label>Service Type <span class="req">*</span></label>
              <nz-select [(ngModel)]="newProvider.serviceType" nzPlaceHolder="Select type" style="width:100%;">
                <nz-option nzLabel="Repair" nzValue="Repair"></nz-option>
                <nz-option nzLabel="Spare Parts" nzValue="Spare Parts"></nz-option>
                <nz-option nzLabel="Accessories" nzValue="Accessories"></nz-option>
                <nz-option nzLabel="Tires" nzValue="Tires"></nz-option>
                <nz-option nzLabel="General Maintenance" nzValue="General Maintenance"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Location / Address</label>
              <input nz-input [(ngModel)]="newProvider.location" placeholder="e.g. 123 Main St, Tunis" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number</label>
              <input nz-input [(ngModel)]="newProvider.phone" placeholder="e.g. +216 20 123 456" />
            </div>
            <div class="form-group">
              <label>Website</label>
              <input nz-input [(ngModel)]="newProvider.website" placeholder="e.g. https://www.autopro.tn" />
            </div>
          </div>
          <div class="form-group">
            <label>Provider Logo / Image</label>
            <div class="upload-area" (click)="fileInput.click()">
              <input #fileInput type="file" accept="image/*" style="display:none" (change)="onImageSelected($event)" />
              
              <ng-container *ngIf="!imagePreview">
                <span nz-icon nzType="picture" nzTheme="outline" class="upload-icon"></span>
                <span class="upload-text">Click to upload logo</span>
                <span class="upload-hint">Images (PNG, JPG) up to 2MB</span>
              </ng-container>

              <div class="upload-preview" *ngIf="imagePreview">
                <img [src]="imagePreview" alt="Preview" />
                <button type="button" class="upload-remove" (click)="removeImage(); $event.stopPropagation()">
                  <span nz-icon nzType="close" nzTheme="outline"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="showAddModal = false">Cancel</button>
          <button class="btn-blue" (click)="submitNewProvider()" [class.disabled]="!isFormValid()">
            <span nz-icon nzType="plus" nzTheme="outline"></span> Add Provider
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .crm-container {
      min-height: 100vh;
      padding: 24px 28px;
      font-family: 'Inter', 'Google Sans', Arial, sans-serif;
    }

    /* ── HEADER ── */
    .crm-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .page-title {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: #202124;
    }
    .page-sub {
      margin: 4px 0 0;
      font-size: 13px;
      color: #5f6368;
    }

    /* ── BLUE BUTTON ── */
    .btn-blue {
      background: #1a73e8;
      border: 1px solid #1a73e8;
      height: 34px;
      padding: 0 14px;
      color: white;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-blue:hover { background: #1557b0; border-color: #1557b0; }
    .btn-blue.disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── FILTERS BAR ── */
    .filters-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      background: #fff;
      padding: 16px;
      border: 1px solid #e0e0e0;
    }
    .search-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 250px;
    }
    .search-icon { color: #9aa0a6; font-size: 16px; }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #202124;
      background: transparent;
    }
    .search-input::placeholder { color: #9aa0a6; }

    /* ── GRID ── */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }

    /* ── PROVIDER CARD (Blog Style) ── */
    .provider-card {
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transition: box-shadow 0.2s, border-color 0.2s;
    }
    .provider-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #d0d0d0;
    }

    /* Image area */
    .card-image {
      width: 100%;
      height: 180px;
      background: #f8f9fa;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card-image-fallback {
      font-size: 40px;
      color: #1a73e8;
    }

    /* Body */
    .card-body {
      padding: 24px 24px 20px;
      flex: 1;
    }
    .card-category {
      font-size: 13px;
      font-weight: 600;
      color: #1a73e8;
      margin-bottom: 10px;
    }
    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #202124;
      margin: 0 0 12px;
      line-height: 1.3;
    }
    .card-desc {
      font-size: 14px;
      color: #5f6368;
      line-height: 1.5;
      margin: 0;
    }
    .card-desc p {
      margin: 0;
    }
    .card-desc a {
      color: #1a73e8;
      text-decoration: none;
    }
    .card-desc a:hover { text-decoration: underline; }

    /* Footer */
    .card-footer {
      padding: 12px 24px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      background: #fafafa;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: #5f6368;
      font-weight: 500;
    }
    .footer-spacer {
      flex: 1;
    }
    .footer-action-btn {
      border: none;
      background: transparent;
      color: #9aa0a6;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .footer-action-btn:hover { color: #1a73e8; }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: #9aa0a6;
    }
    .empty-icon {
      font-size: 40px;
      color: #d0d0d0;
      margin-bottom: 12px;
    }

    /* ── MODAL (Same style as Repairs) ── */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 20px; backdrop-filter: blur(4px);
    }
    .modal-card {
      background: white; border-radius: 16px;
      width: 100%; max-width: 620px;
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
    .modal-header h2 { margin: 0; font-size: 20px; font-weight: 700; color: #202124; }
    .modal-close {
      width: 32px; height: 32px; border: none; background: #f1f3f4; border-radius: 8px;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #5f6368; transition: all 0.2s;
    }
    .modal-close:hover { background: #fce8e6; color: #d93025; }
    .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 18px; }
    .form-row { display: flex; gap: 16px; }
    .form-row .form-group { flex: 1; }
    .form-group { display: flex; flex-direction: column; gap: 6px; }
    .form-group label { font-size: 13px; font-weight: 600; color: #374151; }
    .req { color: #d93025; }
    
    .upload-area {
      border: 2px dashed #e0e0e0; border-radius: 10px; padding: 20px;
      text-align: center; cursor: pointer; display: flex; flex-direction: column;
      align-items: center; gap: 6px; transition: all 0.2s;
    }
    .upload-area:hover { border-color: #1a73e8; background: #e8f0fe; }
    .upload-icon { font-size: 28px; color: #9aa0a6; }
    .upload-text { font-size: 14px; color: #5f6368; font-weight: 500; }
    .upload-hint { font-size: 12px; color: #9aa0a6; }
    .upload-preview { position: relative; width: 100px; height: 100px; border-radius: 6px; overflow: hidden; border: 1px solid #e0e0e0; }
    .upload-preview img { width: 100%; height: 100%; object-fit: cover; }
    .upload-remove {
      position: absolute; top: -6px; right: -6px; width: 22px; height: 22px;
      border-radius: 50%; border: none; background: #d93025; color: white;
      cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;
    }
    .upload-remove:hover { background: #b31412; }

    .modal-footer {
      display: flex; justify-content: flex-end; gap: 12px; padding: 16px 28px 24px;
    }
    .btn-cancel {
      height: 34px; padding: 0 16px; border: 1px solid #e0e0e0; background: white;
      color: #5f6368; font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s;
    }
    .btn-cancel:hover { background: #f1f3f4; }
  `]
})
export class GarageCrmComponent {
  searchQuery = '';
  filterService = '';

  showAddModal = false;
  imagePreview: string | null = null;

  newProvider = {
    name: '',
    serviceType: '',
    location: '',
    phone: '',
    website: ''
  };

  providers: Provider[] = [
    { id: 'P001', name: 'Misfat', image: '/assets/images/crm/misfat.jpg', website: 'https://misfat.com.tn', location: 'Oued Smar, Tunis', phone: '+216 71 433 333', serviceType: 'Spare Parts' },
    { id: 'P002', name: 'Pneu Amine', image: '/assets/images/crm/Pneu%20Amine.jpg', website: 'https://www.pneu-amine.com.tn', location: 'Zone Industrielle, Ben Arous', phone: '+216 71 382 000', serviceType: 'Tires' },
    { id: 'P003', name: 'Assad Batteries', image: '/assets/images/crm/Assad%20Batteries.webp', website: 'https://assadpower.com.tn', location: 'Bouargoub, Nabeul', phone: '+216 72 258 000', serviceType: 'Spare Parts' },
    { id: 'P004', name: 'Gamma Auto', image: '/assets/images/crm/gamma-auto-tunisie.jpg', website: 'https://gamma-auto.com', location: 'La Charguia, Tunis', phone: '+216 71 809 111', serviceType: 'Spare Parts' },
    { id: 'P005', name: 'AM Tuning', image: '/assets/images/crm/AM%20Tuning.jpg', website: 'https://www.amtuning.com.tn', location: 'Route de la Marsa, Tunis', phone: '+216 22 123 456', serviceType: 'Accessories' },
  ];

  get filteredProviders(): Provider[] {
    return this.providers.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchType = this.filterService ? p.serviceType === this.filterService : true;
      return matchSearch && matchType;
    });
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

  isFormValid(): boolean {
    return !!(this.newProvider.name && this.newProvider.serviceType);
  }

  submitNewProvider(): void {
    if (!this.isFormValid()) return;

    const newId = `P${String(this.providers.length + 1).padStart(3, '0')}`;
    const p: Provider = {
      id: newId,
      name: this.newProvider.name,
      image: this.imagePreview || '',
      website: this.newProvider.website,
      location: this.newProvider.location,
      phone: this.newProvider.phone,
      serviceType: this.newProvider.serviceType
    };

    this.providers.unshift(p);
    this.showAddModal = false;
    this.newProvider = { name: '', serviceType: '', location: '', phone: '', website: '' };
    this.imagePreview = null;
  }
}
