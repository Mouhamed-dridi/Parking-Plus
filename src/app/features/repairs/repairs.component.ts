import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

interface Repair {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  image: string;
  issue: string;
  repairType: string;
  status: 'Waiting' | 'In Progress' | 'Completed' | 'Cancelled';
  reportedDate: string;
  startDate: string;
  expectedDate: string;
  garage: string;
  technician: string;
  estimatedCost: number;
  actualCost?: number;
  priority: 'High' | 'Medium' | 'Low';
  duration?: string;
  fixStatus?: 'Still in Fix' | 'Fixed' | 'Not Going to Fix Yet';
  documentFile?: File;
  documentName?: string;
}

@Component({
  selector: 'app-repairs',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzIconModule, NzButtonModule,
    NzSelectModule, NzInputModule, NzDatePickerModule,
    NzModalModule, NzDropDownModule
  ],
  template: `
    <div class="repairs-container">

      <!-- ═══ HEADER ═══ -->
      <div class="repairs-header">
        <div>
          <h1 class="page-title">Car Repairs</h1>
          <p class="page-sub">Track and manage vehicle repairs across your fleet</p>
        </div>
        <div class="header-btns">
          <button class="btn-blue" (click)="showReportModal = true">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Request to Fix Car
          </button>
          <button class="btn-outline-white" (click)="showCloseRepairModal = true">
            <span nz-icon nzType="check-circle" nzTheme="outline"></span>
            Closed Ticket
          </button>
        </div>
      </div>

      <!-- ═══ KPI CARDS ═══ -->
      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#fef7e0">
            <span nz-icon nzType="tool" nzTheme="outline" style="color:#f9ab00;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">Still in Maintenance</span>
            <span class="kpi-value">{{ inFixRepairs.length }}</span>
          </div>
          <span class="kpi-badge badge-amber">Pending</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#e6f4ea">
            <span nz-icon nzType="check-circle" nzTheme="outline" style="color:#1e8e3e;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">Closed</span>
            <span class="kpi-value">{{ closedRepairs.length }}</span>
          </div>
          <span class="kpi-badge badge-green">Done</span>
        </div>
      </div>

      <!-- ═══ IN FIX TABLE ═══ -->
      <div class="table-section">
        <h2 class="section-title">
          <span nz-icon nzType="tool" nzTheme="outline" style="color:#f9ab00;"></span>
          In Fix
        </h2>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Driver</th>
                <th>Issue Type</th>
                <th>Priority</th>
                <th>Reported</th>
                <th>Provider</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of inFixRepairs">
                <td>
                  <div class="car-info">
                    <span class="car-name">{{ r.brand }} {{ r.model }}</span>
                    <span class="car-plate">{{ r.plate }}</span>
                  </div>
                </td>
                <td>{{ r.technician }}</td>
                <td><span class="type-pill">{{ r.repairType }}</span></td>
                <td>
                  <span class="priority-pill" [class.pill-high]="r.priority === 'High'" [class.pill-med]="r.priority === 'Medium'" [class.pill-low]="r.priority === 'Low'">{{ r.priority }}</span>
                </td>
                <td class="cell-date">{{ r.reportedDate }}</td>
                <td>{{ r.garage }}</td>
                <td>{{ r.duration || '-' }}</td>
                <td>
                  <nz-select [(ngModel)]="r.fixStatus" nzPlaceHolder="Select" style="width:180px;" nzSize="small">
                    <nz-option nzLabel="Still in Fix" nzValue="Still in Fix"></nz-option>
                    <nz-option nzLabel="Fixed" nzValue="Fixed"></nz-option>
                    <nz-option nzLabel="Not Going to Fix Yet" nzValue="Not Going to Fix Yet"></nz-option>
                  </nz-select>
                </td>
              </tr>
              <tr *ngIf="inFixRepairs.length === 0">
                <td colspan="8" class="empty-row">No cars currently in maintenance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ═══ CLOSED TABLE ═══ -->
      <div class="table-section">
        <h2 class="section-title">
          <span nz-icon nzType="check-circle" nzTheme="outline" style="color:#1e8e3e;"></span>
          Closed
        </h2>
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Driver</th>
                <th>Start Date</th>
                <th>Finish Date</th>
                <th>Price</th>
                <th>Provider</th>
                <th>Description</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of closedRepairs">
                <td>
                  <div class="car-info">
                    <span class="car-name">{{ r.brand }} {{ r.model }}</span>
                    <span class="car-plate">{{ r.plate }}</span>
                  </div>
                </td>
                <td>{{ r.technician }}</td>
                <td class="cell-date">{{ r.reportedDate }}</td>
                <td class="cell-date">{{ r.expectedDate }}</td>
                <td class="cell-cost"><span class="cost-value">{{ formatCost(r.estimatedCost) }}</span></td>
                <td>{{ r.garage }}</td>
                <td><span class="issue-text">{{ r.issue }}</span></td>
                <td>
                  <div class="doc-upload-cell">
                    <input type="file" accept=".jpg,.jpeg,.pdf"
                           (change)="onDocumentSelected($event, r)"
                           [id]="'doc-' + r.id" hidden />
                    <button class="doc-upload-btn" *ngIf="!r.documentName"
                            (click)="triggerDocUpload(r.id)">
                      <span nz-icon nzType="upload" nzTheme="outline"></span> Upload
                    </button>
                    <div class="doc-file-info" *ngIf="r.documentName">
                      <span nz-icon [nzType]="r.documentName!.endsWith('.pdf') ? 'file-pdf' : 'file-image'"
                            nzTheme="outline"></span>
                      <span class="doc-name">{{ r.documentName }}</span>
                      <button class="doc-remove" (click)="removeDocument(r)">
                        <span nz-icon nzType="close" nzTheme="outline"></span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr *ngIf="closedRepairs.length === 0">
                <td colspan="8" class="empty-row">No closed repairs yet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- ═══ REPORT NEW CAR FIX MODAL ═══ -->
    <div class="modal-overlay" *ngIf="showReportModal" (click)="showReportModal = false">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Request to Fix Car</h2>
          <button class="modal-close" (click)="showReportModal = false"><span nz-icon nzType="close" nzTheme="outline"></span></button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Select Car <span class="req">*</span></label>
              <nz-select [(ngModel)]="newFix.carId" nzPlaceHolder="Choose a vehicle" style="width:100%;">
                <nz-option *ngFor="let c of carOptions" [nzLabel]="c.label" [nzValue]="c.id"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Driver</label>
              <nz-select [(ngModel)]="newFix.driverId" nzPlaceHolder="Select driver" style="width:100%;">
                <nz-option *ngFor="let d of driverOptions" [nzLabel]="d.label" [nzValue]="d.id"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Urgency <span class="req">*</span></label>
              <nz-select [(ngModel)]="newFix.priority" nzPlaceHolder="Select priority" style="width:100%;">
                <nz-option nzLabel="High - Critical" nzValue="High"></nz-option>
                <nz-option nzLabel="Medium - Normal" nzValue="Medium"></nz-option>
                <nz-option nzLabel="Low - Can wait" nzValue="Low"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Reaction Type <span class="req">*</span></label>
              <nz-select [(ngModel)]="newFix.reactionType" nzPlaceHolder="Select problem type" style="width:100%;">
                <nz-option nzLabel="Problem Engine" nzValue="Problem Engine"></nz-option>
                <nz-option nzLabel="Problem in System" nzValue="Problem in System"></nz-option>
                <nz-option nzLabel="Change Tire (Pneu)" nzValue="Change Tire (Pneu)"></nz-option>
                <nz-option nzLabel="Problem with Equipment" nzValue="Problem with Equipment"></nz-option>
                <nz-option nzLabel="Other issues" nzValue="Other issues"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Provider / Support</label>
              <input nz-input [(ngModel)]="newFix.provider" placeholder="Type provider or support name" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Duration Value</label>
              <input nz-input type="number" [(ngModel)]="newFix.durationValue" placeholder="e.g. 5" min="1" />
            </div>
            <div class="form-group">
              <label>Duration Unit</label>
              <nz-select [(ngModel)]="newFix.durationUnit" nzPlaceHolder="Select unit" style="width:100%;">
                <nz-option nzLabel="Days" nzValue="Days"></nz-option>
                <nz-option nzLabel="Weeks" nzValue="Weeks"></nz-option>
                <nz-option nzLabel="Months" nzValue="Months"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-group">
            <label>Issue Description <span class="req">*</span></label>
            <textarea nz-input rows="3" [(ngModel)]="newFix.issue" placeholder="Describe the problem in detail..." class="issue-textarea"></textarea>
          </div>
          <div class="form-group">
            <label>Photos / Attachments</label>
            <div class="upload-area" (click)="fileInput.click()">
              <input #fileInput type="file" multiple accept="image/*,.pdf,.doc,.docx" style="display:none" (change)="onFilesSelected($event)" />
              <span nz-icon nzType="paper-clip" nzTheme="outline" class="upload-icon"></span>
              <span class="upload-text">Click to upload photos & documents</span>
              <span class="upload-hint">Images (PNG, JPG) &amp; Documents (PDF, DOC) up to 10MB</span>
              <div class="file-list" *ngIf="selectedFiles.length > 0">
                <div class="file-chip" *ngFor="let f of selectedFiles">
                  <span nz-icon [nzType]="getFileIcon(f.name)" nzTheme="outline"></span>
                  <span class="file-name">{{ f.name }}</span>
                  <span class="file-size">{{ (f.size / 1024).toFixed(0) }} KB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="showReportModal = false">Cancel</button>
          <button class="btn-blue" (click)="submitNewFix()" [class.disabled]="!isFormValid()">
            <span nz-icon nzType="plus" nzTheme="outline"></span> Submit Report
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ CLOSE REPAIR MODAL ═══ -->
    <div class="modal-overlay" *ngIf="showCloseRepairModal" (click)="showCloseRepairModal = false">
      <div class="modal-card" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Closed Ticket</h2>
          <button class="modal-close" (click)="showCloseRepairModal = false"><span nz-icon nzType="close" nzTheme="outline"></span></button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Select Car <span class="req">*</span></label>
              <nz-select [(ngModel)]="closeRepair.carId" nzPlaceHolder="Choose a vehicle" style="width:100%;">
                <nz-option *ngFor="let c of carOptions" [nzLabel]="c.label" [nzValue]="c.id"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Driver</label>
              <nz-select [(ngModel)]="closeRepair.driverId" nzPlaceHolder="Select driver" style="width:100%;">
                <nz-option *ngFor="let d of driverOptions" [nzLabel]="d.label" [nzValue]="d.id"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Start Date <span class="req">*</span></label>
              <input nz-input type="date" [(ngModel)]="closeRepair.startDate" />
            </div>
            <div class="form-group">
              <label>Finish Date <span class="req">*</span></label>
              <input nz-input type="date" [(ngModel)]="closeRepair.finishDate" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Repair Price <span class="req">*</span></label>
              <input nz-input type="number" [(ngModel)]="closeRepair.price" placeholder="e.g. 350" min="0" />
            </div>
            <div class="form-group">
              <label>Provider / Garage</label>
              <input nz-input [(ngModel)]="closeRepair.provider" placeholder="Type provider name" />
            </div>
          </div>
          <div class="form-group">
            <label>Description <span class="req">*</span></label>
            <textarea nz-input rows="3" [(ngModel)]="closeRepair.description" placeholder="Describe the repair work done..." class="issue-textarea"></textarea>
          </div>
          <div class="form-group">
            <label>Attached Files</label>
            <div class="upload-area" (click)="closeFileInput.click()">
              <input #closeFileInput type="file" multiple accept="image/*,.pdf" style="display:none" (change)="onCloseFilesSelected($event)" />
              <span nz-icon nzType="paper-clip" nzTheme="outline" class="upload-icon"></span>
              <span class="upload-text">Click to upload files</span>
              <div class="file-list" *ngIf="closeRepairFiles.length > 0">
                <div class="file-chip" *ngFor="let f of closeRepairFiles">
                  <span nz-icon nzType="file" nzTheme="outline"></span>
                  <span class="file-name">{{ f.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="showCloseRepairModal = false">Cancel</button>
          <button class="btn-outline-white" (click)="submitCloseRepair()" [class.disabled]="!isCloseRepairValid()">
            <span nz-icon nzType="check" nzTheme="outline"></span> Closed Ticket
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .repairs-container {
      min-height: 100vh;
      padding: 24px 28px;
      font-family: 'Inter', 'Google Sans', Arial, sans-serif;
    }

    /* ── HEADER ── */
    .repairs-header {
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

    /* ── BLUE BUTTON (primary action) ── */
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

    /* ── WHITE OUTLINE BUTTON ── */
    .btn-outline-white {
      background: #fff;
      border: 1px solid #e0e0e0;
      height: 34px;
      padding: 0 14px;
      color: #5f6368;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-outline-white:hover { background: #f1f3f4; border-color: #ccc; }
    .btn-outline-white.disabled { opacity: 0.4; cursor: not-allowed; }

    .header-btns {
      display: flex;
      gap: 8px;
    }

    .table-section {
      margin-bottom: 20px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 600;
      color: #202124;
      margin: 0 0 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* ── KPI CARDS ── */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .kpi-card {
      background: #fff;
      padding: 16px 20px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      border: 1px solid #e0e0e0;
      position: relative;
    }
    .kpi-icon-wrap {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-body {
      flex: 1;
    }
    .kpi-label {
      font-size: 11px;
      color: #5f6368;
      font-weight: 500;
      margin: 0 0 2px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kpi-value {
      font-size: 24px;
      font-weight: 600;
      color: #202124;
      margin: 0;
    }
    .kpi-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 10px;
      font-weight: 500;
      padding: 2px 8px;
      white-space: nowrap;
    }
    .badge-amber { background: #fef7e0; color: #f9ab00; }
    .badge-green { background: #e6f4ea; color: #1e8e3e; }

    @media (max-width: 992px) {
      .kpi-row { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 576px) {
      .kpi-row { grid-template-columns: 1fr; }
    }

    /* ── FILTERS BAR ── */
    .filters-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
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
      min-width: 200px;
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

    .btn-export {
      height: 34px;
      padding: 0 14px;
      border: 1px solid #e0e0e0;
      background: #fff;
      color: #5f6368;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
      white-space: nowrap;
    }
    .btn-export:hover { border-color: #1a73e8; color: #1a73e8; }

    /* ── TABLE ── */
    .table-card {
      background: #fff;
      border: 1px solid #e0e0e0;
      overflow: hidden;
    }
    .table-wrap {
      overflow-x: auto;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }
    .data-table thead th {
      text-align: left;
      padding: 12px 16px;
      font-weight: 500;
      color: #5f6368;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e0e0e0;
      white-space: nowrap;
      background: #f8f9fa;
    }
    .data-table tbody td {
      padding: 12px 16px;
      color: #202124;
      border-bottom: 1px solid #f1f3f4;
      vertical-align: middle;
    }
    .data-table tbody tr:hover td { background: #f1f3f4; }
    .data-table tbody tr:last-child td { border-bottom: none; }

    .empty-row {
      text-align: center;
      padding: 48px 16px !important;
      color: #9aa0a6 !important;
      font-size: 14px;
    }

    /* ── CAR CELL (no avatar, plain text only) ── */
    .car-info {
      display: flex;
      flex-direction: column;
    }
    .car-name {
      font-size: 13px;
      font-weight: 600;
      color: #202124;
    }
    .car-plate {
      font-size: 11px;
      color: #9aa0a6;
      font-weight: 500;
    }

    .issue-text {
      max-width: 200px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #5f6368;
    }

    /* ── PILLS ── */
    .status-pill {
      display: inline-block;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 500;
    }
    .pill-wait { background: #fef7e0; color: #f9ab00; }
    .pill-prog { background: #e8f0fe; color: #1a73e8; }
    .pill-done { background: #e6f4ea; color: #1e8e3e; }
    .pill-canc { background: #fce8e6; color: #d93025; }

    .type-pill {
      display: inline-block;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 500;
      background: #f1f3f4;
      color: #5f6368;
    }

    .priority-pill {
      display: inline-block;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
    }
    .pill-high { background: #fce8e6; color: #d93025; }
    .pill-med { background: #fef7e0; color: #f9ab00; }
    .pill-low { background: #e6f4ea; color: #1e8e3e; }

    /* ── CELLS ── */
    .cell-date { font-size: 12px; color: #5f6368; white-space: nowrap; }
    .garage-cell {
      display: flex;
      flex-direction: column;
    }
    .garage-name { font-size: 13px; font-weight: 500; color: #202124; }
    .tech-name { font-size: 11px; color: #9aa0a6; }
    .cell-cost {
      display: flex;
      flex-direction: column;
    }
    .cost-value { font-size: 13px; font-weight: 600; color: #202124; }
    .cost-label { font-size: 10px; color: #9aa0a6; }

    /* ── DOCUMENT UPLOAD CELL ── */
    .doc-upload-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .doc-upload-btn {
      height: 28px;
      padding: 0 10px;
      border: 1px solid #e0e0e0;
      background: #fff;
      color: #5f6368;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s;
    }
    .doc-upload-btn:hover { border-color: #1a73e8; color: #1a73e8; }
    .doc-file-info {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #202124;
    }
    .doc-name {
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .doc-remove {
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      color: #9aa0a6;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .doc-remove:hover { color: #d93025; }

    /* ── ACTION BUTTONS ── */
    .action-btns {
      display: flex;
      gap: 4px;
    }
    .action-btn {
      width: 28px;
      height: 28px;
      border: 1px solid #e0e0e0;
      background: white;
      color: #5f6368;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }
    .action-btn:hover { border-color: #1a73e8; color: #1a73e8; }
    .action-done:hover { border-color: #1e8e3e; color: #1e8e3e; }

    /* ── MODAL ── */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 20px;
      backdrop-filter: blur(4px);
    }
    .modal-card {
      background: white;
      border-radius: 16px;
      width: 100%;
      max-width: 620px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
      animation: slideUp 0.25s ease;
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 28px 0;
    }
    .modal-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #202124;
    }
    .modal-close {
      width: 32px;
      height: 32px;
      border: none;
      background: #f1f3f4;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #5f6368;
      transition: all 0.2s;
    }
    .modal-close:hover { background: #fce8e6; color: #d93025; }
    .modal-body {
      padding: 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .form-row {
      display: flex;
      gap: 16px;
    }
    .form-row .form-group {
      flex: 1;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-group label {
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }
    .req { color: #d93025; }
    .issue-textarea {
      resize: vertical;
      min-height: 80px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      padding: 10px 14px;
      font-size: 14px;
      font-family: inherit;
    }
    .issue-textarea:focus { outline: none; border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
    .upload-area {
      border: 2px dashed #e0e0e0;
      border-radius: 10px;
      padding: 28px;
      text-align: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .upload-area:hover { border-color: #1a73e8; background: #e8f0fe; }
    .upload-icon { font-size: 28px; color: #9aa0a6; }
    .upload-text { font-size: 14px; color: #5f6368; font-weight: 500; }
    .upload-hint { font-size: 12px; color: #9aa0a6; }
    .file-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; width: 100%; }
    .file-chip {
      display: flex; align-items: center; gap: 6px; padding: 6px 12px;
      background: #f1f3f4; font-size: 12px; color: #202124;
    }
    .file-name { font-weight: 500; max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-size { color: #9aa0a6; font-size: 11px; }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 28px 24px;
    }
    .btn-cancel {
      height: 34px;
      padding: 0 16px;
      border: 1px solid #e0e0e0;
      background: white;
      color: #5f6368;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }
    .btn-cancel:hover { background: #f1f3f4; }

    @media (max-width: 1024px) {
      .repairs-container { padding: 20px 16px; }
      .form-row { flex-direction: column; }
      .filters-bar { flex-direction: column; align-items: stretch; }
      .search-wrap { min-width: auto; }
    }
  `]
})
export class RepairsComponent {
  searchQuery = '';
  filterStatus = '';
  filterPriority = '';
  filterType = '';
  statusTab = '';

  showReportModal = false;
  showCloseRepairModal = false;

  newFix = {
    carId: '',
    driverId: '',
    priority: '',
    reactionType: '',
    provider: '',
    durationValue: null as number | null,
    durationUnit: '',
    issue: ''
  };

  closeRepair = {
    carId: '',
    driverId: '',
    startDate: '',
    finishDate: '',
    price: null as number | null,
    provider: '',
    description: ''
  };

  closeRepairFiles: File[] = [];

  selectedFiles: File[] = [];

  driverOptions = [
    { id: 'd1', label: 'Ahmed Sayeb' },
    { id: 'd2', label: 'Karim Lazrak' },
    { id: 'd3', label: 'Sami Bouzid' },
    { id: 'd4', label: 'Yassin Fikri' },
    { id: 'd5', label: 'Mehdi Benali' },
    { id: 'd6', label: 'Omar El Fassi' },
    { id: 'd7', label: 'Hicham Bennis' },
    { id: 'd8', label: 'Nabil El Khayat' },
  ];

  carOptions = [
    { id: '1', label: 'Toyota Camry LE - 1234 ABC' },
    { id: '2', label: 'Honda Accord EX - 5678 DEF' },
    { id: '3', label: 'Ford Transit XLT - 9012 GHI' },
    { id: '4', label: 'Nissan Altima SV - 3456 JKL' },
    { id: '5', label: 'Mercedes Sprinter - 7890 MNO' },
    { id: '6', label: 'Chevrolet Express - 1112 PQR' },
    { id: '7', label: 'BMW 5 Series - 1314 STU' },
  ];

  repairs: Repair[] = [
    { id: 'R001', plate: '1234 ABC', brand: 'Toyota', model: 'Camry LE', year: 2024, image: '', issue: 'Engine overheating after 30 min of driving. Coolant leak detected.', repairType: 'Problem Engine', status: 'In Progress', reportedDate: '2026-05-20', startDate: '2026-05-22', expectedDate: '2026-05-28', garage: 'AutoPro Main', technician: 'Ahmed Sayeb', estimatedCost: 1200, priority: 'High', duration: '5 Days', fixStatus: 'Still in Fix' },
    { id: 'R002', plate: '5678 DEF', brand: 'Honda', model: 'Accord EX', year: 2024, image: '', issue: 'Check engine light on. Error code P0420.', repairType: 'Problem in System', status: 'Waiting', reportedDate: '2026-05-22', startDate: '', expectedDate: '2026-05-30', garage: 'SpeedFix Center', technician: 'Karim Lazrak', estimatedCost: 450, priority: 'Medium', duration: '3 Days', fixStatus: 'Still in Fix' },
    { id: 'R003', plate: '9012 GHI', brand: 'Ford', model: 'Transit XLT', year: 2023, image: '', issue: 'Front bumper cracked. Minor body damage from parking incident.', repairType: 'Problem with Equipment', status: 'Completed', reportedDate: '2026-05-10', startDate: '2026-05-12', expectedDate: '2026-05-19', garage: 'Elite Garage', technician: 'Sami Bouzid', estimatedCost: 800, actualCost: 750, priority: 'Low' },
    { id: 'R004', plate: '7890 MNO', brand: 'Mercedes', model: 'Sprinter', year: 2024, image: '', issue: 'Transmission slipping in 3rd gear. Needs full diagnostic.', repairType: 'Problem Engine', status: 'In Progress', reportedDate: '2026-05-23', startDate: '2026-05-24', expectedDate: '2026-06-02', garage: 'AutoPro Main', technician: 'Ahmed Sayeb', estimatedCost: 2500, priority: 'High', duration: '2 Weeks', fixStatus: 'Still in Fix' },
    { id: 'R005', plate: '1112 PQR', brand: 'Chevrolet', model: 'Express', year: 2023, image: '', issue: 'AC not cooling. Compressor not engaging.', repairType: 'Problem in System', status: 'Completed', reportedDate: '2026-05-19', startDate: '2026-05-21', expectedDate: '2026-05-27', garage: 'SpeedFix Center', technician: 'Karim Lazrak', estimatedCost: 680, priority: 'Medium' },
  ];

  get inFixRepairs(): Repair[] {
    return this.repairs.filter(r => r.status === 'Waiting' || r.status === 'In Progress');
  }

  get closedRepairs(): Repair[] {
    return this.repairs.filter(r => r.status === 'Completed');
  }

  countByStatus(s: string): number {
    return this.repairs.filter(r => r.status === s).length;
  }

  viewDetails(r: Repair): void {
    alert(`Viewing details for ${r.brand} ${r.model} (${r.plate})\nIssue: ${r.issue}`);
  }

  updateStatus(r: Repair): void {
    const statuses: Repair['status'][] = ['Waiting', 'In Progress', 'Completed'];
    const idx = statuses.indexOf(r.status);
    if (idx < statuses.length - 1) {
      r.status = statuses[idx + 1];
      if (r.status === 'In Progress' && !r.startDate) {
        r.startDate = '2026-05-25';
      }
    }
  }

  markCompleted(r: Repair): void {
    r.status = 'Completed';
    r.actualCost = r.estimatedCost;
  }

  exportList(): void {
    alert('Exporting repair list as CSV...');
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  getFileIcon(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'file-pdf';
    if (['doc', 'docx'].includes(ext || '')) return 'file-text';
    if (['png', 'jpg', 'jpeg', 'webp', 'avif'].includes(ext || '')) return 'file-image';
    return 'paper-clip';
  }

  isFormValid(): boolean {
    return !!(this.newFix.carId && this.newFix.priority && this.newFix.reactionType && this.newFix.issue);
  }

  formatCost(n: number): string {
    return '$' + n.toLocaleString();
  }

  submitNewFix(): void {
    if (!this.isFormValid()) return;

    const carOpt = this.carOptions.find(c => c.id === this.newFix.carId);
    const [brand, model, plate] = carOpt ? carOpt.label.split(' - ') : ['Unknown', '-', ''];

    const driverOpt = this.driverOptions.find(d => d.id === this.newFix.driverId);
    const driverName = driverOpt ? driverOpt.label : 'Unassigned';

    const duration = this.newFix.durationValue && this.newFix.durationUnit
      ? `${this.newFix.durationValue} ${this.newFix.durationUnit}`
      : '';

    const newRepair: Repair = {
      id: `R${String(this.repairs.length + 1).padStart(3, '0')}`,
      plate: plate || 'TBD',
      brand: brand || 'Unknown',
      model: model || '-',
      year: 2024,
      image: '',
      issue: this.newFix.issue,
      repairType: this.newFix.reactionType,
      status: 'Waiting',
      reportedDate: new Date().toISOString().slice(0, 10),
      startDate: '',
      expectedDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      garage: this.newFix.provider || 'TBD',
      technician: driverName,
      estimatedCost: 0,
      priority: this.newFix.priority as 'High' | 'Medium' | 'Low',
      duration: duration,
      fixStatus: 'Still in Fix',
    };

    this.repairs.unshift(newRepair);
    this.showReportModal = false;
    this.newFix = { carId: '', driverId: '', priority: '', reactionType: '', provider: '', durationValue: null, durationUnit: '', issue: '' };
    this.selectedFiles = [];
  }

  isCloseRepairValid(): boolean {
    return !!(this.closeRepair.carId && this.closeRepair.startDate && this.closeRepair.finishDate && this.closeRepair.price && this.closeRepair.description);
  }

  onCloseFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.closeRepairFiles = Array.from(input.files);
    }
  }

  submitCloseRepair(): void {
    if (!this.isCloseRepairValid()) return;

    const carOpt = this.carOptions.find(c => c.id === this.closeRepair.carId);
    const [brand, model, plate] = carOpt ? carOpt.label.split(' - ') : ['Unknown', '-', ''];

    const closedRepair: Repair = {
      id: `R${String(this.repairs.length + 1).padStart(3, '0')}`,
      plate: plate || 'TBD',
      brand: brand || 'Unknown',
      model: model || '-',
      year: 2024,
      image: '',
      issue: this.closeRepair.description,
      repairType: 'Completed Repair',
      status: 'Completed',
      reportedDate: this.closeRepair.startDate,
      startDate: this.closeRepair.startDate,
      expectedDate: this.closeRepair.finishDate,
      garage: this.closeRepair.provider || 'TBD',
      technician: 'Unassigned',
      estimatedCost: this.closeRepair.price || 0,
      priority: 'Medium',
    };

    this.repairs.unshift(closedRepair);
    this.showCloseRepairModal = false;
    this.closeRepair = { carId: '', driverId: '', startDate: '', finishDate: '', price: null, provider: '', description: '' };
    this.closeRepairFiles = [];
  }

  // ── Document upload methods for Closed table ──
  triggerDocUpload(repairId: string): void {
    document.getElementById('doc-' + repairId)?.click();
  }

  onDocumentSelected(event: Event, repair: Repair): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      repair.documentFile = file;
      repair.documentName = file.name;
    }
  }

  removeDocument(repair: Repair): void {
    repair.documentFile = undefined;
    repair.documentName = undefined;
  }
}