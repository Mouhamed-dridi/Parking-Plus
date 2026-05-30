import { Component, OnInit } from '@angular/core';
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
      <!-- TOP BANNER AREA -->
      <div class="banner-section">
        <div class="teal-banner"></div>
        <div class="profile-header-content">
          <div class="avatar-outer">
            <div class="avatar-inner">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Driver" (error)="onAvatarError($event)" />
            </div>
          </div>
          <div class="header-main">
            <div class="name-area">
              <div class="name-row">
                <h1>{{ editData.name }}</h1>
              </div>
              <p class="role-desc">Senior Driver at <strong>Park+ Logistics</strong></p>
            </div>
            <div class="action-row">
              <button class="solid-btn edit-solid" (click)="showEditModal = true">
                <span nz-icon nzType="edit" nzTheme="outline"></span>
                <span>Edit</span>
              </button>
              <button class="solid-btn delete-solid" (click)="showDeleteModal = true">
                <span nz-icon nzType="delete" nzTheme="outline"></span>
                <span>Delete</span>
              </button>
            </div>
          </div>
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
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
    }

    /* BANNER & HEADER */
    .banner-section {
      position: relative;
      background: #fdfdfd;
      padding-bottom: 20px;
    }
    .teal-banner {
      height: 160px;
      background: #0f766e;
      border-radius: 0 0 16px 16px;
    }
    .profile-header-content {
      max-width: 1200px;
      margin: -60px auto 0;
      padding: 0 40px;
      display: flex;
      align-items: flex-end;
      gap: 30px;
    }
    .avatar-outer {
      width: 180px;
      height: 180px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .avatar-inner {
      width: 164px;
      height: 164px;
      border-radius: 50%;
      overflow: hidden;
    }
    .avatar-inner img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .header-main {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10px;
    }
    .name-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .name-row h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      color: #111827;
    }
    .flag-icon {
      width: 28px;
      border-radius: 4px;
    }
    .role-desc {
      margin: 5px 0 0;
      font-size: 16px;
      color: #6b7280;
    }
    .role-desc strong { color: #111827; }

    .action-row {
      display: flex;
      gap: 12px;
    }
    .solid-btn {
      height: 48px;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }
    .edit-solid { background: #111827; }
    .edit-solid:hover { background: #1f2937; }
    .delete-solid { background: #ef4444; }
    .delete-solid:hover { background: #dc2626; }

    .icon-btn {
      width: 48px;
      height: 48px;
      background: white;
      border: 1.5px solid #e5e7eb;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #4b5563;
      cursor: pointer;
      transition: all 0.2s;
    }
    .icon-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    /* TABS */
    .tabs-section {
      border-bottom: 1px solid #f3f4f6;
      background: white;
    }
    .tabs-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
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
    }
    .tab.active {
      color: #0f766e;
    }
    .tab.active::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 3px;
      background: #0f766e;
      border-radius: 3px 3px 0 0;
    }
    .tab-badge {
      background: #374151;
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
      font-weight: 800;
      color: #111827;
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
      color: #111827;
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
      color: #333;
    }
    .fiche-header h3 {
      font-size: 14px;
      color: #666;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .header-line {
      width: 120px;
      height: 2px;
      background: #f0f0f0;
      margin: 0 auto;
      position: relative;
    }
    .header-line::after {
      content: '';
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background: #ff0000;
      border-radius: 1px;
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
      color: #333;
      padding-bottom: 8px;
      border-bottom: 2px solid #333;
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
      color: #333;
      font-weight: 600;
      text-transform: uppercase;
    }
    .fiche-row span:last-child {
      color: #999;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .fiche-grid {
        grid-template-columns: 1fr;
        gap: 20px;
      }
    }

    @media (max-width: 992px) {
      .profile-header-content { flex-direction: column; align-items: center; text-align: center; margin-top: -90px; }
      .header-main { flex-direction: column; gap: 20px; }
      .name-row { justify-content: center; }
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
  activeTab: string = 'overview';
  showDeleteModal = false;
  showEditModal = false;

  editData = {
    name: 'Ahmed Benali',
    email: 'ahmed.benali@parkplus.com',
    phone: '+216 55 123 456',
    license: 'TN-98765432',
    carRefId: 'CAR-TN-0012',
    region: 'Tunis'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void { }

  saveEdit(): void {
    this.showEditModal = false;
  }

  confirmDelete(): void {
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
