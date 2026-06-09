import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CarService, CarDetail } from '../../core/services/car.service';
import { CarFinanceService, CarFinanceRecord, ASSURANCE_LIST, PROVIDER_LIST } from '../../core/services/car-finance.service';
import { CarDocumentService, CarDocument, DOCUMENT_TYPE_LIST } from '../../core/services/car-document.service';
import { DriverService, Driver } from '../../core/services/driver.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NzIconModule, NzButtonModule, NzInputModule, NzSelectModule],
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
          <div class="tab" [class.active]="activeTab === 'maintenance'" (click)="setTab('maintenance')" *ngIf="shouldShowTab('maintenance')">Maintenance</div>
          <div class="tab" [class.active]="activeTab === 'trips'" (click)="setTab('trips')" *ngIf="shouldShowTab('trips')">Trips History</div>
          <div class="tab" [class.active]="activeTab === 'finance'" (click)="setTab('finance')" *ngIf="shouldShowTab('finance')">Finance</div>
          <div class="tab" [class.active]="activeTab === 'documents'" (click)="setTab('documents')" *ngIf="shouldShowTab('documents')">Documents</div>
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

      <!-- Finance Tab -->
      <div *ngIf="activeTab === 'finance'" class="tab-content">
        <div class="finance-header">
          <h2 class="tab-section-title">Financial Information</h2>
          <button class="btn-edit" (click)="openFinanceModal()">
            <span nz-icon nzType="edit" nzTheme="outline"></span> Edit
          </button>
        </div>
        <div class="finance-grid" *ngIf="financeRecord; else noFinance">
          <div class="finance-card">
            <span nz-icon nzType="dollar" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Prix de vente</span>
              <span class="fi-value">{{ financeRecord.price }} TND</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="calendar" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Date d'achat</span>
              <span class="fi-value">{{ financeRecord.achatDate }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="field-time" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Date de livraison</span>
              <span class="fi-value">{{ financeRecord.deliveryDate }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="safety" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Assurance</span>
              <span class="fi-value">{{ financeRecord.insurance }} ({{ financeRecord.insuranceMargin }})</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="car" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Provider</span>
              <span class="fi-value">{{ financeRecord.provider }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="audit" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Vignette Tax / année</span>
              <span class="fi-value">{{ financeRecord.vignetteTax }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="idcard" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Immo ID</span>
              <span class="fi-value">{{ financeRecord.immoId }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="file-protect" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">ID Carte Grise</span>
              <span class="fi-value">{{ financeRecord.carteGriseId }}</span>
            </div>
          </div>
          <div class="finance-card">
            <span nz-icon nzType="file-text" nzTheme="outline" class="fi-icon"></span>
            <div class="fi-body">
              <span class="fi-label">Notes</span>
              <span class="fi-value">{{ financeRecord.notes }}</span>
            </div>
          </div>
        </div>
        <ng-template #noFinance>
          <div class="empty-finance">
            <span nz-icon nzType="dollar" nzTheme="outline" class="empty-icon-lg"></span>
            <p>No financial records for this vehicle</p>
          </div>
        </ng-template>

        <!-- Edit Finance Modal -->
        <div class="modal-overlay" *ngIf="showFinanceModal" (click.self)="closeFinanceModal()">
          <div class="modal-card medium-modal">
            <div class="modal-header">
              <h3>Edit Financial Info</h3>
              <button class="modal-close" (click)="closeFinanceModal()">
                <span nz-icon nzType="close" nzTheme="outline"></span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Prix de vente (TND)</label>
                <input nz-input [(ngModel)]="editRecord.price" type="number" step="0.001" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Date d'achat</label>
                  <input nz-input [(ngModel)]="editRecord.achatDate" type="date" />
                </div>
                <div class="form-group">
                  <label>Date de livraison</label>
                  <input nz-input [(ngModel)]="editRecord.deliveryDate" type="date" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Assurance</label>
                  <nz-select [(ngModel)]="editRecord.insurance">
                    <nz-option *ngFor="let a of assuranceList" [nzValue]="a" [nzLabel]="a"></nz-option>
                  </nz-select>
                </div>
                <div class="form-group">
                  <label>Marge d'assurance</label>
                  <input nz-input [(ngModel)]="editRecord.insuranceMargin" />
                </div>
              </div>
              <div class="form-group">
                <label>Provider</label>
                <nz-select [(ngModel)]="editRecord.provider">
                  <nz-option *ngFor="let p of providerList" [nzValue]="p" [nzLabel]="p"></nz-option>
                </nz-select>
              </div>
              <div class="form-group">
                <label>Vignette Tax / année</label>
                <input nz-input [(ngModel)]="editRecord.vignetteTax" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Immo ID</label>
                  <input nz-input [(ngModel)]="editRecord.immoId" />
                </div>
                <div class="form-group">
                  <label>ID Carte Grise</label>
                  <input nz-input [(ngModel)]="editRecord.carteGriseId" />
                </div>
              </div>
              <div class="form-group">
                <label>Notes</label>
                <textarea nz-input [(ngModel)]="editRecord.notes" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" (click)="closeFinanceModal()">Cancel</button>
              <button class="btn-primary" (click)="saveFinance()">Save</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Documents Tab -->
      <div *ngIf="activeTab === 'documents'" class="tab-content">
        <div class="documents-header">
          <h2 class="tab-section-title">Documents</h2>
          <button class="btn-edit" (click)="openDocModal()">
            <span nz-icon nzType="plus" nzTheme="outline"></span> Add Document
          </button>
        </div>
        <div class="table-card" *ngIf="documents.length > 0; else noDocs">
          <table class="data-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Upload Date</th>
                <th>Notes</th>
                <th class="th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of documents">
                <td class="cell-filename">{{ d.fileName }}</td>
                <td><span class="doc-badge">{{ d.documentType }}</span></td>
                <td class="cell-date">{{ d.uploadDate }}</td>
                <td class="cell-notes">{{ d.notes }}</td>
                <td class="cell-actions">
                  <button class="btn-action" (click)="viewDocument(d)" title="View">
                    <span nz-icon nzType="eye" nzTheme="outline"></span>
                  </button>
                  <button class="btn-action" (click)="openDocModal(d)" title="Update">
                    <span nz-icon nzType="edit" nzTheme="outline"></span>
                  </button>
                  <button class="btn-action btn-action-del" (click)="openDocDeleteConfirm(d)" title="Delete">
                    <span nz-icon nzType="delete" nzTheme="outline"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ng-template #noDocs>
          <div class="empty-docs">
            <span nz-icon nzType="file" nzTheme="outline" class="empty-icon-lg"></span>
            <p>No documents for this vehicle</p>
          </div>
        </ng-template>

        <!-- Add/Edit Document Modal -->
        <div class="modal-overlay" *ngIf="showDocModal" (click.self)="closeDocModal()">
          <div class="modal-card medium-modal">
            <div class="modal-header">
              <h3>{{ editDoc.id ? 'Update' : 'Add' }} Document</h3>
              <button class="modal-close" (click)="closeDocModal()">
                <span nz-icon nzType="close" nzTheme="outline"></span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label>Upload File</label>
                <div class="file-upload-area">
                  <input type="file" #fileInput (change)="onFileSelected($event)" class="file-input-hidden" />
                  <button type="button" class="btn-upload" (click)="fileInput.click()">
                    <span nz-icon nzType="upload" nzTheme="outline"></span> Choose File
                  </button>
                  <span class="file-name-display">{{ editDoc.fileName || 'No file chosen' }}</span>
                </div>
              </div>
              <div class="form-group">
                <label>Document Type</label>
                <nz-select [(ngModel)]="editDoc.documentType">
                  <nz-option *ngFor="let t of docTypeList" [nzValue]="t" [nzLabel]="t"></nz-option>
                </nz-select>
              </div>
              <div class="form-group">
                <label>Upload Date</label>
                <input nz-input [(ngModel)]="editDoc.uploadDate" type="date" />
              </div>
              <div class="form-group">
                <label>Notes</label>
                <textarea nz-input [(ngModel)]="editDoc.notes" rows="3" placeholder="Optional notes"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" (click)="closeDocModal()">Cancel</button>
              <button class="btn-primary" (click)="saveDocument()">Save</button>
            </div>
          </div>
        </div>
      </div>

        <!-- View Document Modal -->
        <div class="modal-overlay" *ngIf="showViewDocModal" (click.self)="closeViewDocModal()">
          <div class="modal-card medium-modal">
            <div class="modal-header">
              <h3>Document Details</h3>
              <button class="modal-close" (click)="closeViewDocModal()">
                <span nz-icon nzType="close" nzTheme="outline"></span>
              </button>
            </div>
            <div class="modal-body">
              <div class="view-doc-grid">
                <div class="view-doc-row">
                  <span class="view-doc-label">File Name</span>
                  <span class="view-doc-value">{{ viewDoc.fileName }}</span>
                </div>
                <div class="view-doc-row">
                  <span class="view-doc-label">Document Type</span>
                  <span class="view-doc-value"><span class="doc-badge">{{ viewDoc.documentType }}</span></span>
                </div>
                <div class="view-doc-row">
                  <span class="view-doc-label">Upload Date</span>
                  <span class="view-doc-value">{{ viewDoc.uploadDate }}</span>
                </div>
                <div class="view-doc-row">
                  <span class="view-doc-label">Notes</span>
                  <span class="view-doc-value">{{ viewDoc.notes || '—' }}</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-primary" (click)="closeViewDocModal()">Close</button>
            </div>
          </div>
        </div>

        <!-- Delete Document Confirmation -->
        <div class="modal-overlay" *ngIf="showDocDeleteConfirm" (click.self)="closeDocDeleteConfirm()">
          <div class="modal-card" style="max-width: 400px;">
            <div class="modal-header">
              <h3>Confirm Deletion</h3>
              <button class="modal-close" (click)="closeDocDeleteConfirm()">
                <span nz-icon nzType="close" nzTheme="outline"></span>
              </button>
            </div>
            <div class="modal-body" style="text-align: center; padding: 32px 24px;">
              <span nz-icon nzType="warning" nzTheme="outline" style="font-size: 48px; color: #f59e0b; margin-bottom: 12px;"></span>
              <p style="margin: 0; color: #374151; font-size: 15px;">Are you sure you want to delete<br/><strong>{{ docToDelete?.fileName }}</strong>?</p>
            </div>
            <div class="modal-footer">
              <button class="btn-cancel" (click)="closeDocDeleteConfirm()">Cancel</button>
              <button class="btn-primary" style="background: #ef4444;" (click)="confirmDeleteDocument()">Delete</button>
            </div>
          </div>
        </div>

      <!-- Driver Tab -->
      <div *ngIf="activeTab === 'driver'" class="tab-content">
        <div class="documents-header">
          <h2 class="tab-section-title">Assigned Driver</h2>
        </div>
        <div class="driver-info-card" *ngIf="assignedDriver; else noDriver">
          <div class="driver-avatar-wrap">
            <img [src]="assignedDriver.avatar" class="driver-avatar-img" />
          </div>
          <div class="driver-details">
            <h3>{{ assignedDriver.name }}</h3>
            <p class="driver-meta"><span nz-icon nzType="idcard" nzTheme="outline"></span> {{ assignedDriver.role }}</p>
            <p class="driver-meta"><span nz-icon nzType="mail" nzTheme="outline"></span> {{ assignedDriver.email }}</p>
            <p class="driver-meta"><span nz-icon nzType="phone" nzTheme="outline"></span> {{ assignedDriver.phone }}</p>
            <p class="driver-meta"><span nz-icon nzType="file-text" nzTheme="outline"></span> {{ assignedDriver.license }}</p>
            <div class="driver-status-row">
              <span class="driver-status">
                <span class="status-dot" [class.dot-road]="assignedDriver.carState === 'in road'" [class.dot-free]="assignedDriver.carState === 'free'" [class.dot-maint]="assignedDriver.carState === 'apsnet'"></span>
                {{ assignedDriver.carState === 'in road' ? 'In Road' : assignedDriver.carState === 'free' ? 'Free' : assignedDriver.carState === 'apsnet' ? 'Apsnet' : 'Blocked' }}
              </span>
              <span class="driver-stat"><strong>{{ assignedDriver.trips }}</strong> trips</span>
              <span class="driver-stat"><strong>{{ assignedDriver.rating }}</strong> rating</span>
            </div>
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

    .finance-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
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

    .finance-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
    .finance-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .fi-icon {
      font-size: 28px;
      color: #6366f1;
      flex-shrink: 0;
    }
    .fi-body {
      display: flex;
      flex-direction: column;
    }
    .fi-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .fi-value {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-top: 4px;
    }

    .empty-finance {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
    }
    .empty-finance p { margin: 0; color: #9ca3af; font-size: 14px; }

    .documents-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .doc-badge {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 100px;
      background: #eef2ff;
      color: #4f46e5;
      font-size: 12px;
      font-weight: 600;
    }
    .th-actions { width: 100px; text-align: center; }
    .cell-filename { font-weight: 600; color: #1f2937; }
    .cell-notes { color: #6b7280; max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cell-actions {
      display: flex;
      gap: 6px;
      justify-content: center;
    }
    .btn-action {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #d1d5db;
      background: white;
      color: #6b7280;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .btn-action:hover { border-color: #6366f1; color: #6366f1; }
    .btn-action-del:hover { border-color: #ef4444; color: #ef4444; }
    .empty-docs {
      text-align: center;
      padding: 60px 20px;
      background: white;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
    }
    .empty-docs p { margin: 0; color: #9ca3af; font-size: 14px; }

    .view-doc-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .view-doc-row {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .view-doc-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .view-doc-value {
      font-size: 15px;
      color: #1f2937;
      font-weight: 500;
    }
    .driver-meta {
      margin: 4px 0;
      font-size: 13px;
      color: #6b7280;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .driver-status-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid #f3f4f6;
    }
    .driver-stat {
      font-size: 13px;
      color: #6b7280;
    }
    .assign-preview {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 8px;
    }
    .assign-preview-img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .not-found {
      text-align: center;
      padding: 80px 20px;
      color: #6b7280;
    }
    .nf-icon { font-size: 64px; color: #d1d5db; margin-bottom: 16px; }
    .not-found h2 { margin: 0 0 8px; color: #1f2937; }
    .not-found p { margin: 0 0 24px; }

    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-card {
      background: white;
      border-radius: 16px;
      width: 90%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    }
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid #f0f0f0;
    }
    .modal-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: #1f2937; }
    .modal-close {
      background: none;
      border: none;
      font-size: 18px;
      color: #6b7280;
      cursor: pointer;
      padding: 4px;
    }
    .modal-close:hover { color: #1f2937; }
    .modal-body { padding: 20px 24px; }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px;
      border-top: 1px solid #f0f0f0;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
    }
    .form-group label {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row .form-group { flex: 1; }
    .btn-cancel {
      padding: 8px 20px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
      font-size: 14px;
      cursor: pointer;
    }
    .file-upload-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .file-input-hidden { display: none; }
    .btn-upload {
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
    .btn-upload:hover { border-color: #6366f1; color: #6366f1; }
    .file-name-display {
      font-size: 13px;
      color: #6b7280;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .btn-cancel:hover { border-color: #9ca3af; }
    .btn-primary {
      padding: 8px 20px;
      border-radius: 8px;
      border: none;
      background: #6366f1;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .btn-primary:hover { background: #4f46e5; }
    textarea { resize: vertical; }

    @media (max-width: 1024px) {
      .details-container { padding: 20px 16px; }
      .specs-grid { grid-template-columns: 1fr; }
      .finance-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class CarDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private financeService = inject(CarFinanceService);
  private docService = inject(CarDocumentService);
  private driverService = inject(DriverService);
  private authService = inject(AuthService);

  car: CarDetail | null = null;
  activeTab: string = 'fiche';

  // Finance
  financeRecord: CarFinanceRecord | null = null;
  showFinanceModal = false;
  assuranceList = ASSURANCE_LIST;
  providerList = PROVIDER_LIST;
  editRecord: CarFinanceRecord = { carId: 0, carName: '', price: 0, achatDate: '', deliveryDate: '', insurance: '', insuranceMargin: '', vignetteTax: '', provider: '', immoId: '', carteGriseId: '', notes: '' };

  // Documents
  documents: CarDocument[] = [];
  showDocModal = false;
  docTypeList = DOCUMENT_TYPE_LIST;
  editDoc: CarDocument = { id: 0, carId: 0, fileName: '', documentType: '', notes: '', uploadDate: '' };
  showViewDocModal = false;
  viewDoc: CarDocument = { id: 0, carId: 0, fileName: '', documentType: '', notes: '', uploadDate: '' };
  showDocDeleteConfirm = false;
  docToDelete: CarDocument | null = null;
  assignedDriver: Driver | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.car = this.carService.getCarById(+idParam) || null;
      if (this.car) {
        this.financeRecord = this.financeService.getByCarId(this.car.id) || null;
        this.documents = this.docService.getByCarId(this.car.id);
        this.assignedDriver = this.car.driverId ? this.driverService.getById(this.car.driverId) || null : null;
      }
    }
  }

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  shouldShowTab(tab: string): boolean {
    if (this.authService.isAdmin()) return true;
    if (this.authService.isOperator()) return tab === 'fiche';
    return tab === 'fiche' || tab === 'driver';
  }

  goBack(): void {
    window.history.back();
  }

  // Finance methods
  openFinanceModal(): void {
    const carId = this.car!.id;
    this.editRecord = this.financeService.getByCarId(carId)
      ? { ...this.financeService.getByCarId(carId)! }
      : { carId, carName: this.car!.name, price: 0, achatDate: '', deliveryDate: '', insurance: '', insuranceMargin: '', vignetteTax: '', provider: '', immoId: '', carteGriseId: '', notes: '' };
    this.showFinanceModal = true;
  }

  closeFinanceModal(): void {
    this.showFinanceModal = false;
  }

  saveFinance(): void {
    this.financeService.save({ ...this.editRecord });
    this.financeRecord = this.financeService.getByCarId(this.car!.id) || null;
    this.showFinanceModal = false;
  }

  // Document methods
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.editDoc.fileName = file.name;
    }
  }

  openDocModal(doc?: CarDocument): void {
    const carId = this.car!.id;
    if (doc) {
      this.editDoc = { ...doc };
    } else {
      this.editDoc = { id: 0, carId, fileName: '', documentType: '', notes: '', uploadDate: '' };
    }
    this.showDocModal = true;
  }

  closeDocModal(): void {
    this.showDocModal = false;
  }

  saveDocument(): void {
    this.docService.save({ ...this.editDoc });
    this.documents = this.docService.getByCarId(this.car!.id);
    this.showDocModal = false;
  }

  viewDocument(doc: CarDocument): void {
    this.viewDoc = { ...doc };
    this.showViewDocModal = true;
  }

  closeViewDocModal(): void {
    this.showViewDocModal = false;
  }

  openDocDeleteConfirm(doc: CarDocument): void {
    this.docToDelete = doc;
    this.showDocDeleteConfirm = true;
  }

  closeDocDeleteConfirm(): void {
    this.showDocDeleteConfirm = false;
    this.docToDelete = null;
  }

  confirmDeleteDocument(): void {
    const doc = this.docToDelete;
    if (doc) {
      this.docService.delete(doc.id);
      this.documents = this.docService.getByCarId(this.car!.id);
    }
    this.closeDocDeleteConfirm();
  }
}
