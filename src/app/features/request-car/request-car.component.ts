import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import jsPDF from 'jspdf';
import { BookingService } from '../../core/services/booking.service';

interface Car {
  id: number;
  name: string;
  type: 'Car' | 'Delivery Car' | 'Used Car';
  transmission: 'Auto' | 'Manual';
  fuel: 'Diesel' | 'Petrol' | 'Electric';
  image: string;
}

@Component({
  selector: 'app-request-car',
  standalone: true,
  imports: [CommonModule, FormsModule, NzGridModule, NzButtonModule, NzIconModule, NzInputModule, NzSelectModule, NzTypographyModule],
  template: `
    <div class="page-container" *ngIf="!bookingSubmitted">
      <!-- HEADER -->
      <div class="page-header">
        <div class="header-titles">
          <h1 nz-typography>Request a Vehicle</h1>
          <p nz-typography class="subtitle">Book a vehicle for company deliveries or client visits</p>
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
              <span class="step-text">Car Type</span>
            </div>
            <div class="step-line" [class.filled]="currentStep > 2"></div>
            <div class="step-indicator" [class.active]="currentStep >= 3" [class.completed]="currentStep > 3">
              <span class="step-num" *ngIf="currentStep <= 3">3</span>
              <span class="step-check" *ngIf="currentStep > 3"><span nz-icon nzType="check"></span></span>
              <span class="step-text">Pick Vehicle</span>
            </div>
            <div class="step-line" [class.filled]="currentStep > 3"></div>
            <div class="step-indicator" [class.active]="currentStep >= 4">
              <span class="step-num">4</span>
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
                  <label>Department</label>
                  <nz-select [(ngModel)]="bookingData.department" nzPlaceHolder="Select a department" name="department" style="width: 100%;">
                    <nz-option *ngFor="let dept of departments" [nzLabel]="dept" [nzValue]="dept"></nz-option>
                  </nz-select>
                </div>

                <div class="form-item">
                  <label class="required-label">Phone Number</label>
                  <nz-input-group [nzPrefix]="phoneIcon">
                    <input type="tel" nz-input placeholder="e.g. +216 55 123 456" [(ngModel)]="bookingData.phone" name="phone" />
                  </nz-input-group>
                  <ng-template #phoneIcon><span nz-icon nzType="phone" style="color: #94a3b8;"></span></ng-template>
                </div>

                <!-- DRIVER MANDATORY PERMITS -->
                <div class="form-item">
                  <label class="required-label">Driver Permits & Cards</label>
                  <div class="toggle-cards-row">
                    <!-- License Card -->
                    <div class="toggle-card" [class.active]="bookingData.hasLicense" (click)="bookingData.hasLicense = !bookingData.hasLicense">
                      <div class="toggle-indicator">
                        <span nz-icon nzType="check-circle" nzTheme="fill" *ngIf="bookingData.hasLicense"></span>
                      </div>
                      <div class="toggle-card-icon"><span nz-icon nzType="idcard" nzTheme="outline"></span></div>
                      <div class="toggle-card-text">
                        <span class="card-title">Driver License</span>
                        <span class="card-status">{{ bookingData.hasLicense ? 'Valid License' : 'No License' }}</span>
                      </div>
                    </div>

                    <!-- Shell Card -->
                    <div class="toggle-card" [class.active]="bookingData.hasShellCard" (click)="bookingData.hasShellCard = !bookingData.hasShellCard">
                      <div class="toggle-indicator">
                        <span nz-icon nzType="check-circle" nzTheme="fill" *ngIf="bookingData.hasShellCard"></span>
                      </div>
                      <div class="toggle-card-icon"><span nz-icon nzType="credit-card" nzTheme="outline"></span></div>
                      <div class="toggle-card-text">
                        <span class="card-title">VIP Shell Card</span>
                        <span class="card-status">{{ bookingData.hasShellCard ? 'Card Assigned' : 'No Shell Card' }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-item span-full">
                  <label class="required-label">Purpose of Request</label>
                  <textarea class="custom-textarea" placeholder="Describe the delivery goals or dispatch reason..." [(ngModel)]="bookingData.purpose" rows="3"></textarea>
                </div>
              </div>
            </div>

            <!-- STEP 2: CHOOSE CAR TYPE -->
            <div class="step-content" *ngIf="currentStep === 2">
              <h2 class="step-title">Choose Vehicle Type</h2>
              <p class="step-desc">Select the category of vehicle you need for your trip.</p>
              <div class="type-cards">
                <div class="type-card" [class.active]="selectedCategory === 'Delivery Car'" (click)="selectedCategory = 'Delivery Car'">
                  <span nz-icon nzType="shop" nzTheme="outline" class="type-icon"></span>
                  <span class="type-label">Delivery Vans</span>
                  <span class="type-count">{{ deliveryCars.length }} available</span>
                </div>
                <div class="type-card" [class.active]="selectedCategory === 'Used Car'" (click)="selectedCategory = 'Used Car'">
                  <span nz-icon nzType="car" nzTheme="outline" class="type-icon"></span>
                  <span class="type-label">Used Cars</span>
                  <span class="type-count">{{ usedCars.length }} available</span>
                </div>
              </div>
            </div>

            <!-- STEP 3: PICK VEHICLE -->
            <div class="step-content" *ngIf="currentStep === 3">
              <h2 class="step-title">{{ selectedCategory === 'Used Car' ? 'Select a Used Car' : 'Select a Delivery Van' }}</h2>
              <p class="step-desc">Pick a specific vehicle from the {{ selectedCategory === 'Used Car' ? 'used car' : 'delivery van' }} fleet.</p>
              <div class="cat-panel">
                <div class="cat-grid">
                  <div class="vehicle-card"
                       *ngFor="let car of filteredByCategory"
                       [class.selected]="bookingData.selectedCar?.id === car.id"
                       (click)="selectCar(car)">
                    <div class="card-image-wrap">
                      <img [src]="car.image" [alt]="car.name" />
                      <div class="selected-badge" *ngIf="bookingData.selectedCar?.id === car.id">
                        <span nz-icon nzType="check-circle" nzTheme="fill"></span>
                      </div>
                    </div>
                    <div class="card-details">
                      <h3 class="car-name">{{ car.name }}</h3>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- STEP 4: ROUTE & TRAVEL SCHEDULER -->
            <div class="step-content" *ngIf="currentStep === 4">
              <h2 class="step-title">Route & Time Logistics</h2>
              <p class="step-desc">Define your starting base, destination, and dispatch windows.</p>

              <div class="form-grid">
                <div class="form-item">
                  <label class="required-label">Source / Origin Address</label>
                  <nz-select [(ngModel)]="bookingData.source" nzPlaceHolder="Select a region" style="width: 100%;">
                    <nz-option *ngFor="let r of tunisianRegions" [nzLabel]="r" [nzValue]="r"></nz-option>
                  </nz-select>
                </div>

                <div class="form-item">
                  <label class="required-label">Destination Address</label>
                  <nz-select [(ngModel)]="bookingData.destination" nzPlaceHolder="Select a region" style="width: 100%;">
                    <nz-option *ngFor="let r of tunisianRegions" [nzLabel]="r" [nzValue]="r"></nz-option>
                  </nz-select>
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
                      *ngIf="currentStep < 4" 
                      [disabled]="!isStepValid(currentStep)"
                      (click)="nextStep()">
                Continue <span nz-icon nzType="arrow-right"></span>
              </button>
              <button nz-button nzType="primary" class="nav-btn submit-btn" 
                      *ngIf="currentStep === 4" 
                      [disabled]="!isStepValid(4)"
                      (click)="submitBooking()">
                Confirm & Request <span nz-icon nzType="send"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SUCCESS RECEIPT VIEW -->
    <div class="success-screen" *ngIf="bookingSubmitted">
      <div class="success-card">
        <div class="success-header">
          <div class="check-container">
            <span nz-icon nzType="check-circle" nzTheme="fill"></span>
          </div>
          <h1>Booking Successfully Requested!</h1>
          <p class="sub">Your vehicle request is registered and pending corporate dispatcher approval.</p>
        </div>

        <div class="receipt-card">
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
              <span class="r-sub">{{ bookingData.phone }}</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">DEPARTMENT</span>
              <span class="r-val">{{ bookingData.department }}</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">VEHICLE ASSIGNED</span>
              <span class="r-val">{{ bookingData.selectedCar?.name }}</span>
              <span class="r-sub">{{ bookingData.selectedCar?.type }} ({{ bookingData.selectedCar?.transmission }})</span>
            </div>
            <div class="r-item">
              <span class="r-lbl">DRIVER LICENSE STATUS</span>
              <span class="r-val" [style.color]="bookingData.hasLicense ? '#34a853' : '#d93025'">
                <span nz-icon [nzType]="bookingData.hasLicense ? 'check-circle' : 'close-circle'"></span>
                {{ bookingData.hasLicense ? ' Valid License' : ' No Valid License' }}
              </span>
            </div>
            <div class="r-item">
              <span class="r-lbl">VIP SHELL FUEL CARD</span>
              <span class="r-val" [style.color]="bookingData.hasShellCard ? '#1a73e8' : '#5f6368'">
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

          <div class="receipt-divider"><span class="d-line"></span></div>

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
    .page-container { min-height: 100vh; padding: 24px 28px; }
    .page-header { margin-bottom: 24px; }
    h1 { font-size: 22px; margin: 0; color: #202124; font-weight: 600; }
    .subtitle { color: #5f6368; margin: 4px 0 0; font-size: 13px; }
    .booking-layout { margin-top: 12px; display: flex; justify-content: center; width: 100%; }
    .form-container { max-width: 860px; width: 100%; }

    .stepper-header { display: flex; align-items: center; background: #fff; padding: 16px 24px; margin-bottom: 20px; border: 1px solid #e0e0e0; }
    .step-indicator { display: flex; align-items: center; gap: 8px; color: #9aa0a6; font-weight: 500; font-size: 13px; }
    .step-num { width: 24px; height: 24px; background: #f1f3f4; color: #9aa0a6; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; }
    .step-check { width: 24px; height: 24px; background: #34a853; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .step-indicator.active { color: #1a73e8; }
    .step-indicator.active .step-num { background: #1a73e8; color: #fff; }
    .step-indicator.completed { color: #202124; }
    .step-line { flex: 1; height: 2px; background: #e0e0e0; margin: 0 12px; }
    .step-line.filled { background: #1a73e8; }

    .form-card { background: #fff; padding: 28px; border: 1px solid #e0e0e0; min-height: 440px; display: flex; flex-direction: column; }
    .step-title { font-size: 18px; font-weight: 600; color: #202124; margin: 0 0 6px 0; }
    .step-desc { font-size: 13px; color: #5f6368; margin: 0 0 24px 0; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; flex-grow: 1; }
    .form-item { display: flex; flex-direction: column; gap: 6px; }
    .form-item.span-full { grid-column: span 2; }
    label { font-size: 11px; font-weight: 500; color: #5f6368; text-transform: uppercase; }
    .required-label::after { content: ' *'; color: #d93025; font-size: 11px; }

    .custom-textarea { border: 1px solid #e0e0e0; padding: 10px 12px; font-size: 13px; color: #202124; background: #f8f9fa; outline: none; resize: vertical; }
    .custom-textarea:focus { border-color: #1a73e8; background: #fff; }
    .custom-datetime { border: 1px solid #e0e0e0; padding: 10px 12px; font-size: 13px; color: #202124; background: #f8f9fa; outline: none; height: 36px; }
    .custom-datetime:focus { border-color: #1a73e8; background: #fff; }
    .form-card input[nz-input] { height: 36px; }

    .toggle-cards-row { display: flex; gap: 10px; }
    .toggle-card { flex: 1; border: 1px solid #e0e0e0; padding: 12px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; background: #f8f9fa; position: relative; }
    .toggle-card:hover { border-color: #ccc; }
    .toggle-card.active { border-color: #1a73e8; background: #e8f0fe; }
    .toggle-card-icon { font-size: 20px; color: #9aa0a6; display: flex; align-items: center; flex-shrink: 0; }
    .toggle-card.active .toggle-card-icon { color: #1a73e8; }
    .toggle-card-text { display: flex; flex-direction: column; flex-grow: 1; min-width: 0; }
    .toggle-card-text .card-title { font-size: 12px; font-weight: 600; color: #202124; }
    .toggle-card-text .card-status { font-size: 11px; color: #5f6368; font-weight: 400; margin-top: 2px; }
    .toggle-card.active .toggle-card-text .card-status { color: #1a73e8; }
    .toggle-indicator { position: absolute; top: 6px; right: 6px; font-size: 16px; color: #34a853; display: flex; align-items: center; opacity: 0; }
    .toggle-card.active .toggle-indicator { opacity: 1; }

    .form-footer { display: flex; align-items: center; margin-top: auto; padding-top: 24px; border-top: 1px solid #e0e0e0; }
    .nav-btn { height: 36px; font-weight: 500; display: flex; align-items: center; gap: 6px; border: 1px solid #e0e0e0; background: #fff; color: #5f6368; }
    .nav-btn:hover { background: #f1f3f4; }
    .nav-btn.next { background: #1a73e8 !important; border-color: #1a73e8 !important; color: #fff !important; }
    .nav-btn.next:hover { background: #1557b0 !important; }
    .nav-btn.submit-btn { background: #1a73e8 !important; border-color: #1a73e8 !important; color: #fff !important; }
    .nav-btn.submit-btn:hover { background: #1557b0 !important; }

    .type-cards { display: flex; gap: 16px; margin-top: 12px; }
    .type-card { flex: 1; border: 1px solid #e0e0e0; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; cursor: pointer; background: #fff; }
    .type-card:hover { border-color: #ccc; background: #f8f9fa; }
    .type-card.active { border-color: #1a73e8; background: #e8f0fe; }
    .type-icon { font-size: 36px; color: #5f6368; }
    .type-card.active .type-icon { color: #1a73e8; }
    .type-label { font-size: 16px; font-weight: 600; color: #202124; }
    .type-count { font-size: 12px; color: #5f6368; }

    .cat-panel { border: 1px solid #e0e0e0; padding: 12px; max-height: 280px; overflow-y: auto; }
    .cat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .vehicle-card { border: 1px solid #e0e0e0; padding: 10px; display: flex; gap: 10px; cursor: pointer; background: #fff; }
    .vehicle-card:hover { border-color: #ccc; background: #f8f9fa; }
    .vehicle-card.selected { border-color: #1a73e8; background: #e8f0fe; }
    .card-image-wrap { width: 80px; height: 56px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; position: relative; }
    .card-image-wrap img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .selected-badge { position: absolute; top: -4px; left: -4px; background: #34a853; color: #fff; font-size: 9px; padding: 2px; display: flex; align-items: center; }
    .card-details { display: flex; flex-direction: column; justify-content: center; min-width: 0; flex-grow: 1; }
    .car-name { font-size: 12px; font-weight: 600; color: #202124; margin: 0 0 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }


    .success-screen { background: #f8f9fa; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; }
    .success-card { max-width: 580px; width: 100%; text-align: center; }
    .success-header { margin-bottom: 28px; }
    .check-container { font-size: 56px; color: #34a853; margin-bottom: 12px; }
    .success-header h1 { font-size: 22px; font-weight: 600; color: #202124; margin: 0 0 6px; }
    .success-header .sub { color: #5f6368; font-size: 13px; margin: 0; }

    .receipt-card { background: #fff; border: 1px solid #e0e0e0; padding: 28px; text-align: left; }
    .receipt-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .r-logo { background: #1a73e8; color: #fff; font-weight: 600; font-size: 13px; padding: 4px 8px; margin-right: 8px; }
    .r-comp { font-weight: 600; color: #202124; font-size: 14px; }
    .receipt-id { font-family: monospace; font-size: 11px; font-weight: 600; color: #5f6368; background: #f1f3f4; padding: 4px 10px; }

    .receipt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .r-item { display: flex; flex-direction: column; }
    .r-item.span-2 { grid-column: span 2; }
    .r-lbl { font-size: 9px; font-weight: 500; color: #5f6368; text-transform: uppercase; margin-bottom: 4px; }
    .r-val { font-size: 14px; font-weight: 600; color: #202124; display: flex; align-items: center; gap: 4px; }
    .r-sub { font-size: 11px; color: #5f6368; margin-top: 2px; }
    .italic-desc { font-style: italic; color: #5f6368; font-weight: 400; line-height: 1.5; }

    .receipt-divider { margin: 24px 0; }
    .d-line { display: block; border-top: 1px dashed #e0e0e0; }

    .receipt-footer { display: flex; justify-content: center; }
    .barcode-wrap { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .visual-barcode { width: 160px; height: 36px; background: repeating-linear-gradient(90deg,#000,#000 2px,transparent 2px,transparent 5px,#000 5px,#000 7px); }
    .barcode-text { font-family: monospace; font-size: 10px; color: #5f6368; font-weight: 500; }

    .success-actions { display: flex; justify-content: center; gap: 12px; margin-top: 28px; }
    .action-btn { height: 40px; padding: 0 20px; font-weight: 500; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
    .outline-btn { background: #fff; border: 1px solid #e0e0e0; color: #5f6368; }
    .outline-btn:hover { background: #f1f3f4; }
    .fill-btn { background: #1a73e8; border: 1px solid #1a73e8; color: #fff; }
    .fill-btn:hover { background: #1557b0; }

    @media print {
      body * { visibility: hidden; }
      .success-screen, .success-screen * { visibility: visible; }
      .success-screen { position: absolute; left: 0; top: 0; width: 100%; background: #fff !important; }
      .success-actions { display: none !important; }
      .receipt-card { border: none !important; background: #fff !important; }
    }
  `]
})
export class RequestCarComponent {
  private bookingService = inject(BookingService);

  currentStep = 1;
  bookingSubmitted = false;
  bookingRefId = '';
  selectedCategory = 'Car';

  departments = [
    'HR',
    'Maintenance',
    'DG',
    'Logistics',
    'Finance',
    'IT',
    'Sales',
    'Marketing',
    'Operations',
    'Admin'
  ];

  tunisianRegions = [
    'Tunis',
    'Sfax',
    'Sousse',
    'Nabeul',
    'Gabès',
    'Bizerte',
    'Kairouan',
    'Monastir',
    'Médenine',
    'Kasserine',
    'Mahdia',
    'Gafsa',
    'Tozeur',
    'Béja',
    'Jendouba',
    'Kef',
    'Siliana',
    'Sidi Bouzid',
    'Tataouine',
    'Médénine',
    'Djerba'
  ];

  bookingData: {
    name: string;
    email: string;
    phone: string;
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
    phone: '',
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

  allCars: Car[] = [
    { id: 1, name: 'Blue Audi (PSD)', type: 'Car', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/DGcars/a5 audi.png' },
    { id: 2, name: 'Bentley Bentayga', type: 'Car', transmission: 'Auto', fuel: 'Petrol', image: '/images/cars/DGcars/bdw.avif' },
    { id: 3, name: 'Porsche Taycan', type: 'Car', transmission: 'Auto', fuel: 'Electric', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif' },
    { id: 4, name: 'Mercedes E Class', type: 'Car', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/DGcars/jclass.png' },
    { id: 8, name: 'VW Caddy Cargo', type: 'Delivery Car', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/caddy.webp' },
    { id: 9, name: 'Renault Dokker Van', type: 'Delivery Car', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/docker.webp' },
    { id: 10, name: 'Peugeot Partner', type: 'Delivery Car', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/partiner.webp' },
    { id: 11, name: 'Peugeot Partner Pro', type: 'Delivery Car', transmission: 'Manual', fuel: 'Diesel', image: '/images/cars/deliver/partnier.avif' },
    { id: 12, name: 'Hyundai Elantra 2022', type: 'Used Car', transmission: 'Auto', fuel: 'Petrol', image: '/images/cars/usedfor_cars/hyd.jpg' },
    { id: 13, name: 'Kia Sportage 2023', type: 'Used Car', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/usedfor_cars/kia.png' },
    { id: 14, name: 'VW Passat 2021', type: 'Used Car', transmission: 'Auto', fuel: 'Diesel', image: '/images/cars/usedfor_cars/passat.avif' },
    { id: 15, name: 'Skoda Octavia 2022', type: 'Used Car', transmission: 'Manual', fuel: 'Petrol', image: '/images/cars/usedfor_cars/skoda.webp' }
  ];

  get cars(): Car[] { return this.allCars.filter(c => c.type === 'Car'); }
  get deliveryCars(): Car[] { return this.allCars.filter(c => c.type === 'Delivery Car'); }
  get usedCars(): Car[] { return this.allCars.filter(c => c.type === 'Used Car'); }
  get filteredByCategory(): Car[] { return this.allCars.filter(c => c.type === this.selectedCategory); }

  selectCar(car: Car) {
    this.bookingData.selectedCar = car;
  }

  nextStep() {
    if (this.currentStep < 4) {
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
      return !!this.selectedCategory;
    }
    if (step === 3) {
      return !!this.bookingData.selectedCar;
    }
    if (step === 4) {
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
    
    this.bookingRefId = this.bookingService.generateRefId();

    this.bookingService.addBooking({
      id: this.bookingRefId,
      refId: this.bookingRefId,
      name: this.bookingData.name,
      email: this.bookingData.email,
      phone: this.bookingData.phone,
      department: this.bookingData.department,
      purpose: this.bookingData.purpose,
      vehicleName: this.bookingData.selectedCar?.name || '',
      vehicleType: this.bookingData.selectedCar?.type || '',
      hasLicense: this.bookingData.hasLicense,
      hasShellCard: this.bookingData.hasShellCard,
      source: this.bookingData.source,
      destination: this.bookingData.destination,
      departureTime: this.bookingData.departureTime,
      arrivalTime: this.bookingData.arrivalTime,
      createdAt: new Date()
    });
    
    this.bookingSubmitted = true;
  }

  printReceipt() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(15, 118, 110);
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('Park+ Logistics', 20, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Vehicle Booking Request', 20, 28);
    doc.text('REF: #' + this.bookingRefId, pageWidth - 20, 28, { align: 'right' });

    doc.setTextColor(51, 51, 51);
    let y = 55;

    const drawField = (label: string, value: string) => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(107, 114, 128);
      doc.text(label, 20, y);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      doc.text(value || '-', 20, y + 6);
      y += 18;
    };

    const drawRow = (label1: string, val1: string, label2: string, val2: string) => {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(107, 114, 128);
      doc.text(label1, 20, y);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      doc.text(val1 || '-', 20, y + 6);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(107, 114, 128);
      doc.text(label2, pageWidth / 2 + 5, y);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(17, 24, 39);
      doc.text(val2 || '-', pageWidth / 2 + 5, y + 6);
      y += 18;
    };

    drawField('REQUESTER NAME', this.bookingData.name);
    drawRow('EMAIL', this.bookingData.email, 'PHONE', this.bookingData.phone);
    drawField('DEPARTMENT', this.bookingData.department);
    drawField('PURPOSE OF REQUEST', this.bookingData.purpose);

    doc.setDrawColor(229, 231, 235);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    drawField('VEHICLE ASSIGNED', (this.bookingData.selectedCar?.name || '') + ' (' + (this.bookingData.selectedCar?.type || '') + ')');
    drawRow(
      'DRIVER LICENSE', this.bookingData.hasLicense ? 'Valid' : 'Not Valid',
      'SHELL FUEL CARD', this.bookingData.hasShellCard ? 'Assigned' : 'Not Assigned'
    );
    drawRow('DEPARTURE', this.formatDateTime(this.bookingData.departureTime), 'EST. RETURN', this.formatDateTime(this.bookingData.arrivalTime));
    drawField('ROUTE', this.bookingData.source + '  ->  ' + this.bookingData.destination);

    doc.setDrawColor(229, 231, 235);
    doc.line(20, y, pageWidth - 20, y);
    y += 10;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(107, 114, 128);
    doc.text('BK-REF-' + this.bookingRefId, pageWidth / 2, y + 5, { align: 'center' });

    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Generated on ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }), pageWidth / 2, y + 15, { align: 'center' });

    doc.save('booking-request-' + this.bookingRefId + '.pdf');
  }

  resetBooking() {
    this.bookingSubmitted = false;
    this.currentStep = 1;
    this.bookingRefId = '';
    this.selectedCategory = 'Car';
    this.bookingData = {
      name: '',
      email: '',
      phone: '',
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
  }
}
