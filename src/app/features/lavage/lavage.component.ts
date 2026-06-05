import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LavageService, LavageRequest, LavageServiceType, LavageStatus, LavageVehicleType, LAVAGE_SERVICE_TYPES, LAVAGE_VEHICLE_TYPES } from '../../core/services/lavage.service';
import { TrashService } from '../../core/services/trash.service';

type FilterKey = 'all' | 'today' | 'week' | 'upcoming' | 'completed';

@Component({
  selector: 'app-lavage',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    NzModalModule
  ],
  template: `
    <div class="lavage-page">

      <!-- HEADER -->
      <div class="page-header">
        <div class="header-titles">
          <h1>Lavage</h1>
          <p class="subtitle">Car wash service requests — employee to parking operator</p>
        </div>
        <div class="header-actions">
          <button class="btn-primary" *ngIf="!showWizard" (click)="openWizard()">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            New Request
          </button>
          <button class="btn-cancel" *ngIf="showWizard" (click)="closeWizard()">
            <span nz-icon nzType="close" nzTheme="outline"></span>
            Close
          </button>
        </div>
      </div>

      <!-- ============================== WIZARD VIEW ============================== -->
      <div class="wizard-container" *ngIf="showWizard">
        <div class="wizard-card">

          <!-- STEP INDICATOR -->
          <div class="step-indicator">
            <div class="step" [class.active]="currentStep >= 1" [class.done]="currentStep > 1">
              <div class="step-circle">1</div>
              <span>Requester</span>
            </div>
            <div class="step-line" [class.done]="currentStep > 1"></div>
            <div class="step" [class.active]="currentStep >= 2" [class.done]="currentStep > 2">
              <div class="step-circle">2</div>
              <span>Vehicle</span>
            </div>
            <div class="step-line" [class.done]="currentStep > 2"></div>
            <div class="step" [class.active]="currentStep >= 3" [class.done]="currentStep > 3">
              <div class="step-circle">3</div>
              <span>Wash</span>
            </div>
            <div class="step-line" [class.done]="currentStep > 3"></div>
            <div class="step" [class.active]="currentStep >= 4">
              <div class="step-circle">4</div>
              <span>Review</span>
            </div>
          </div>

          <!-- SUCCESS SCREEN -->
          <div class="success-screen" *ngIf="submitted && submittedRefId">
            <div class="success-icon">
              <span nz-icon nzType="check-circle" nzTheme="fill"></span>
            </div>
            <h2>Request Submitted</h2>
            <p>Your car wash request has been sent to the parking operator.</p>
            <div class="ref-card">
              <span class="ref-label">Reference ID</span>
              <span class="ref-value">{{ submittedRefId }}</span>
            </div>
            <div class="success-actions">
              <button class="btn-primary" (click)="backToList()">
                <span nz-icon nzType="unordered-list" nzTheme="outline"></span>
                View My Requests
              </button>
              <button class="btn-secondary" (click)="newRequest()">
                <span nz-icon nzType="plus" nzTheme="outline"></span>
                New Request
              </button>
            </div>
          </div>

          <!-- STEP 1: Requester Info -->
          <div class="step-content" *ngIf="!submitted && currentStep === 1">
            <h2 class="step-title">Requester Information</h2>
            <p class="step-subtitle">Tell us who is requesting the car wash</p>
            <div class="form-grid">
              <div class="form-item">
                <label class="required-label">Full Name</label>
                <input nz-input [(ngModel)]="form.name" name="name" placeholder="e.g. Ahmed Benali" />
              </div>
              <div class="form-item">
                <label class="required-label">Email</label>
                <input nz-input type="email" [(ngModel)]="form.email" name="email" placeholder="ahmed@parkplus.com" />
              </div>
              <div class="form-item">
                <label class="required-label">Phone</label>
                <input nz-input [(ngModel)]="form.phone" name="phone" placeholder="+216 55 123 456" />
              </div>
              <div class="form-item">
                <label class="required-label">Department</label>
                <nz-select [(ngModel)]="form.department" nzPlaceHolder="Select a department" name="department" style="width: 100%;">
                  <nz-option *ngFor="let d of departments" [nzLabel]="d" [nzValue]="d"></nz-option>
                </nz-select>
              </div>
              <div class="form-item full">
                <label class="toggle-label">
                  <input type="checkbox" [(ngModel)]="form.hasLicense" name="hasLicense" />
                  <span>I confirm I have a valid driver's license</span>
                </label>
              </div>
            </div>
          </div>

          <!-- STEP 2: Vehicle Info -->
          <div class="step-content" *ngIf="!submitted && currentStep === 2">
            <h2 class="step-title">Vehicle Information</h2>
            <p class="step-subtitle">Enter the vehicle to be washed</p>
            <div class="form-grid">
              <div class="form-item">
                <label class="required-label">Vehicle Name</label>
                <input nz-input [(ngModel)]="form.vehicleName" name="vehicleName" placeholder="e.g. Renault Dokker" />
              </div>
              <div class="form-item">
                <label class="required-label">Plate Number</label>
                <input nz-input [(ngModel)]="form.vehiclePlate" name="vehiclePlate" placeholder="e.g. 666 TU 3389" />
              </div>
              <div class="form-item">
                <label class="required-label">Vehicle Type</label>
                <nz-select [(ngModel)]="form.vehicleType" name="vehicleType" style="width: 100%;">
                  <nz-option *ngFor="let v of vehicleTypes" [nzLabel]="v" [nzValue]="v"></nz-option>
                </nz-select>
              </div>
            </div>
          </div>

          <!-- STEP 3: Wash Details -->
          <div class="step-content" *ngIf="!submitted && currentStep === 3">
            <h2 class="step-title">Wash Details</h2>
            <p class="step-subtitle">Pick a service, date, time and location</p>

            <div class="form-grid">
              <div class="form-item full">
                <label class="required-label">Service Type</label>
                <div class="service-grid">
                  <label class="service-card" *ngFor="let s of serviceTypes" [class.selected]="form.serviceType === s">
                    <input type="radio" name="serviceType" [value]="s" [(ngModel)]="form.serviceType" />
                    <div class="service-icon">
                      <span nz-icon nzType="highlight" nzTheme="outline"></span>
                    </div>
                    <div class="service-name">{{ s }}</div>
                    <div class="service-price">Free</div>
                  </label>
                </div>
              </div>
              <div class="form-item">
                <label class="required-label">Scheduled Date &amp; Time</label>
                <input nz-input type="datetime-local" [(ngModel)]="form.scheduledDate" name="scheduledDate" />
              </div>
              <div class="form-item">
                <label class="required-label">Location</label>
                <nz-select [(ngModel)]="form.location" nzPlaceHolder="Select a region" name="location" style="width: 100%;">
                  <nz-option *ngFor="let r of tunisianRegions" [nzLabel]="r" [nzValue]="r"></nz-option>
                </nz-select>
              </div>
              <div class="form-item full">
                <label>Special Notes (optional)</label>
                <textarea nz-input [(ngModel)]="form.notes" name="notes" rows="3" placeholder="Any specific instructions..."></textarea>
              </div>
            </div>
          </div>

          <!-- STEP 4: Review -->
          <div class="step-content" *ngIf="!submitted && currentStep === 4">
            <h2 class="step-title">Review Your Request</h2>
            <p class="step-subtitle">Please confirm the details before submitting</p>
            <div class="review-grid">
              <div class="review-section">
                <h4>Requester</h4>
                <div class="review-row"><span>Name</span><strong>{{ form.name }}</strong></div>
                <div class="review-row"><span>Email</span><strong>{{ form.email }}</strong></div>
                <div class="review-row"><span>Phone</span><strong>{{ form.phone }}</strong></div>
                <div class="review-row"><span>Department</span><strong>{{ form.department }}</strong></div>
              </div>
              <div class="review-section">
                <h4>Vehicle</h4>
                <div class="review-row"><span>Name</span><strong>{{ form.vehicleName }}</strong></div>
                <div class="review-row"><span>Plate</span><strong>{{ form.vehiclePlate }}</strong></div>
                <div class="review-row"><span>Type</span><strong>{{ form.vehicleType }}</strong></div>
              </div>
              <div class="review-section full">
                <h4>Wash</h4>
                <div class="review-row"><span>Service</span><strong>{{ form.serviceType }}</strong></div>
                <div class="review-row"><span>Scheduled</span><strong>{{ form.scheduledDate | date:'medium' }}</strong></div>
                <div class="review-row"><span>Location</span><strong>{{ form.location }}</strong></div>
                <div class="review-row" *ngIf="form.notes"><span>Notes</span><strong>{{ form.notes }}</strong></div>
              </div>
            </div>
          </div>

          <!-- WIZARD FOOTER -->
          <div class="wizard-footer" *ngIf="!submitted">
            <button class="btn-cancel" (click)="prevStep()" [disabled]="currentStep === 1">
              <span nz-icon nzType="arrow-left" nzTheme="outline"></span> Back
            </button>
            <div class="step-dots">
              <span *ngFor="let s of [1,2,3,4]" [class.active]="currentStep === s"></span>
            </div>
            <button class="btn-primary" *ngIf="currentStep < 4" (click)="nextStep()" [disabled]="!isStepValid()">
              Next <span nz-icon nzType="arrow-right" nzTheme="outline"></span>
            </button>
            <button class="btn-primary" *ngIf="currentStep === 4" (click)="submit()">
              <span nz-icon nzType="check" nzTheme="outline"></span> Submit Request
            </button>
          </div>

        </div>
      </div>

      <!-- ============================== LIST VIEW ============================== -->
      <div *ngIf="!showWizard">
        <!-- KPI cards -->
        <div class="kpi-row">
          <div class="kpi-card kpi-today">
            <div class="kpi-icon"><span nz-icon nzType="calendar" nzTheme="outline"></span></div>
            <div class="kpi-body">
              <span class="kpi-label">Today's Washes</span>
              <span class="kpi-value">{{ kpiToday }}</span>
            </div>
          </div>
          <div class="kpi-card kpi-week">
            <div class="kpi-icon"><span nz-icon nzType="field-time" nzTheme="outline"></span></div>
            <div class="kpi-body">
              <span class="kpi-label">This Week</span>
              <span class="kpi-value">{{ kpiWeek }}</span>
            </div>
          </div>
          <div class="kpi-card kpi-pending">
            <div class="kpi-icon"><span nz-icon nzType="clock-circle" nzTheme="outline"></span></div>
            <div class="kpi-body">
              <span class="kpi-label">Pending</span>
              <span class="kpi-value">{{ kpiPending }}</span>
            </div>
          </div>
          <div class="kpi-card kpi-done">
            <div class="kpi-icon"><span nz-icon nzType="check-circle" nzTheme="outline"></span></div>
            <div class="kpi-body">
              <span class="kpi-label">Completed</span>
              <span class="kpi-value">{{ kpiCompleted }}</span>
            </div>
          </div>
        </div>

        <!-- Filter chips -->
        <div class="filter-bar">
          <button class="filter-chip" [class.active]="activeFilter === 'all'" (click)="setFilter('all')">
            All ({{ allRequests.length }})
          </button>
          <button class="filter-chip" [class.active]="activeFilter === 'today'" (click)="setFilter('today')">
            <span nz-icon nzType="calendar" nzTheme="outline"></span> Today ({{ kpiToday }})
          </button>
          <button class="filter-chip" [class.active]="activeFilter === 'week'" (click)="setFilter('week')">
            <span nz-icon nzType="field-time" nzTheme="outline"></span> This Week ({{ kpiWeek }})
          </button>
          <button class="filter-chip" [class.active]="activeFilter === 'upcoming'" (click)="setFilter('upcoming')">
            <span nz-icon nzType="arrow-right" nzTheme="outline"></span> Upcoming
          </button>
          <button class="filter-chip" [class.active]="activeFilter === 'completed'" (click)="setFilter('completed')">
            <span nz-icon nzType="check" nzTheme="outline"></span> Completed
          </button>
        </div>

        <!-- Table -->
        <div class="table-card" *ngIf="filteredRequests.length > 0; else emptyState">
          <table class="data-table">
            <thead>
              <tr>
                <th>Ref ID</th>
                <th>Requester</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Scheduled</th>
                <th>Location</th>
                <th>Status</th>
                <th class="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of filteredRequests">
                <td><strong>{{ r.refId }}</strong></td>
                <td>
                  <div class="cell-stack">
                    <span class="primary">{{ r.name }}</span>
                    <span class="secondary">{{ r.department }}</span>
                  </div>
                </td>
                <td>
                  <div class="cell-stack">
                    <span class="primary">{{ r.vehicleName }}</span>
                    <span class="secondary">{{ r.vehiclePlate }} · {{ r.vehicleType }}</span>
                  </div>
                </td>
                <td><span class="lavage-badge">{{ r.serviceType }}</span></td>
                <td class="cell-date">{{ r.scheduledDate | date:'MMM d, h:mm a' }}</td>
                <td>{{ r.location }}</td>
                <td>
                  <span class="status-tag" [class]="'status-' + r.status.toLowerCase().replace(' ', '-')">
                    {{ r.status }}
                  </span>
                </td>
                <td class="cell-actions">
                  <button class="btn-action" (click)="viewRequest(r)" title="View">
                    <span nz-icon nzType="eye" nzTheme="outline"></span>
                  </button>
                  <button class="btn-action" *ngIf="r.status === 'Pending'" (click)="setStatus(r, 'In Progress')" title="Start">
                    <span nz-icon nzType="play-circle" nzTheme="outline"></span>
                  </button>
                  <button class="btn-action" *ngIf="r.status === 'In Progress'" (click)="setStatus(r, 'Completed')" title="Complete">
                    <span nz-icon nzType="check" nzTheme="outline"></span>
                  </button>
                  <button class="btn-action btn-action-del" (click)="openDeleteConfirm(r)" title="Delete">
                    <span nz-icon nzType="delete" nzTheme="outline"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ng-template #emptyState>
          <div class="empty-state">
            <span nz-icon nzType="highlight" nzTheme="outline" class="empty-icon"></span>
            <p *ngIf="activeFilter === 'all'">No lavage requests yet.</p>
            <p *ngIf="activeFilter === 'today'">No washes scheduled for today.</p>
            <p *ngIf="activeFilter === 'week'">No washes scheduled this week.</p>
            <p *ngIf="activeFilter === 'upcoming'">No upcoming washes.</p>
            <p *ngIf="activeFilter === 'completed'">No completed washes yet.</p>
            <button class="btn-primary" (click)="openWizard()">
              <span nz-icon nzType="plus" nzTheme="outline"></span> Create the first request
            </button>
          </div>
        </ng-template>
      </div>

    </div>

    <!-- ============================== VIEW MODAL ============================== -->
    <div class="modal-overlay" *ngIf="showViewModal" (click.self)="closeViewModal()">
      <div class="modal-card medium-modal">
        <div class="modal-header">
          <h3>Lavage Request Details</h3>
          <button class="modal-close" (click)="closeViewModal()">
            <span nz-icon nzType="close" nzTheme="outline"></span>
          </button>
        </div>
        <div class="modal-body" *ngIf="viewTarget">
          <div class="view-grid">
            <div class="view-row"><span class="view-label">Ref ID</span><span class="view-value">{{ viewTarget.refId }}</span></div>
            <div class="view-row"><span class="view-label">Status</span>
              <span class="status-tag" [class]="'status-' + viewTarget.status.toLowerCase().replace(' ', '-')">{{ viewTarget.status }}</span>
            </div>
            <div class="view-row"><span class="view-label">Requester</span><span class="view-value">{{ viewTarget.name }}</span></div>
            <div class="view-row"><span class="view-label">Email</span><span class="view-value">{{ viewTarget.email }}</span></div>
            <div class="view-row"><span class="view-label">Phone</span><span class="view-value">{{ viewTarget.phone }}</span></div>
            <div class="view-row"><span class="view-label">Department</span><span class="view-value">{{ viewTarget.department }}</span></div>
            <div class="view-row"><span class="view-label">Vehicle</span><span class="view-value">{{ viewTarget.vehicleName }}</span></div>
            <div class="view-row"><span class="view-label">Plate</span><span class="view-value">{{ viewTarget.vehiclePlate }}</span></div>
            <div class="view-row"><span class="view-label">Vehicle Type</span><span class="view-value">{{ viewTarget.vehicleType }}</span></div>
            <div class="view-row"><span class="view-label">Service</span><span class="view-value">{{ viewTarget.serviceType }}</span></div>
            <div class="view-row"><span class="view-label">Scheduled</span><span class="view-value">{{ viewTarget.scheduledDate | date:'medium' }}</span></div>
            <div class="view-row"><span class="view-label">Location</span><span class="view-value">{{ viewTarget.location }}</span></div>
            <div class="view-row full" *ngIf="viewTarget.notes"><span class="view-label">Notes</span><span class="view-value">{{ viewTarget.notes }}</span></div>
            <div class="view-row"><span class="view-label">Created</span><span class="view-value">{{ viewTarget.createdAt | date:'medium' }}</span></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="closeViewModal()">Close</button>
        </div>
      </div>
    </div>

    <!-- ============================== DELETE MODAL ============================== -->
    <div class="modal-overlay" *ngIf="showDeleteModal" (click.self)="closeDeleteModal()">
      <div class="modal-card" style="max-width: 420px;">
        <div class="modal-header">
          <h3>Confirm Deletion</h3>
          <button class="modal-close" (click)="closeDeleteModal()">
            <span nz-icon nzType="close" nzTheme="outline"></span>
          </button>
        </div>
        <div class="modal-body" style="text-align: center; padding: 32px 24px;">
          <span nz-icon nzType="warning" nzTheme="outline" style="font-size: 48px; color: #f59e0b; margin-bottom: 12px;"></span>
          <p style="margin: 0; color: #374151; font-size: 15px;">
            Are you sure you want to delete<br/>
            <strong>{{ deleteTarget?.refId }}</strong>?
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="closeDeleteModal()">Cancel</button>
          <button class="btn-primary" style="background: #ef4444;" (click)="confirmDelete()">Delete</button>
        </div>
      </div>
    </div>

  `,
  styles: [`
    .lavage-page { padding: 0; }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
    }
    .header-titles h1 {
      font-size: 32px;
      margin: 0;
      color: #1f2937;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .subtitle {
      color: #9ca3af;
      margin: 6px 0 0;
      font-size: 14px;
    }
    .header-actions { display: flex; gap: 10px; }

    .btn-primary {
      height: 40px; padding: 0 20px; border-radius: 8px; border: none;
      background: #6366f1; color: white; font-size: 14px; font-weight: 600;
      cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
      transition: all 0.2s;
    }
    .btn-primary:hover { background: #4f46e5; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary {
      height: 40px; padding: 0 20px; border-radius: 8px;
      border: 1px solid #d1d5db; background: white;
      color: #374151; font-size: 14px; font-weight: 500; cursor: pointer;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-secondary:hover { border-color: #6366f1; color: #6366f1; }
    .btn-cancel {
      height: 40px; padding: 0 20px; border-radius: 8px;
      border: 1px solid #d1d5db; background: white;
      color: #374151; font-size: 14px; font-weight: 500; cursor: pointer;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-cancel:hover { background: #f9fafb; }
    .btn-cancel:disabled { opacity: 0.5; cursor: not-allowed; }

    /* ====== WIZARD ====== */
    .wizard-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }
    .wizard-card { max-width: 900px; margin: 0 auto; }

    .step-indicator {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
      gap: 0;
    }
    .step {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      color: #9ca3af; font-size: 13px; font-weight: 500;
    }
    .step-circle {
      width: 36px; height: 36px; border-radius: 50%;
      background: #f1f5f9; color: #9ca3af;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 14px;
      border: 2px solid #e5e7eb;
      transition: all 0.2s;
    }
    .step.active .step-circle {
      background: #6366f1; color: white; border-color: #6366f1;
    }
    .step.done .step-circle {
      background: #10b981; color: white; border-color: #10b981;
    }
    .step.active, .step.done { color: #1f2937; }
    .step-line {
      flex: 1; height: 2px; background: #e5e7eb; max-width: 80px; margin: 0 8px;
      align-self: flex-start; margin-top: 17px;
    }
    .step-line.done { background: #10b981; }

    .step-content { padding: 8px 0 24px; }
    .step-title {
      font-size: 22px; font-weight: 700; color: #1f2937; margin: 0 0 6px;
    }
    .step-subtitle {
      color: #6b7280; font-size: 14px; margin: 0 0 24px;
    }
    .form-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .form-item { display: flex; flex-direction: column; gap: 6px; }
    .form-item.full { grid-column: 1 / -1; }
    .form-item label {
      font-size: 13px; font-weight: 600; color: #374151;
    }
    .required-label::after { content: ' *'; color: #dc2626; }
    .toggle-label {
      display: flex; align-items: center; gap: 8px;
      font-size: 14px; color: #374151; cursor: pointer;
    }
    .toggle-label input { width: 16px; height: 16px; cursor: pointer; }

    .service-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
    }
    .service-card {
      border: 2px solid #e5e7eb; border-radius: 10px;
      padding: 18px 12px; text-align: center; cursor: pointer;
      background: white; transition: all 0.2s;
      display: flex; flex-direction: column; align-items: center; gap: 6px;
    }
    .service-card:hover { border-color: #c7d2fe; }
    .service-card.selected {
      border-color: #6366f1; background: #eef2ff;
    }
    .service-card input { display: none; }
    .service-icon {
      font-size: 28px; color: #6366f1;
    }
    .service-name { font-weight: 700; color: #1f2937; font-size: 14px; }
    .service-price { font-size: 12px; color: #10b981; font-weight: 600; }

    .review-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .review-section {
      background: #f9fafb; border: 1px solid #f3f4f6;
      border-radius: 10px; padding: 18px 20px;
    }
    .review-section.full { grid-column: 1 / -1; }
    .review-section h4 {
      margin: 0 0 12px; font-size: 14px;
      color: #6366f1; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .review-row {
      display: flex; justify-content: space-between; padding: 6px 0;
      font-size: 14px; gap: 12px;
    }
    .review-row span { color: #6b7280; }
    .review-row strong { color: #1f2937; text-align: right; }

    .wizard-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 24px; border-top: 1px solid #f3f4f6; margin-top: 8px;
    }
    .step-dots { display: flex; gap: 6px; }
    .step-dots span {
      width: 8px; height: 8px; border-radius: 50%; background: #e5e7eb;
    }
    .step-dots span.active { background: #6366f1; }

    .success-screen { text-align: center; padding: 32px 16px; }
    .success-icon {
      font-size: 72px; color: #10b981; margin-bottom: 16px;
    }
    .success-screen h2 {
      font-size: 24px; font-weight: 700; color: #1f2937; margin: 0 0 8px;
    }
    .success-screen p {
      color: #6b7280; font-size: 14px; margin: 0 0 24px;
    }
    .ref-card {
      display: inline-flex; align-items: center; gap: 12px;
      background: #eef2ff; border: 1px dashed #6366f1;
      border-radius: 10px; padding: 14px 24px; margin-bottom: 24px;
    }
    .ref-label {
      font-size: 12px; color: #6366f1; text-transform: uppercase;
      font-weight: 700; letter-spacing: 0.5px;
    }
    .ref-value {
      font-size: 20px; font-weight: 800; color: #1f2937;
      font-family: 'Courier New', monospace;
    }
    .success-actions { display: flex; gap: 12px; justify-content: center; }

    /* ====== KPI ====== */
    .kpi-row {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;
    }
    .kpi-card {
      background: white; border-radius: 12px; padding: 20px 22px;
      display: flex; align-items: center; gap: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      border-left: 4px solid #6366f1;
    }
    .kpi-today { border-left-color: #6366f1; }
    .kpi-week { border-left-color: #0ea5e9; }
    .kpi-pending { border-left-color: #f59e0b; }
    .kpi-done { border-left-color: #10b981; }
    .kpi-icon {
      width: 48px; height: 48px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; color: #6366f1; background: #eef2ff;
    }
    .kpi-today .kpi-icon { color: #6366f1; background: #eef2ff; }
    .kpi-week .kpi-icon { color: #0ea5e9; background: #e0f2fe; }
    .kpi-pending .kpi-icon { color: #f59e0b; background: #fef3c7; }
    .kpi-done .kpi-icon { color: #10b981; background: #d1fae5; }
    .kpi-body { display: flex; flex-direction: column; gap: 4px; }
    .kpi-label {
      font-size: 12px; color: #6b7280; text-transform: uppercase;
      letter-spacing: 0.5px; font-weight: 600;
    }
    .kpi-value {
      font-size: 28px; font-weight: 700; color: #1f2937;
    }

    /* ====== FILTERS ====== */
    .filter-bar {
      display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;
    }
    .filter-chip {
      height: 36px; padding: 0 16px; border-radius: 8px;
      border: 1px solid #d1d5db; background: white;
      color: #374151; font-size: 13px; font-weight: 500; cursor: pointer;
      display: inline-flex; align-items: center; gap: 6px;
      transition: all 0.2s;
    }
    .filter-chip:hover { border-color: #6366f1; color: #6366f1; }
    .filter-chip.active {
      background: #6366f1; color: white; border-color: #6366f1;
    }

    /* ====== TABLE ====== */
    .table-card {
      background: white; border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04); overflow: hidden;
    }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th {
      text-align: left; padding: 14px 18px; font-size: 11px;
      color: #6b7280; text-transform: uppercase; font-weight: 700;
      letter-spacing: 0.5px; background: #f9fafb;
      border-bottom: 1px solid #f3f4f6;
    }
    .data-table td {
      padding: 14px 18px; font-size: 14px; color: #1f2937;
      border-bottom: 1px solid #f3f4f6;
    }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: #f9fafb; }
    .th-actions, .cell-actions { text-align: right; }
    .cell-stack { display: flex; flex-direction: column; gap: 2px; }
    .cell-stack .primary { font-weight: 600; color: #1f2937; }
    .cell-stack .secondary { font-size: 12px; color: #6b7280; }
    .cell-date { white-space: nowrap; }

    .lavage-badge {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      background: #eef2ff; color: #6366f1;
      font-size: 12px; font-weight: 600;
    }

    .status-tag {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 600;
    }
    .status-pending { background: #fef3c7; color: #b45309; }
    .status-in-progress { background: #dbeafe; color: #1e40af; }
    .status-completed { background: #d1fae5; color: #065f46; }
    .status-cancelled { background: #fee2e2; color: #b91c1c; }

    .cell-actions { white-space: nowrap; }
    .btn-action {
      width: 32px; height: 32px; border-radius: 6px;
      border: 1px solid #e5e7eb; background: white;
      color: #6b7280; cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      margin-left: 4px; transition: all 0.2s;
    }
    .btn-action:hover { border-color: #6366f1; color: #6366f1; }
    .btn-action-del:hover { border-color: #ef4444; color: #ef4444; }

    .empty-state {
      background: white; border-radius: 12px; padding: 60px 20px;
      text-align: center; color: #9ca3af;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }
    .empty-icon { font-size: 56px; color: #d1d5db; display: block; margin-bottom: 12px; }
    .empty-state p { margin: 0 0 20px; font-size: 15px; }

    /* ====== MODAL ====== */
    .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 20px; backdrop-filter: blur(4px);
    }
    .modal-card {
      background: white; border-radius: 16px; width: 100%;
      max-width: 560px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.25s ease;
    }
    .medium-modal { max-width: 640px; }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 24px 28px 0;
    }
    .modal-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: #1f2937; }
    .modal-close {
      width: 32px; height: 32px; border: none; background: #f1f5f9;
      border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;
      color: #6b7280; transition: all 0.2s;
    }
    .modal-close:hover { background: #fee2e2; color: #dc2626; }
    .modal-body { padding: 24px 28px; }
    .modal-footer {
      display: flex; justify-content: flex-end; gap: 12px;
      padding: 16px 28px 24px;
    }
    .view-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px;
    }
    .view-row { display: flex; flex-direction: column; gap: 2px; }
    .view-row.full { grid-column: 1 / -1; }
    .view-label {
      font-size: 11px; color: #6b7280; text-transform: uppercase;
      letter-spacing: 0.5px; font-weight: 700;
    }
    .view-value { font-size: 14px; color: #1f2937; font-weight: 500; }

    @media (max-width: 900px) {
      .form-grid, .review-grid, .view-grid { grid-template-columns: 1fr; }
      .service-grid { grid-template-columns: repeat(2, 1fr); }
      .kpi-row { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class LavageComponent implements OnInit {
  private lavageService = inject(LavageService);
  private trashService = inject(TrashService);

  allRequests: LavageRequest[] = [];
  filteredRequests: LavageRequest[] = [];
  activeFilter: FilterKey = 'all';

  showWizard = false;
  currentStep = 1;
  submitted = false;
  submittedRefId = '';

  showViewModal = false;
  viewTarget: LavageRequest | null = null;
  showDeleteModal = false;
  deleteTarget: LavageRequest | null = null;

  serviceTypes = LAVAGE_SERVICE_TYPES;
  vehicleTypes = LAVAGE_VEHICLE_TYPES;

  departments = [
    'HR', 'Maintenance', 'DG', 'Logistics',
    'Finance', 'IT', 'Sales', 'Marketing', 'Operations', 'Admin',
  ];

  tunisianRegions = [
    'Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Gabès', 'Bizerte',
    'Kairouan', 'Monastir', 'Médenine', 'Kasserine', 'Mahdia',
    'Gafsa', 'Tozeur', 'Béja', 'Jendouba', 'Kef', 'Siliana',
    'Sidi Bouzid', 'Tataouine', 'Djerba',
  ];

  form: {
    name: string; email: string; phone: string; department: string;
    vehicleName: string; vehiclePlate: string; vehicleType: LavageVehicleType;
    serviceType: LavageServiceType; scheduledDate: string; location: string;
    notes: string; hasLicense: boolean;
  } = this.emptyForm();

  // KPI counters
  kpiToday = 0;
  kpiWeek = 0;
  kpiPending = 0;
  kpiCompleted = 0;

  ngOnInit(): void {
    this.refresh();
  }

  private emptyForm() {
    return {
      name: '', email: '', phone: '', department: '',
      vehicleName: '', vehiclePlate: '', vehicleType: 'Car' as LavageVehicleType,
      serviceType: 'Standard' as LavageServiceType,
      scheduledDate: '', location: '', notes: '', hasLicense: false,
    };
  }

  refresh(): void {
    this.allRequests = this.lavageService.getRequests();
    this.recomputeKpis();
    this.applyFilter();
  }

  private recomputeKpis(): void {
    const today = new Date();
    const todayStr = this.toDateKey(today);
    const { start, end } = this.weekRange(today);

    this.kpiToday = this.allRequests.filter(r => this.toDateKey(new Date(r.scheduledDate)) === todayStr).length;
    this.kpiWeek = this.allRequests.filter(r => {
      const d = new Date(r.scheduledDate);
      return d >= start && d < end;
    }).length;
    this.kpiPending = this.allRequests.filter(r => r.status === 'Pending').length;
    this.kpiCompleted = this.allRequests.filter(r => r.status === 'Completed').length;
  }

  setFilter(key: FilterKey): void {
    this.activeFilter = key;
    this.applyFilter();
  }

  applyFilter(): void {
    const today = new Date();
    const todayStr = this.toDateKey(today);
    const { start, end } = this.weekRange(today);
    const now = today;

    switch (this.activeFilter) {
      case 'all':
        this.filteredRequests = [...this.allRequests];
        break;
      case 'today':
        this.filteredRequests = this.allRequests.filter(
          r => this.toDateKey(new Date(r.scheduledDate)) === todayStr
        );
        break;
      case 'week':
        this.filteredRequests = this.allRequests.filter(r => {
          const d = new Date(r.scheduledDate);
          return d >= start && d < end;
        });
        break;
      case 'upcoming':
        this.filteredRequests = this.allRequests.filter(
          r => new Date(r.scheduledDate) >= now && r.status !== 'Completed' && r.status !== 'Cancelled'
        );
        break;
      case 'completed':
        this.filteredRequests = this.allRequests.filter(r => r.status === 'Completed');
        break;
    }
  }

  // ====== WIZARD ======
  openWizard(): void {
    this.showWizard = true;
    this.currentStep = 1;
    this.submitted = false;
    this.submittedRefId = '';
    this.form = this.emptyForm();
  }

  closeWizard(): void {
    this.showWizard = false;
  }

  backToList(): void {
    this.showWizard = false;
    this.refresh();
  }

  newRequest(): void {
    this.currentStep = 1;
    this.submitted = false;
    this.submittedRefId = '';
    this.form = this.emptyForm();
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.form.name && !!this.form.email && this.isEmail(this.form.email)
          && !!this.form.phone && !!this.form.department && this.form.hasLicense;
      case 2:
        return !!this.form.vehicleName && !!this.form.vehiclePlate && !!this.form.vehicleType;
      case 3:
        return !!this.form.serviceType && !!this.form.scheduledDate
          && this.isFuture(this.form.scheduledDate) && !!this.form.location;
      case 4:
        return true;
      default:
        return false;
    }
  }

  nextStep(): void {
    if (this.isStepValid() && this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  submit(): void {
    const created = this.lavageService.addRequest({
      name: this.form.name,
      email: this.form.email,
      phone: this.form.phone,
      department: this.form.department,
      vehicleName: this.form.vehicleName,
      vehiclePlate: this.form.vehiclePlate,
      vehicleType: this.form.vehicleType,
      serviceType: this.form.serviceType,
      scheduledDate: this.form.scheduledDate,
      location: this.form.location,
      notes: this.form.notes,
      hasLicense: this.form.hasLicense,
    });
    this.submittedRefId = created.refId;
    this.submitted = true;
    this.refresh();
  }

  // ====== LIST ACTIONS ======
  viewRequest(r: LavageRequest): void {
    this.viewTarget = r;
    this.showViewModal = true;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.viewTarget = null;
  }

  setStatus(r: LavageRequest, status: LavageStatus): void {
    this.lavageService.updateStatus(r.id, status);
    this.refresh();
  }

  openDeleteConfirm(r: LavageRequest): void {
    this.deleteTarget = r;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.deleteTarget = null;
  }

  confirmDelete(): void {
    const r = this.deleteTarget;
    if (r) {
      this.trashService.addItem({
        id: 'lavage-' + r.id,
        type: 'lavage',
        name: r.refId + ' - ' + r.vehicleName,
        data: { ...r },
        deletedAt: new Date(),
      });
      this.lavageService.delete(r.id);
      this.refresh();
    }
    this.closeDeleteModal();
  }

  // ====== HELPERS ======
  private toDateKey(d: Date): string {
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  private weekRange(today: Date): { start: Date; end: Date } {
    // Monday → Sunday (European convention)
    const day = today.getDay();
    const diffToMonday = (day === 0 ? 6 : day - 1);
    const start = new Date(today);
    start.setDate(today.getDate() - diffToMonday);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return { start, end };
  }

  private isEmail(s: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  private isFuture(s: string): boolean {
    if (!s) return false;
    return new Date(s) >= new Date();
  }
}
