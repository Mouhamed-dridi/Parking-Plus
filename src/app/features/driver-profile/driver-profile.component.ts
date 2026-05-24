import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzButtonModule,
    NzTabsModule,
    NzTagModule,
    NzAvatarModule
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
                <h1>Ahmed Benali</h1>
              </div>
              <p class="role-desc">Senior Driver at <strong>Park+ Logistics</strong></p>
            </div>
            <div class="action-row">
              <button class="solid-btn edit-solid">
                <span nz-icon nzType="edit" nzTheme="outline"></span>
                <span>Edit</span>
              </button>
              <button class="solid-btn delete-solid">
                <span nz-icon nzType="delete" nzTheme="outline"></span>
                <span>Delete</span>
              </button>
              <button class="icon-btn whatsapp-btn"><i class="fa-brands fa-whatsapp"></i></button>
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
        </div>
      </div>

      <!-- OVERVIEW CONTENT -->
      <div class="content-grid" *ngIf="activeTab === 'overview'">
        <!-- LEFT COLUMN -->
        <div class="left-column">
          <div class="bio-card">
            <h3>Bio</h3>
            <p>
              I have about 18+ years of experience in heavy vehicle operation and logistics management. 
              12+ years of experience in international long-haul transport across the MENA region. 
              Most of my past works are mainly in Oil & Gas transport, high-priority cargo delivery...
              <span class="show-more">Show more</span>
            </p>
            <div class="social-icons">
              <div class="s-icon"><span nz-icon nzType="linkedin"></span></div>
              <div class="s-icon"><span nz-icon nzType="twitter"></span></div>
              <div class="s-icon"><span nz-icon nzType="global"></span></div>
            </div>
          </div>

          <div class="insights-container">
            <div class="section-header">
              <h3>Profile insights</h3>
              <a href="#">How do I get these?</a>
            </div>
            <div class="insight-row">
              <div class="insight-card">
                <div class="insight-title success">
                  <span nz-icon nzType="trophy"></span>
                  Perfect Presence
                </div>
                <p>Driver is prompt and highly responsive.</p>
              </div>
              <div class="insight-card">
                <div class="insight-title danger">
                  <span nz-icon nzType="heart"></span>
                  Top achiever: Director
                </div>
                <p>Driver is amongst the top 10% of contributors in their field!</p>
              </div>
            </div>
          </div>

          <div class="details-container">
            <h3>Driver Information</h3>
            <div class="detail-grid">
              <div class="detail-item">
                <span class="d-label">Email Address</span>
                <span class="d-value">ahmed.benali&#64;parkplus.com</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Phone Number</span>
                <span class="d-value">+216 55 123 456</span>
              </div>
              <div class="detail-item">
                <span class="d-label">License ID</span>
                <span class="d-value">TN-98765432</span>
              </div>
              <div class="detail-item">
                <span class="d-label">Car Ref ID</span>
                <span class="d-value">CAR-TN-0012</span>
              </div>
            </div>
          </div>

          <div class="experience-container">
            <h3>Experience & History</h3>
            <div class="exp-item">
              <div class="exp-label">Expertise</div>
              <div class="exp-tags">
                <span class="tag orange">Logistics</span>
                <span class="tag blue">Heavy Vehicles</span>
              </div>
            </div>
            <div class="exp-item">
              <div class="exp-label">Industries</div>
              <div class="exp-tags">
                <span class="tag blue"><span nz-icon nzType="laptop"></span> Tech</span>
                <span class="tag dark"><span nz-icon nzType="shopping"></span> Retail</span>
              </div>
            </div>
            <div class="exp-item">
              <div class="exp-label">Car History</div>
              <div class="exp-history">
                <div class="history-card">
                  <div class="h-icon"><span nz-icon nzType="car"></span></div>
                  <div class="h-info">
                    <div class="h-title">Tata Xenon (Pickup)</div>
                    <div class="h-date">Jan 2023 - Present • 1 yr 4 mos</div>
                  </div>
                  <span class="status-badge active">Current</span>
                </div>
                <div class="history-card">
                  <div class="h-icon"><span nz-icon nzType="car"></span></div>
                  <div class="h-info">
                    <div class="h-title">Isuzu D-Max (Pickup)</div>
                    <div class="h-date">Mar 2020 - Dec 2022 • 2 yrs 10 mos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="right-column">
          <div class="car-details-card">
            <div class="quick-actions">
              <div class="qa-item"><span nz-icon nzType="swap" nzTheme="outline"></span> Ajouter au comparateur</div>
              <div class="qa-item" style="padding-left: 24px;">Financer avec Banque Zitouna</div>
            </div>

            <div class="car-specs-list">
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="node-index" nzTheme="outline"></span> Kilométrage</div>
                <div class="c-val">33 000 KM</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="calendar" nzTheme="outline"></span> Mise en circulation</div>
                <div class="c-val">04.2023</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="experiment" nzTheme="outline"></span> Énergie</div>
                <div class="c-val">Essence</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="control" nzTheme="outline"></span> Boite vitesse</div>
                <div class="c-val">Automatique</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="thunderbolt" nzTheme="outline"></span> Puissance fiscale</div>
                <div class="c-val">16 CV</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="apartment" nzTheme="outline"></span> Transmission</div>
                <div class="c-val">Intégrale</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="car" nzTheme="outline"></span> Carrosserie</div>
                <div class="c-val">SUV</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="tool" nzTheme="outline"></span> État général</div>
                <div class="c-val">Très bon</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="user" nzTheme="outline"></span> Anciens propriétaires</div>
                <div class="c-val">1ère main</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="history" nzTheme="outline"></span> Date de l'annonce</div>
                <div class="c-val">13.04.2026</div>
              </div>
              <div class="c-row">
                <div class="c-label"><span nz-icon nzType="environment" nzTheme="outline"></span> Gouvernorat</div>
                <div class="c-val">Tunis</div>
              </div>
            </div>

            <div class="contact-btns">
              <button class="c-btn call-btn"><span nz-icon nzType="phone" nzTheme="fill"></span> 56 585 651</button>
              <button class="c-btn sms-btn"><span nz-icon nzType="message" nzTheme="fill"></span> SMS</button>
              <button class="c-btn wa-btn"><i class="fa-brands fa-whatsapp"></i> Whatsapp</button>
            </div>
          </div>

          <div class="stat-card statistics">
            <div class="stat-header">
              <h3>Community statistics</h3>
              <a href="#">See more <span nz-icon nzType="down"></span></a>
            </div>
            <div class="stat-list">
              <div class="stat-item">
                <div class="stat-icon blue-box"><span nz-icon nzType="rocket"></span></div>
                <div class="stat-info">
                  <div class="stat-val">1,350 hrs</div>
                  <div class="stat-lbl">Total driving time</div>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon red-box"><span nz-icon nzType="star"></span></div>
                <div class="stat-info">
                  <div class="stat-val">34</div>
                  <div class="stat-lbl">Trips completed</div>
                </div>
              </div>
            </div>
          </div>

          <div class="stat-card sessions">
            <div class="stat-header">
              <h3>Available shifts</h3>
              <p class="tz-info">In your local timezone (Africa/Tunis) <a href="#">Update</a></p>
            </div>
            
            <div class="date-scroll">
              <div class="date-card active">
                <div class="d-day">TUE</div>
                <div class="d-date">02 May</div>
                <div class="d-slots">2 shifts</div>
              </div>
              <div class="date-card">
                <div class="d-day">WED</div>
                <div class="d-date">03 May</div>
                <div class="d-slots">2 shifts</div>
              </div>
              <div class="date-card">
                <div class="d-day">TUE</div>
                <div class="d-date">09 May</div>
                <div class="d-slots">2 shifts</div>
              </div>
            </div>

            <div class="time-slots">
              <div class="time-label">Available time slots</div>
              <div class="slots-row">
                <div class="t-slot active">8:00 PM</div>
                <div class="t-slot">9:00 PM</div>
              </div>
            </div>

            <button class="book-session-btn">Book Shift for 02 May 2026</button>
          </div>
        </div>
      </div>

      <!-- CAR SESSIONS CONTENT -->
      <div class="car-sessions-content" *ngIf="activeTab === 'cars'">
        <div class="fiche-container">
          <div class="fiche-header">
            <h2>FICHE TECHNIQUE</h2>
            <h3>TATA XENON PICKUP 2.2L DICOR</h3>
            <div class="header-line"></div>
            <div class="fiche-image-container">
              <img src="/images/cars/pickup/tata-xenon-south-africa.avif" alt="Tata Xenon" (error)="onCarImageError($event)"/>
            </div>
          </div>

          <div class="fiche-grid">
            <!-- Left Column -->
            <div class="fiche-column">
              <div class="fiche-section">
                <h4>CARACTÉRISTIQUES</h4>
                <div class="fiche-row"><span>DISPONIBILITÉ</span><span>Immédiate</span></div>
                <div class="fiche-row"><span>CARROSSERIE</span><span>Pickup Double Cabine</span></div>
                <div class="fiche-row"><span>GARANTIE</span><span>3 ans ou 100 000 km</span></div>
                <div class="fiche-row"><span>NOMBRE DE PLACES</span><span>5</span></div>
                <div class="fiche-row"><span>NOMBRE DE PORTES</span><span>4</span></div>
              </div>

              <div class="fiche-section">
                <h4>TRANSMISSION</h4>
                <div class="fiche-row"><span>BOÎTE</span><span>Manuelle</span></div>
                <div class="fiche-row"><span>NOMBRE DE RAPPORTS</span><span>5</span></div>
                <div class="fiche-row"><span>TRANSMISSION</span><span>4x2 / 4x4</span></div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="fiche-column">
              <div class="fiche-section">
                <h4>MOTORISATION</h4>
                <div class="fiche-row"><span>NOMBRE DE CYLINDRES</span><span>4</span></div>
                <div class="fiche-row"><span>ENERGIE</span><span>Diesel</span></div>
                <div class="fiche-row"><span>PUISSANCE FISCALE</span><span>8 cv</span></div>
                <div class="fiche-row"><span>PUISSANCE (CH.DIN)</span><span>140 ch</span></div>
                <div class="fiche-row"><span>COUPLE</span><span>320 nm 1700 tr/min</span></div>
                <div class="fiche-row"><span>CYLINDRÉE</span><span>2179 cm³</span></div>
              </div>

              <div class="fiche-section">
                <h4>DIMENSIONS</h4>
                <div class="fiche-row"><span>LONGUEUR</span><span>5125 mm</span></div>
                <div class="fiche-row"><span>LARGEUR</span><span>1860 mm</span></div>
                <div class="fiche-row"><span>HAUTEUR</span><span>1765 mm</span></div>
                <div class="fiche-row"><span>VOLUME DU COFFRE</span><span>N/A</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
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
    .whatsapp-btn { color: #25D366; font-size: 22px; }
    .whatsapp-btn:hover { color: #1da851; border-color: #25D366; background: #e8fbf0; }

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

    /* CONTENT GRID */
    .content-grid {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 40px;
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 50px;
    }

    .bio-card h3 { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 16px; }
    .bio-card p {
      font-size: 16px;
      line-height: 1.7;
      color: #374151;
      margin-bottom: 24px;
    }
    .show-more { color: #0f766e; font-weight: 700; cursor: pointer; }
    .social-icons { display: flex; gap: 15px; }
    .s-icon {
      width: 40px;
      height: 40px;
      background: #f3f4f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4b5563;
      font-size: 18px;
    }

    .insights-container { margin-top: 50px; }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .section-header h3 { margin: 0; font-size: 20px; font-weight: 800; color: #111827; }
    .section-header a { font-size: 14px; color: #0f766e; font-weight: 600; text-decoration: none; }

    .insight-row { display: flex; gap: 20px; }
    .insight-card {
      flex: 1;
      border: 1.5px solid #f3f4f6;
      border-radius: 16px;
      padding: 24px;
    }
    .insight-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 10px;
    }
    .insight-title.success { color: #10b981; }
    .insight-title.danger { color: #ef4444; }
    .insight-card p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }

    .experience-container { margin-top: 50px; }
    .experience-container h3 { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 24px; }
    .exp-item {
      display: flex;
      align-items: flex-start;
      padding: 20px 0;
      border-bottom: 1.5px solid #f3f4f6;
    }
    .exp-label { width: 150px; font-size: 15px; color: #6b7280; font-weight: 600; margin-top: 6px; }
    .exp-tags { display: flex; gap: 10px; flex-wrap: wrap; }
    .tag {
      padding: 6px 16px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tag.orange { background: #fff7ed; color: #ea580c; }
    .tag.blue { background: #eff6ff; color: #3b82f6; }
    .tag.dark { background: #f3f4f6; color: #1f2937; }

    /* CAR HISTORY */
    .exp-history { display: flex; flex-direction: column; gap: 12px; flex: 1; }
    .history-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1.5px solid #f3f4f6;
      border-radius: 12px;
      background: #fafafa;
    }
    .h-icon {
      width: 44px;
      height: 44px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #6b7280;
    }
    .h-info { flex: 1; }
    .h-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 4px; }
    .h-date { font-size: 13px; color: #6b7280; font-weight: 500; }
    .status-badge {
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      background: #e5e7eb;
      color: #4b5563;
    }
    .status-badge.active { background: #dcfce7; color: #166534; }

    /* DRIVER DETAILS */
    .details-container { margin-top: 50px; }
    .details-container h3 { font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 24px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: #f9fafb;
      padding: 16px;
      border-radius: 12px;
      border: 1.5px solid #f3f4f6;
    }
    .d-label { font-size: 12px; color: #6b7280; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .d-value { font-size: 15px; font-weight: 700; color: #111827; }

    /* RIGHT COLUMN */
    .car-details-card {
      background: white;
      border: 1px solid #f0f0f0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      margin-bottom: 30px;
    }
    .quick-actions {
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .qa-item {
      font-size: 15px;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-weight: 500;
    }
    .car-specs-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .c-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .c-label {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #6b7280;
      font-size: 14px;
      font-weight: 500;
    }
    .c-label span {
      font-size: 18px;
      color: #9ca3af;
    }
    .c-val {
      font-weight: 800;
      color: #111827;
      font-size: 14px;
    }
    .contact-btns {
      display: grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap: 8px;
      margin-top: 24px;
    }
    .c-btn {
      height: 44px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .c-btn:hover { background: #f9fafb; border-color: #d1d5db; }
    .call-btn { color: #dc2626; }
    .sms-btn { color: #dc2626; }
    .wa-btn { color: #10b981; }

    .stat-card {
      border: 1.5px solid #f3f4f6;
      border-radius: 20px;
      padding: 30px;
      background: white;
      margin-bottom: 30px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
    }
    .stat-header { margin-bottom: 24px; }
    .stat-header h3 { margin: 0; font-size: 20px; font-weight: 800; color: #111827; }
    .stat-header a { font-size: 14px; color: #0f766e; font-weight: 600; text-decoration: none; }
    .stat-header p { margin: 8px 0 0; font-size: 13px; color: #6b7280; }

    .stat-list { display: flex; flex-direction: column; gap: 24px; }
    .stat-item { display: flex; align-items: center; gap: 20px; }
    .stat-icon {
      width: 54px;
      height: 54px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    .blue-box { background: #eff6ff; color: #3b82f6; }
    .red-box { background: #fef2f2; color: #ef4444; }
    .stat-val { font-size: 20px; font-weight: 800; color: #111827; }
    .stat-lbl { font-size: 13px; color: #6b7280; font-weight: 500; }

    .date-scroll {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }
    .date-card {
      flex: 1;
      border: 1.5px solid #f3f4f6;
      border-radius: 14px;
      padding: 15px 10px;
      text-align: center;
      cursor: pointer;
    }
    .date-card.active { border-color: #0f766e; background: #f0fdfa; }
    .d-day { font-size: 11px; font-weight: 800; color: #6b7280; margin-bottom: 4px; }
    .d-date { font-size: 15px; font-weight: 800; color: #111827; margin-bottom: 4px; }
    .d-slots { font-size: 12px; font-weight: 700; color: #10b981; }

    .time-slots { margin-top: 30px; }
    .time-label { font-size: 14px; font-weight: 800; color: #111827; margin-bottom: 15px; }
    .slots-row { display: flex; gap: 12px; }
    .t-slot {
      flex: 1;
      height: 54px;
      border: 1.5px solid #e5e7eb;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 16px;
      color: #111827;
      cursor: pointer;
    }
    .t-slot.active { border-color: #111827; background: #f9fafb; }

    .book-session-btn {
      width: 100%;
      height: 60px;
      background: #0f766e;
      color: white;
      border: none;
      border-radius: 14px;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }
    .book-session-btn:hover { background: #0d645d; }

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
      .content-grid { grid-template-columns: 1fr; }
      .profile-header-content { flex-direction: column; align-items: center; text-align: center; margin-top: -90px; }
      .header-main { flex-direction: column; gap: 20px; }
      .name-row { justify-content: center; }
    }
  `]
})
export class DriverProfileComponent implements OnInit {
  activeTab: string = 'overview';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void { }
  onAvatarError(event: any) {
    event.target.src = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
  }
  onCarImageError(event: any) {
    event.target.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Car+Image';
  }
}
