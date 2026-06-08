import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DriverService, Driver } from '../../core/services/driver.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzTabsModule,
    NzTagModule,
    NzAvatarModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule
  ],
  template: `
    <div class="profile-page">
      <!-- HEADER -->
      <button class="btn-back" (click)="goBack()">
        <span nz-icon nzType="arrow-left" nzTheme="outline"></span> Back to Drivers
      </button>

      <div class="profile-header">
        <div class="profile-identity">
          <div class="profile-avatar">
            <img [src]="driver?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'" alt="Driver" (error)="onAvatarError($event)" />
          </div>
          <div class="profile-name-block">
            <h1 class="profile-name">{{ editData.name }}</h1>
            <p class="profile-role">Senior Driver at <strong>Park+ Logistics</strong></p>
          </div>
        </div>
        <div class="profile-actions">
          <button class="btn-edit" (click)="showEditModal = true" *ngIf="authService.isAdmin()">
            <span nz-icon nzType="edit" nzTheme="outline"></span> Edit
          </button>
          <button class="btn-action-del" (click)="showDeleteModal = true" *ngIf="authService.isAdmin()">
            <span nz-icon nzType="delete" nzTheme="outline"></span> Delete
          </button>
        </div>
      </div>

      <!-- NAV TABS -->
      <div class="tabs-section">
        <div class="tabs-container">
          <div class="tab" [class.active]="activeTab === 'overview'" (click)="activeTab = 'overview'">Overview</div>
          <div class="tab" [class.active]="activeTab === 'trips'" (click)="activeTab = 'trips'">Trips History <span class="tab-badge">15</span></div>
          <div class="tab" [class.active]="activeTab === 'cars'" (click)="activeTab = 'cars'">Car Sessions</div>
          <div class="tab" [class.active]="activeTab === 'contact'" (click)="activeTab = 'contact'">Contact Driver</div>
        </div>
      </div>

      <!-- OVERVIEW CONTENT -->
      <div class="overview-centered" *ngIf="activeTab === 'overview'">
        <div class="overview-card">
          <h3>Bio</h3>
          <p>
            I have about 18+ years of experience in commercial delivery vehicle operation and fleet logistics.
            12+ years of experience in international long-haul transport across the MENA region.
            Most of my past works are mainly in corporate transport and high-priority delivery...
          </p>
        </div>

        <div class="overview-card">
          <h3>Driver Information</h3>
          <div class="info-grid-2col">
            <div class="info-row">
              <span class="info-label">Full Name</span>
              <span class="info-value">{{ editData.name }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email Address</span>
              <span class="info-value">{{ editData.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone Number</span>
              <span class="info-value">{{ editData.phone }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">License ID</span>
              <span class="info-value">{{ editData.license }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Car Model</span>
              <span class="info-value">VW Caddy Cargo</span>
            </div>
            <div class="info-row">
              <span class="info-label">Car Ref ID</span>
              <span class="info-value">{{ editData.carRefId }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Region</span>
              <span class="info-value">{{ editData.region }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">CIN</span>
              <span class="info-value">12345678</span>
            </div>
          </div>
        </div>
      </div>

      <!-- CONTACT CONTENT -->
      <div class="overview-centered" *ngIf="activeTab === 'contact'">
        <div class="overview-card">
          <h3>Contact Driver</h3>
          <div class="contact-row">
            <button class="contact-btn phone-btn"><span nz-icon nzType="phone" nzTheme="fill"></span> {{ editData.phone }}</button>
            <button class="contact-btn email-btn"><span nz-icon nzType="mail" nzTheme="fill"></span> {{ editData.email }}</button>
            <button class="contact-btn wa-btn"><i class="fa-brands fa-whatsapp"></i> WhatsApp</button>
          </div>
        </div>
      </div>

      <!-- CAR SESSIONS CONTENT -->
      <div class="car-sessions-content" *ngIf="activeTab === 'cars'">
        <div class="fiche-container">
          <div class="fiche-header">
            <h2>FICHE TECHNIQUE</h2>
            <h3>VW CADDY CARGO 2.0 TDI</h3>
            <div class="header-line"></div>
            <div class="fiche-image-container">
              <img src="/images/cars/deliver/caddy.webp" alt="VW Caddy" (error)="onCarImageError($event)"/>
            </div>
          </div>

          <div class="fiche-grid">
            <!-- Left Column -->
            <div class="fiche-column">
              <div class="fiche-section">
                <h4>CARACTÉRISTIQUES</h4>
                <div class="fiche-row"><span>DISPONIBILITÉ</span><span>Immédiate</span></div>
                <div class="fiche-row"><span>CARROSSERIE</span><span>Fourgonnette</span></div>
                <div class="fiche-row"><span>GARANTIE</span><span>3 ans ou 100 000 km</span></div>
                <div class="fiche-row"><span>NOMBRE DE PLACES</span><span>5</span></div>
                <div class="fiche-row"><span>NOMBRE DE PORTES</span><span>4</span></div>
              </div>

              <div class="fiche-section">
                <h4>TRANSMISSION</h4>
                <div class="fiche-row"><span>BOÎTE</span><span>Manuelle</span></div>
                <div class="fiche-row"><span>NOMBRE DE RAPPORTS</span><span>5</span></div>
                <div class="fiche-row"><span>TRANSMISSION</span><span>Traction</span></div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="fiche-column">
              <div class="fiche-section">
                <h4>MOTORISATION</h4>
                <div class="fiche-row"><span>NOMBRE DE CYLINDRES</span><span>4</span></div>
                <div class="fiche-row"><span>ENERGIE</span><span>Diesel</span></div>
                <div class="fiche-row"><span>PUISSANCE FISCALE</span><span>8 cv</span></div>
                <div class="fiche-row"><span>PUISSANCE (CH.DIN)</span><span>102 ch</span></div>
                <div class="fiche-row"><span>COUPLE</span><span>320 nm 1700 tr/min</span></div>
                <div class="fiche-row"><span>CYLINDRÉE</span><span>1968 cm³</span></div>
              </div>

              <div class="fiche-section">
                <h4>DIMENSIONS</h4>
                <div class="fiche-row"><span>LONGUEUR</span><span>4500 mm</span></div>
                <div class="fiche-row"><span>LARGEUR</span><span>1855 mm</span></div>
                <div class="fiche-row"><span>HAUTEUR</span><span>1833 mm</span></div>
                <div class="fiche-row"><span>VOLUME DU COFFRE</span><span>3.1 m³</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <nz-modal
      [(nzVisible)]="showDeleteModal"
      nzTitle="Confirm Deletion"
      (nzOnCancel)="showDeleteModal = false"
      [nzFooter]="deleteModalFooter"
      [nzWidth]="400">
      <ng-container *nzModalContent>
        <p>Are you sure you want to delete this driver? This action cannot be undone.</p>
      </ng-container>
      <ng-template #deleteModalFooter>
        <button nz-button nzType="default" (click)="showDeleteModal = false">Cancel</button>
        <button nz-button nzType="primary" nzDanger (click)="confirmDelete()">Delete</button>
      </ng-template>
    </nz-modal>

    <!-- EDIT DRIVER MODAL -->
    <nz-modal
      [(nzVisible)]="showEditModal"
      nzTitle="Edit Driver"
      (nzOnCancel)="showEditModal = false"
      [nzFooter]="editModalFooter"
      [nzWidth]="620">
      <ng-container *nzModalContent>
        <div class="edit-form">
          <div class="edit-grid">
            <div class="edit-item">
              <label>Full Name</label>
              <input nz-input [(ngModel)]="editData.name" />
            </div>
            <div class="edit-item">
              <label>Email Address</label>
              <input nz-input [(ngModel)]="editData.email" />
            </div>
            <div class="edit-item">
              <label>Phone Number</label>
              <input nz-input [(ngModel)]="editData.phone" />
            </div>
            <div class="edit-item">
              <label>License ID</label>
              <input nz-input [(ngModel)]="editData.license" />
            </div>
            <div class="edit-item">
              <label>Car Ref ID</label>
              <input nz-input [(ngModel)]="editData.carRefId" />
            </div>
            <div class="edit-item">
              <label>Region</label>
              <input nz-input [(ngModel)]="editData.region" />
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #editModalFooter>
        <button nz-button nzType="default" (click)="showEditModal = false">Cancel</button>
        <button nz-button nzType="primary" (click)="saveEdit()">Save Changes</button>
      </ng-template>
    </nz-modal>
  `,
  styles: [`
    .profile-page {
      background: white;
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

    /* HEADER */
    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 8px 0 24px;
      flex-wrap: wrap;
    }
    .profile-identity {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .profile-avatar {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      overflow: hidden;
      background: #f1f5f9;
      border: 3px solid #e0e7ff;
      flex-shrink: 0;
    }
    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .profile-name-block { display: flex; flex-direction: column; gap: 4px; }
    .profile-name {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #1f2937;
      letter-spacing: -0.3px;
    }
    .profile-role {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
    }
    .profile-role strong { color: #1f2937; }

    .profile-actions {
      display: flex;
      gap: 10px;
    }
    .btn-edit {
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
    }
    .btn-edit:hover { border-color: #6366f1; color: #6366f1; }
    .btn-action-del {
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
    }
    .btn-action-del:hover { border-color: #ef4444; color: #ef4444; }

    /* TABS */
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
    .tab-badge {
      background: #6366f1;
      color: white;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 10px;
      margin-left: 4px;
    }

    /* DRIVER DETAILS */
    .overview-centered {
      max-width: 720px;
      margin: 40px auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .overview-card {
      background: #f9fafb;
      border: 1px solid #f3f4f6;
      border-radius: 12px;
      padding: 24px 28px;
    }
    .overview-card h3 {
      font-size: 18px;
      font-weight: 700;
      color: #1f2937;
      margin: 0 0 16px;
    }
    .overview-card p {
      font-size: 15px;
      line-height: 1.7;
      color: #374151;
      margin: 0;
    }

    .info-grid-2col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .info-row {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .info-label {
      font-size: 11px;
      font-weight: 700;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 15px;
      font-weight: 600;
      color: #1f2937;
    }

    .contact-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .contact-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      background: white;
      transition: all 0.2s;
    }
    .contact-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .phone-btn { color: #dc2626; }
    .email-btn { color: #2563eb; }
    .wa-btn { color: #10b981; }

    /* FICHE TECHNIQUE STYLE */
    .fiche-container {
      background: white;
      padding: 40px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .fiche-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .fiche-header h2 {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
      margin-bottom: 8px;
      color: #1f2937;
    }
    .fiche-header h3 {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .header-line {
      width: 120px;
      height: 2px;
      background: #6366f1;
      margin: 0 auto;
      position: relative;
    }
    .fiche-image-container {
      margin: 30px auto 10px auto;
      max-width: 500px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      border: 1px solid #f0f0f0;
    }
    .fiche-image-container img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
    .fiche-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
    }
    .fiche-section {
      margin-bottom: 40px;
    }
    .fiche-section h4 {
      font-size: 16px;
      font-weight: 700;
      color: #6366f1;
      padding-bottom: 8px;
      border-bottom: 2px solid #6366f1;
      margin-bottom: 12px;
      letter-spacing: 1px;
    }
    .fiche-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 13px;
    }
    .fiche-row span:first-child {
      color: #374151;
      font-weight: 600;
      text-transform: uppercase;
    }
    .fiche-row span:last-child {
      color: #6b7280;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .fiche-grid { grid-template-columns: 1fr; gap: 20px; }
      .info-grid-2col { grid-template-columns: 1fr; }
    }

    @media (max-width: 992px) {
      .profile-header { flex-direction: column; align-items: flex-start; }
      .profile-actions { width: 100%; }
      .tabs-container { overflow-x: auto; }
    }

    .edit-form { padding: 8px 0; }
    .edit-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .edit-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .edit-item label {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
    }
  `]
})
export class DriverProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private driverService = inject(DriverService);
  authService = inject(AuthService);

  activeTab: string = 'overview';
  showDeleteModal = false;
  showEditModal = false;
  driver: Driver | null = null;

  editData = {
    name: '',
    email: '',
    phone: '',
    license: '',
    carRefId: '',
    region: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.driver = this.driverService.getById(+id) || null;
      if (this.driver) {
        this.editData = {
          name: this.driver.name,
          email: this.driver.email,
          phone: this.driver.phone,
          license: this.driver.license,
          carRefId: this.driver.carRefId,
          region: this.driver.region
        };
      }
    }
  }

  saveEdit(): void {
    if (this.driver) {
      this.driverService.save({ ...this.driver, ...this.editData } as Driver);
    }
    this.showEditModal = false;
  }

  goBack(): void {
    this.router.navigate(['/drivers']);
  }

  confirmDelete(): void {
    if (this.driver) {
      this.driverService.delete(this.driver.id);
    }
    this.showDeleteModal = false;
    this.router.navigate(['/drivers']);
  }

  onAvatarError(event: any) {
    event.target.src = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
  }
  onCarImageError(event: any) {
    event.target.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Car+Image';
  }
}
