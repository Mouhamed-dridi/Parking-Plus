import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

interface Car {
  id: number;
  name: string;
  type: 'DG cars' | 'Pickup' | 'Delivery';
  transmission: 'Auto' | 'Manual';
  fuel: 'Diesel' | 'Petrol' | 'Electric';
  image: string;
}

@Component({
  selector: 'app-request-car',
  standalone: true,
  imports: [CommonModule, FormsModule, NzGridModule, NzButtonModule, NzIconModule, NzInputModule, NzTypographyModule],
  template: `
    <div class="page-container" *ngIf="!bookingSubmitted">
      <!-- HEADER -->
      <div class="page-header">
        <div class="header-titles">
          <h1 nz-typography>Request a Vehicle</h1>
          <p nz-typography class="subtitle">Book a vehicle for company cargo delivery, client visits, or logistics</p>
        </div>
      </div>

      <!-- CENTRED MAIN LAYOUT GRID -->
      <div nz-row class="booking-layout">
        <div nz-col nzXs="24" nzMd="20" nzLg="16" class="form-container">
          
          <!-- CUSTOM STEPPER HEADERS -->
          <div class="stepper-header">
            <div class="step-indicator" [class.active]="currentStep >= 1" [class.completed]="currentStep > 1">
              <span class="step-num" *ngIf="currentStep <= 1">1</span>
              <span class="step-check" *ngIf="currentStep > 1"><span nz-icon nzType="check"></span></span>
              <span class="step-text">Driver Info</span>
            </div>
            <div class="step-line" [class.filled]="currentStep > 1"></div>
            <div class="step-indicator" [class.active]="currentStep >= 2" [class.completed]="currentStep > 2">
              <span class="step-num" *ngIf="currentStep <= 2">2</span>
              <span class="step-check" *ngIf="currentStep > 2"><span nz-icon nzType="check"></span></span>
              <span class="step-text">Choose Vehicle</span>
            </div>
            <div class="step-line" [class.filled]="currentStep > 2"></div>
            <div class="step-indicator" [class.active]="currentStep >= 3" [class.completed]="currentStep > 3">
              <span class="step-num">3</span>
              <span class="step-text">Route & Time</span>
            </div>
          </div>

          <!-- FORM SLIDE WRAPPER -->
          <div class="form-card">
            <!-- STEP 1: DRIVER INFO -->
            <div class="step-content" *ngIf="currentStep === 1">
              <h2 class="step-title">Driver & Request Details</h2>
              <p class="step-desc">Provide dispatcher details and mandatory driver authorization cards.</p>
              
              <div class="form-grid">
                <div class="form-item">
                  <label class="required-label">Full Name</label>
                  <nz-input-group [nzPrefix]="userIcon">
                    <input type="text" nz-input placeholder="e.g. John Doe" [(ngModel)]="bookingData.name" name="name" />
                  </nz-input-group>
                  <ng-template #userIcon><span nz-icon nzType="user" style="color: #94a3b8;"></span></ng-template>
                </div>

                <div class="form-item">
                  <label class="required-label">Email Address</label>
                  <nz-input-group [nzPrefix]="mailIcon">
                    <input type="email" nz-input placeholder="e.g. john.doe@company.com" [(ngModel)]="bookingData.email" name="email" />
                  </nz-input-group>
                  <ng-template #mailIcon><span nz-icon nzType="mail" style="color: #94a3b8;"></span></ng-template>
                </div>

                <div class="form-item">
                  <label>Department / Group</label>
                  <nz-input-group [nzPrefix]="teamIcon">
                    <input type="text" nz-input placeholder="e.g. Logistics, Sales, Tech" [(ngModel)]="bookingData.department" name="department" />
                  </nz-input-group>
                  <ng-template #teamIcon><span nz-icon nzType="team" style="color: #94a3b8;"></span></ng-template>
                </div>

                <!-- DRIVER MANDATORY PERMITS -->
                <div class="form-item">
                  <label class="required-label">Driver Permits & Cards</label>
                  <div class="toggle-cards-row">
                    <!-- License Card -->
                    <div class="toggle-card" [class.active]="bookingData.hasLicense" (click)="bookingData.hasLicense = !bookingData.hasLicense">
                      <div class="toggle-card-icon"><span nz-icon nzType="idcard" nzTheme="outline"></span></div>
                      <div class="toggle-card-text">
                        <span class="card-title">Driver License</span>
                        <span class="card-status">{{ bookingData.hasLicense ? 'Valid License' : 'No License' }}</span>
                      </div>
                      <div class="toggle-indicator">
                        <span nz-icon nzType="check-circle" nzTheme="fill" *ngIf="bookingData.hasLicense"></span>
                        <span nz-icon nzType="close-circle" nzTheme="fill" *ngIf="!bookingData.hasLicense" class="off"></span>
                      </div>
                    </div>

                    <!-- Shell Card -->
                    <div class="toggle-card" [class.active]="bookingData.hasShellCard" (click)="bookingData.hasShellCard = !bookingData.hasShellCard">
                      <div class="toggle-card-icon"><span nz-icon nzType="credit-card" nzTheme="outline"></span></div>
                      <div class="toggle-card-text">
                        <span class="card-title">VIP Shell Card</span>
                        <span class="card-status">{{ bookingData.hasShellCard ? 'Card Assigned' : 'No Shell Card' }}</span>
                      </div>
                      <div class="toggle-indicator">
                        <span nz-icon nzType="check-circle" nzTheme="fill" *ngIf="bookingData.hasShellCard"></span>
                        <span nz-icon nzType="close-circle" nzTheme="fill" *ngIf="!bookingData.hasShellCard" class="off"></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-item span-full">
                  <label class="required-label">Purpose of Request</label>
                  <textarea class="custom-textarea" placeholder="Describe the cargo, delivery goals, or dispatch reason..." [(ngModel)]="bookingData.purpose" rows="3"></textarea>
                </div>
              </div>
            </div>

            <!-- STEP 2: CHOOSE VEHICLE -->
            <div class="step-content" *ngIf="currentStep === 2">
              <h2 class="step-title">Select a Fleet Vehicle</h2>
              <p class="step-desc">Choose a vehicle category and browse the available, corporate-maintained fleet.</p>

              <!-- Category Pills -->
              <div class="categories-container">
                <div class="category-pill" 
                     *ngFor="let cat of categories" 
                     [class.active]="selectedCategory === cat.value"
                     (click)="setCategory(cat.value)">
                  <span nz-icon [nzType]="cat.icon" nzTheme="outline"></span>
                  <span>{{ cat.label }}</span>
                </div>
              </div>

              <!-- Cars Grid -->
              <div class="cars-scroll-grid">
                <div class="vehicle-card" 
                     *ngFor="let car of filteredCars" 
                     [class.selected]="bookingData.selectedCar?.id === car.id"
                     (click)="selectCar(car)">
                  <div class="card-image-wrap">
                    <img [src]="car.image" [alt]="car.name" />
                    <div class="selected-badge" *ngIf="bookingData.selectedCar?.id === car.id">
                      <span nz-icon nzType="check-circle" nzTheme="fill"></span> Selected
                    </div>
                  </div>
                  <div class="card-details">
                    <span class="car-type-badge">{{ car.type }}</span>
                    <h3 class="car-name">{{ car.name }}</h3>
                    <div class="car-meta">
                      <span><span nz-icon nzType="interaction"></span> {{ car.transmission }}</span>
                      <span><span nz-icon nzType="dashboard"></span> {{ car.fuel }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- STEP 3: ROUTE & TRAVEL SCHEDULER -->
            <div class="step-content" *ngIf="currentStep === 3">
              <h2 class="step-title">Route & Time Logistics</h2>
              <p class="step-desc">Define your starting base, destination, and dispatch windows.</p>

              <div class="form-grid">
                <div class="form-item">
                  <label class="required-label">Source / Origin Address</label>
                  <nz-input-group [nzPrefix]="sourceIcon">
                    <input type="text" nz-input placeholder="e.g. Dallas Corporate Hub" [(ngModel)]="bookingData.source" />
                  </nz-input-group>
                  <ng-template #sourceIcon><span nz-icon nzType="environment" style="color: #3b82f6;"></span></ng-template>
                </div>

                <div class="form-item">
                  <label class="required-label">Destination Address</label>
                  <nz-input-group [nzPrefix]="destIcon">
                    <input type="text" nz-input placeholder="e.g. Manhattan Terminal" [(ngModel)]="bookingData.destination" />
                  </nz-input-group>
                  <ng-template #destIcon><span nz-icon nzType="environment" style="color: #ef4444;"></span></ng-template>
                </div>

                <div class="form-item">
                  <label class="required-label">Departure Date & Time</label>
                  <input type="datetime-local" class="custom-datetime" [(ngModel)]="bookingData.departureTime" />
                </div>

                <div class="form-item">
                  <label class="required-label">Estimated Return Date & Time</label>
                  <input type="datetime-local" class="custom-datetime" [(ngModel)]="bookingData.arrivalTime" />
                </div>
              </div>
            </div>

            <!-- FOOTER NAVIGATION BUTTONS -->
            <div class="form-footer">
              <button nz-button nzType="default" class="nav-btn prev" *ngIf="currentStep > 1" (click)="prevStep()">
                <span nz-icon nzType="arrow-left"></span> Back
              </button>
              <div style="flex-grow: 1;"></div>
              <button nz-button nzType="primary" class="nav-btn next" 
                      *ngIf="currentStep < 3" 
                      [disabled]="!isStepValid(currentStep)"
                      (click)="nextStep()">
                Continue <span nz-icon nzType="arrow-right"></span>
              </button>
              <button nz-button nzType="primary" class="nav-btn submit-btn" 
                      *ngIf="currentStep === 3" 
                      [disabled]="!isStepValid(3)"
                      (click)="submitBooking()">
                Confirm & Request <span nz-icon nzType="send"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SUCCESS GLASS RECEIPT VIEW -->
    <div class="success-screen" *ngIf="bookingSubmitted">
      <div class="success-card">
        <div class="success-header">
          <div class="check-container">
            <span nz-icon nzType="check-circle" nzTheme="fill"></span>
          </div>
          <h1>Booking Successfully Requested!</h1>
          <p class="sub">Your vehicle request is registered and pending corporate dispatcher approval.</p>
        </div>

        <div class="receipt-glass">
          <div class="receipt-top-row">
            <div>
              <span class="r-logo">P+</span>
              <span class="r-comp">Park+ Logistics</span>
            </div>
            <span class="receipt-id">REF: #{{ bookingRefId }}</span>
          </div>

          <div class="receipt-grid">
            <div class="r-item">
              <span class="r-lbl">REQUESTER</span>
              <span class="r-val">{{ bookingData.name }}</span>
              <span class="r-sub">{{ bookingData.email }}</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">VEHICLE ASSIGNED</span>
              <span class="r-val">{{ bookingData.selectedCar?.name }}</span>
              <span class="r-sub">{{ bookingData.selectedCar?.type }} ({{ bookingData.selectedCar?.transmission }})</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">DRIVER LICENSE STATUS</span>
              <span class="r-val" [style.color]="bookingData.hasLicense ? '#10b981' : '#ef4444'">
                <span nz-icon [nzType]="bookingData.hasLicense ? 'check-circle' : 'close-circle'"></span>
                {{ bookingData.hasLicense ? ' Valid License' : ' No Valid License' }}
              </span>
            </div>
            <div class="r-item">
              <span class="r-lbl">VIP SHELL FUEL CARD</span>
              <span class="r-val" [style.color]="bookingData.hasShellCard ? '#3b82f6' : '#64748b'">
                <span nz-icon [nzType]="bookingData.hasShellCard ? 'check-circle' : 'close-circle'"></span>
                {{ bookingData.hasShellCard ? ' VIP Fuel Card' : ' No Fuel Card' }}
              </span>
            </div>
            <div class="r-item">
              <span class="r-lbl">DEPARTURE</span>
              <span class="r-val">{{ formatDateTime(bookingData.departureTime) }}</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">EST. RETURN</span>
              <span class="r-val">{{ formatDateTime(bookingData.arrivalTime) }}</span>
            </div>
            <div class="r-item span-2">
              <span class="r-lbl">ROUTE PLANNED</span>
              <span class="r-val">{{ bookingData.source }} ➔ {{ bookingData.destination }}</span>
            </div>
            <div class="r-item span-2">
              <span class="r-lbl">AUDITED DESCRIPTION</span>
              <span class="r-val italic-desc">"{{ bookingData.purpose }}"</span>
            </div>
          </div>

          <div class="receipt-divider">
            <span class="notch left"></span>
            <span class="d-line"></span>
            <span class="notch right"></span>
          </div>

          <div class="receipt-footer">
            <div class="barcode-wrap">
              <div class="visual-barcode"></div>
              <span class="barcode-text">BK-REF-{{ bookingRefId }}</span>
            </div>
          </div>
        </div>

        <div class="success-actions">
          <button class="action-btn outline-btn" (click)="printReceipt()">
            <span nz-icon nzType="printer" nzTheme="outline"></span> Print Request
          </button>
          <button class="action-btn fill-btn" (click)="resetBooking()">
            Book Another Vehicle
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background: #f8fafc;
      min-height: 100vh;
      padding: 32px;
      font-family: 'Inter', sans-serif;
    }

    .page-header {
      margin-bottom: 32px;
    }

    h1 {
      font-size: 32px;
      margin: 0;
      color: var(--text-dark);
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .subtitle {
      color: #94a3b8;
      margin: 8px 0 0 0;
      font-size: 14px;
    }

    .booking-layout {
      margin-top: 16px;
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .form-container {
      max-width: 860px;
      width: 100%;
    }

    /* STEPPER */
    .stepper-header {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 12px;
      padding: 18px 24px;
      margin-bottom: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
      border: 1px solid #f1f5f9;
    }

    .step-indicator {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #94a3b8;
      font-weight: 600;
      font-size: 14px;
    }

    .step-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f1f5f9;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 700;
      transition: all 0.3s;
    }

    .step-check {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #10b981;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .step-indicator.active {
      color: var(--primary-color);
    }
    .step-indicator.active .step-num {
      background: #eff6ff;
      color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(37,99,235,0.1);
    }

    .step-indicator.completed {
      color: #1e293b;
    }

    .step-line {
      flex: 1;
      height: 2px;
      background: #f1f5f9;
      margin: 0 16px;
      transition: all 0.3s;
    }
    .step-line.filled {
      background: #cbd5e1;
    }

    /* FORM CARD */
    .form-card {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      border: 1px solid #f1f5f9;
      min-height: 480px;
      display: flex;
      flex-direction: column;
    }

    .step-title {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px 0;
    }

    .step-desc {
      font-size: 13px;
      color: #94a3b8;
      margin: 0 0 28px 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      flex-grow: 1;
    }

    .form-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-item.span-full {
      grid-column: span 2;
    }

    label {
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .required-label::after {
      content: ' *';
      color: #ef4444;
    }

    .custom-textarea {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px;
      font-size: 14px;
      color: #1e293b;
      background: #f8fafc;
      transition: all 0.2s;
      outline: none;
      resize: vertical;
    }
    .custom-textarea:focus {
      border-color: var(--primary-color);
      background: white;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
    }

    .custom-datetime {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 14px;
      color: #1e293b;
      background: #f8fafc;
      transition: all 0.2s;
      outline: none;
      height: 40px;
    }
    .custom-datetime:focus {
      border-color: var(--primary-color);
      background: white;
      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
    }

    .form-card input[nz-input] {
      height: 40px;
      border-radius: 8px;
      background: #f8fafc;
    }
    .form-card input[nz-input]:focus {
      background: white;
    }

    /* DRIVER LICENSE & VIP CARDS ROW */
    .toggle-cards-row {
      display: flex;
      gap: 12px;
      width: 100%;
    }
    .toggle-card {
      flex: 1;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      background: #fafafa;
      transition: all 0.2s;
      user-select: none;
    }
    .toggle-card:hover {
      border-color: #cbd5e1;
      background: white;
    }
    .toggle-card.active {
      border-color: var(--primary-color);
      background: #eff6ff;
    }
    .toggle-card-icon {
      font-size: 20px;
      color: #64748b;
      display: flex;
      align-items: center;
    }
    .toggle-card.active .toggle-card-icon {
      color: var(--primary-color);
    }
    .toggle-card-text {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-width: 0;
    }
    .toggle-card-text .card-title {
      font-size: 11px;
      font-weight: 700;
      color: #1e293b;
    }
    .toggle-card-text .card-status {
      font-size: 10px;
      color: #64748b;
      font-weight: 500;
      margin-top: 2px;
    }
    .toggle-card.active .toggle-card-text .card-status {
      color: var(--primary-color);
      font-weight: 600;
    }
    .toggle-indicator {
      font-size: 16px;
      color: #10b981;
      display: flex;
      align-items: center;
    }
    .toggle-indicator .off {
      color: #94a3b8;
    }

    .form-footer {
      display: flex;
      align-items: center;
      margin-top: auto;
      padding-top: 32px;
      border-top: 1px solid #f1f5f9;
    }

    .nav-btn {
      height: 42px;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .nav-btn.next, .nav-btn.submit-btn {
      background: var(--primary-color);
      border-color: var(--primary-color);
    }
    .nav-btn.next:hover, .nav-btn.submit-btn:hover {
      background: #1d4ed8 !important;
      border-color: #1d4ed8 !important;
    }
    .nav-btn.submit-btn {
      background: #10b981;
      border-color: #10b981;
    }
    .nav-btn.submit-btn:hover {
      background: #059669 !important;
      border-color: #059669 !important;
    }

    /* STEP 2 CATEGORIES */
    .categories-container {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .category-pill {
      padding: 10px 18px;
      border-radius: 20px;
      background: #f1f5f9;
      color: #475569;
      font-size: 13px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .category-pill:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
    .category-pill.active {
      background: var(--primary-color);
      color: white;
      box-shadow: 0 4px 12px rgba(42, 114, 250, 0.2);
    }

    /* VEHICLE GRID */
    .cars-scroll-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      max-height: 330px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .vehicle-card {
      border: 1.5px solid #f1f5f9;
      border-radius: 12px;
      padding: 14px;
      display: flex;
      gap: 14px;
      cursor: pointer;
      transition: all 0.2s;
      background: #fafafa;
    }
    .vehicle-card:hover {
      border-color: #cbd5e1;
      background: white;
      transform: translateY(-1px);
    }
    .vehicle-card.selected {
      border-color: var(--primary-color);
      background: #eff6ff;
    }

    .card-image-wrap {
      width: 110px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      position: relative;
    }
    .card-image-wrap img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .selected-badge {
      position: absolute;
      top: -6px;
      left: -6px;
      background: #10b981;
      color: white;
      font-size: 9px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    .card-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      flex-grow: 1;
    }
    .car-type-badge {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #94a3b8;
    }
    .car-name {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      margin: 2px 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .car-meta {
      display: flex;
      gap: 8px;
      font-size: 10px;
      color: #64748b;
    }
    .car-meta span {
      display: flex;
      align-items: center;
      gap: 2px;
    }

    /* SUCCESS SCREEN */
    .success-screen {
      background: linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }
    .success-card {
      max-width: 580px;
      width: 100%;
      text-align: center;
    }
    .success-header {
      margin-bottom: 30px;
    }
    .check-container {
      font-size: 64px;
      color: #10b981;
      margin-bottom: 12px;
    }
    .success-header h1 {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 8px;
    }
    .success-header .sub {
      color: #64748b;
      font-size: 14px;
      margin: 0;
    }

    /* GLASS RECEIPT */
    .receipt-glass {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(16px) saturate(120%);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.06);
      text-align: left;
    }
    .receipt-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .r-logo {
      background: var(--primary-color);
      color: white;
      font-weight: 800;
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 6px;
      margin-right: 8px;
    }
    .r-comp {
      font-weight: 800;
      color: #0f172a;
      font-size: 15px;
    }
    .receipt-id {
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      background: rgba(0,0,0,0.04);
      padding: 4px 10px;
      border-radius: 6px;
    }

    .receipt-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px 16px;
    }
    .r-item {
      display: flex;
      flex-direction: column;
    }
    .r-item.span-2 {
      grid-column: span 2;
    }
    .r-lbl {
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .r-val {
      font-size: 14px;
      font-weight: 700;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .r-sub {
      font-size: 11px;
      color: #64748b;
      margin-top: 2px;
    }
    .italic-desc {
      font-style: italic;
      color: #475569;
      font-weight: 500;
      line-height: 1.5;
    }

    .receipt-divider {
      display: flex;
      align-items: center;
      position: relative;
      margin: 28px 0;
    }
    .receipt-divider .notch {
      width: 16px;
      height: 16px;
      background: #eff6ff; /* matches screen gradient */
      border-radius: 50%;
      position: absolute;
    }
    .receipt-divider .notch.left { left: -41px; clip-path: circle(50% at 100% 50%); }
    .receipt-divider .notch.right { right: -41px; clip-path: circle(50% at 0% 50%); }
    .receipt-divider .d-line {
      flex: 1;
      border-top: 1.5px dashed rgba(0,0,0,0.1);
    }

    .receipt-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
    
    .barcode-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }
    .visual-barcode {
      width: 180px;
      height: 40px;
      background: repeating-linear-gradient(
        90deg,
        #000,
        #000 2px,
        transparent 2px,
        transparent 5px,
        #000 5px,
        #000 7px
      );
    }
    .barcode-text {
      font-family: monospace;
      font-size: 10px;
      color: #64748b;
      font-weight: 600;
    }

    .success-actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-top: 32px;
    }
    .action-btn {
      height: 48px;
      padding: 0 24px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .outline-btn {
      background: white;
      border: 1.5px solid #cbd5e1;
      color: #475569;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .outline-btn:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }
    .fill-btn {
      background: var(--primary-color);
      border: none;
      color: white;
      box-shadow: 0 4px 14px rgba(42, 114, 250, 0.25);
    }
    .fill-btn:hover {
      background: #1d4ed8;
      box-shadow: 0 6px 20px rgba(42, 114, 250, 0.35);
    }

    /* Print styles to ensure official request document format when printed */
    @media print {
      body * {
        visibility: hidden;
      }
      .success-screen, .success-screen * {
        visibility: visible;
      }
      .success-screen {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        background: white !important;
      }
      .success-actions {
        display: none !important;
      }
      .receipt-glass {
        border: none !important;
        box-shadow: none !important;
        background: white !important;
        backdrop-filter: none !important;
      }
      .receipt-divider .notch {
        display: none !important;
      }
    }
  `]
})
export class RequestCarComponent {
  currentStep = 1;
  bookingSubmitted = false;
  bookingRefId = '';
  selectedCategory = 'DG cars';

  bookingData: {
    name: string;
    email: string;
    department: string;
    purpose: string;
    hasLicense: boolean;
    hasShellCard: boolean;
    selectedCar: Car | null;
    source: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
  } = {
    name: '',
    email: '',
    department: '',
    purpose: '',
    hasLicense: true,
    hasShellCard: false,
    selectedCar: null,
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: ''
  };

  categories = [
    { label: 'DG Cars', value: 'DG cars', icon: 'car' },
    { label: 'Pickups', value: 'Pickup', icon: 'audit' },
    { label: 'Delivery Vans', value: 'Delivery', icon: 'shop' }
  ];

  cars: Car[] = [
    { id: 1, name: 'Blue Audi (PSD)', type: 'DG cars', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/DGcars/a5 audi.png' },
    { id: 2, name: 'Bentley Bentayga', type: 'DG cars', transmission: 'Auto', fuel: 'Petrol', image: '/images/cars/DGcars/bdw.avif' },
    { id: 3, name: 'Porsche Taycan', type: 'DG cars', transmission: 'Auto', fuel: 'Electric', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif' },
    { id: 4, name: 'Mercedes J Class', type: 'DG cars', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/DGcars/jclass.png' },
    { id: 5, name: 'Isuzu D-Max', type: 'Pickup', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/pickup/dmax.png' },
    { id: 6, name: 'Tata Xenon Pickup', type: 'Pickup', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/pickup/tata-xenon-south-africa.avif' },
    { id: 7, name: 'Toyota Hilux 4x4', type: 'Pickup', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/pickup/hylex.png' },
    { id: 8, name: 'VW Caddy Cargo', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/caddy.webp' },
    { id: 9, name: 'Renault Dokker Van', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/docker.webp' },
    { id: 10, name: 'Peugeot Partner', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/partiner.webp' },
    { id: 11, name: 'Peugeot Partner Pro', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/partnier.avif' }
  ];

  filteredCars: Car[] = [];

  constructor() {
    this.filterCars();
  }

  setCategory(val: string) {
    this.selectedCategory = val;
    this.filterCars();
  }

  filterCars() {
    this.filteredCars = this.cars.filter(car => car.type.toLowerCase() === this.selectedCategory.toLowerCase());
  }

  selectCar(car: Car) {
    this.bookingData.selectedCar = car;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(step: number): boolean {
    if (step === 1) {
      return !!(this.bookingData.name.trim() && this.bookingData.email.trim() && this.bookingData.purpose.trim() && this.bookingData.hasLicense);
    }
    if (step === 2) {
      return !!this.bookingData.selectedCar;
    }
    if (step === 3) {
      return !!(this.bookingData.source.trim() && this.bookingData.destination.trim() && this.bookingData.departureTime && this.bookingData.arrivalTime);
    }
    return false;
  }

  formatDateTime(val: string): string {
    if (!val) return 'Not set';
    const date = new Date(val);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  submitBooking() {
    if (!this.isStepValid(1) || !this.isStepValid(2) || !this.isStepValid(3)) return;
    
    // Generate simulated reference ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const regionSuffix = this.bookingData.destination.substring(0, 2).toUpperCase() || 'US';
    this.bookingRefId = `BK-${randomNum}-${regionSuffix}`;
    
    this.bookingSubmitted = true;
  }

  printReceipt() {
    window.print();
  }

  resetBooking() {
    this.bookingSubmitted = false;
    this.currentStep = 1;
    this.bookingRefId = '';
    this.bookingData = {
      name: '',
      email: '',
      department: '',
      purpose: '',
      hasLicense: true,
      hasShellCard: false,
      selectedCar: null,
      source: '',
      destination: '',
      departureTime: '',
      arrivalTime: ''
    };
    this.selectedCategory = 'DG cars';
    this.filterCars();
  }
}
