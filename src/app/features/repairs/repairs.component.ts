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
        <button class="btn-primary" (click)="showReportModal = true">
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          Report New Car Fix
        </button>
      </div>

      <!-- ═══ KPI CARDS ═══ -->
      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#eef2ff">
            <span nz-icon nzType="tool" nzTheme="outline" style="color:#6366f1;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">In Repair</span>
            <span class="kpi-value">{{ inRepairCount }}</span>
          </div>
          <span class="kpi-badge badge-blue">Active</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#fef3c7">
            <span nz-icon nzType="clock-circle" nzTheme="outline" style="color:#f59e0b;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">Waiting</span>
            <span class="kpi-value">{{ waitingCount }}</span>
          </div>
          <span class="kpi-badge badge-amber">Pending</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#ecfdf5">
            <span nz-icon nzType="check-circle" nzTheme="outline" style="color:#10b981;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">Repaired This Month</span>
            <span class="kpi-value">{{ repairedThisMonth }}</span>
          </div>
          <span class="kpi-badge badge-green">+{{ monthlyChange }}%</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-icon-wrap" style="background:#f0f5ff">
            <span nz-icon nzType="dashboard" nzTheme="outline" style="color:#3b82f6;font-size:20px;"></span>
          </div>
          <div class="kpi-body">
            <span class="kpi-label">Avg Repair Time</span>
            <span class="kpi-value">{{ avgRepairTime }}</span>
          </div>
          <span class="kpi-badge badge-blue">{{ avgTrend }}</span>
        </div>
      </div>

      <!-- ═══ FILTERS BAR ═══ -->
      <div class="filters-bar">
        <div class="search-wrap">
          <span nz-icon nzType="search" nzTheme="outline" class="search-icon"></span>
          <input nz-input [(ngModel)]="searchQuery" placeholder="Search by plate, brand, issue..." class="search-input" />
        </div>
        <nz-select [(ngModel)]="filterStatus" nzPlaceHolder="Status" style="width:150px;" nzAllowClear>
          <nz-option nzLabel="All Status" nzValue=""></nz-option>
          <nz-option nzLabel="Waiting" nzValue="Waiting"></nz-option>
          <nz-option nzLabel="In Progress" nzValue="In Progress"></nz-option>
          <nz-option nzLabel="Completed" nzValue="Completed"></nz-option>
          <nz-option nzLabel="Cancelled" nzValue="Cancelled"></nz-option>
        </nz-select>
        <nz-select [(ngModel)]="filterPriority" nzPlaceHolder="Priority" style="width:140px;" nzAllowClear>
          <nz-option nzLabel="All Priority" nzValue=""></nz-option>
          <nz-option nzLabel="High" nzValue="High"></nz-option>
          <nz-option nzLabel="Medium" nzValue="Medium"></nz-option>
          <nz-option nzLabel="Low" nzValue="Low"></nz-option>
        </nz-select>
        <nz-select [(ngModel)]="filterType" nzPlaceHolder="Repair Type" style="width:160px;" nzAllowClear>
          <nz-option nzLabel="All Types" nzValue=""></nz-option>
          <nz-option nzLabel="Mechanical" nzValue="Mechanical"></nz-option>
          <nz-option nzLabel="Electrical" nzValue="Electrical"></nz-option>
          <nz-option nzLabel="Body Damage" nzValue="Body Damage"></nz-option>
          <nz-option nzLabel="Tire" nzValue="Tire"></nz-option>
          <nz-option nzLabel="Other" nzValue="Other"></nz-option>
        </nz-select>
        <button class="btn-export" (click)="exportList()">
          <span nz-icon nzType="export" nzTheme="outline"></span> Export
        </button>
      </div>

      <!-- ═══ STATUS TABS ═══ -->
      <div class="status-tabs">
        <div class="stab" [class.active]="statusTab === ''" (click)="statusTab = ''">All Repairs <span class="stab-count">{{ filteredRepairs.length }}</span></div>
        <div class="stab" [class.active]="statusTab === 'Waiting'" (click)="statusTab = 'Waiting'">Waiting <span class="stab-count">{{ countByStatus('Waiting') }}</span></div>
        <div class="stab" [class.active]="statusTab === 'In Progress'" (click)="statusTab = 'In Progress'">In Progress <span class="stab-count">{{ countByStatus('In Progress') }}</span></div>
        <div class="stab" [class.active]="statusTab === 'Completed'" (click)="statusTab = 'Completed'">Completed <span class="stab-count">{{ countByStatus('Completed') }}</span></div>
        <div class="stab" [class.active]="statusTab === 'Cancelled'" (click)="statusTab = 'Cancelled'">Cancelled <span class="stab-count">{{ countByStatus('Cancelled') }}</span></div>
      </div>

      <!-- ═══ REPAIR TABLE ═══ -->
      <div class="table-card">
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Car</th>
                <th>Issue</th>
                <th>Type</th>
                <th>Status</th>
                <th>Reported</th>
                <th>Start Date</th>
                <th>Expected</th>
                <th>Garage / Tech</th>
                <th>Cost</th>
                <th>Priority</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of filteredRepairs">
                <td>
                  <div class="car-cell">
                    <div class="car-avatar">{{ r.brand[0] }}{{ r.model[0] }}</div>
                    <div class="car-info">
                      <span class="car-name">{{ r.brand }} {{ r.model }}</span>
                      <span class="car-plate">{{ r.plate }}</span>
                    </div>
                  </div>
                </td>
                <td><span class="issue-text">{{ r.issue }}</span></td>
                <td><span class="type-pill" [class.type-mech]="r.repairType === 'Mechanical'" [class.type-elec]="r.repairType === 'Electrical'" [class.type-body]="r.repairType === 'Body Damage'" [class.type-tire]="r.repairType === 'Tire'">{{ r.repairType }}</span></td>
                <td><span class="status-pill" [class.pill-wait]="r.status === 'Waiting'" [class.pill-prog]="r.status === 'In Progress'" [class.pill-done]="r.status === 'Completed'" [class.pill-canc]="r.status === 'Cancelled'">{{ r.status }}</span></td>
                <td class="cell-date">{{ r.reportedDate }}</td>
                <td class="cell-date">{{ r.startDate || '-' }}</td>
                <td class="cell-date">{{ r.expectedDate }}</td>
                <td>
                  <div class="garage-cell">
                    <span class="garage-name">{{ r.garage }}</span>
                    <span class="tech-name">{{ r.technician }}</span>
                  </div>
                </td>
                <td class="cell-cost">
                  <span class="cost-value">{{ formatCost(r.estimatedCost) }}</span>
                  <span class="cost-label" *ngIf="r.actualCost">actual: {{ formatCost(r.actualCost) }}</span>
                </td>
                <td>
                  <span class="priority-pill" [class.pill-high]="r.priority === 'High'" [class.pill-med]="r.priority === 'Medium'" [class.pill-low]="r.priority === 'Low'">{{ r.priority }}</span>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn" title="View Details" (click)="viewDetails(r)"><span nz-icon nzType="eye" nzTheme="outline"></span></button>
                    <button class="action-btn" title="Update Status" (click)="updateStatus(r)"><span nz-icon nzType="edit" nzTheme="outline"></span></button>
                    <button class="action-btn action-done" *ngIf="r.status !== 'Completed' && r.status !== 'Cancelled'" title="Mark Completed" (click)="markCompleted(r)"><span nz-icon nzType="check" nzTheme="outline"></span></button>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredRepairs.length === 0">
                <td colspan="11" class="empty-row">No repairs found matching your filters</td>
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
          <h2>Report New Car Fix</h2>
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
              <label>Repair Type <span class="req">*</span></label>
              <nz-select [(ngModel)]="newFix.repairType" nzPlaceHolder="Select type" style="width:100%;">
                <nz-option nzLabel="Mechanical" nzValue="Mechanical"></nz-option>
                <nz-option nzLabel="Electrical" nzValue="Electrical"></nz-option>
                <nz-option nzLabel="Body Damage" nzValue="Body Damage"></nz-option>
                <nz-option nzLabel="Tire" nzValue="Tire"></nz-option>
                <nz-option nzLabel="Other" nzValue="Other"></nz-option>
              </nz-select>
            </div>
            <div class="form-group">
              <label>Assigned Garage</label>
              <nz-select [(ngModel)]="newFix.garage" nzPlaceHolder="Select garage" style="width:100%;">
                <nz-option nzLabel="AutoPro Main" nzValue="AutoPro Main"></nz-option>
                <nz-option nzLabel="SpeedFix Center" nzValue="SpeedFix Center"></nz-option>
                <nz-option nzLabel="Elite Garage" nzValue="Elite Garage"></nz-option>
                <nz-option nzLabel="City Motors" nzValue="City Motors"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-group">
            <label>Issue Description <span class="req">*</span></label>
            <textarea nz-input rows="3" [(ngModel)]="newFix.issue" placeholder="Describe the problem in detail..." class="issue-textarea"></textarea>
          </div>
          <div class="form-group">
            <label>Photos / Attachments</label>
            <div class="upload-area" (click)="triggerUpload()">
              <span nz-icon nzType="camera" nzTheme="outline" class="upload-icon"></span>
              <span class="upload-text">Click to upload photos or drag & drop</span>
              <span class="upload-hint">PNG, JPG up to 10MB</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" (click)="showReportModal = false">Cancel</button>
          <button class="btn-primary" (click)="submitNewFix()" [class.disabled]="!isFormValid()">
            <span nz-icon nzType="plus" nzTheme="outline"></span> Submit Report
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .repairs-container {
      background: #f8fafc;
      min-height: 100vh;
      padding: 28px 32px;
      font-family: 'Inter', sans-serif;
    }

    /* ── HEADER ── */
    .repairs-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .page-title {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
      color: #1f2937;
    }
    .page-sub {
      margin: 4px 0 0;
      font-size: 14px;
      color: #6b7280;
    }
    .btn-primary {
      height: 42px;
      padding: 0 22px;
      border-radius: 10px;
      border: none;
      background: #6366f1;
      color: white;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-primary:hover { background: #4f46e5; }
    .btn-primary.disabled { opacity: 0.5; cursor: not-allowed; }

    /* ── KPI CARDS ── */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .kpi-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      border: 1px solid #f0f0f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .kpi-icon-wrap {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .kpi-body {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .kpi-label {
      font-size: 12px;
      font-weight: 500;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .kpi-value {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
      margin-top: 2px;
    }
    .kpi-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 20px;
      white-space: nowrap;
    }
    .badge-blue { background: #eef2ff; color: #6366f1; }
    .badge-amber { background: #fef3c7; color: #d97706; }
    .badge-green { background: #d1fae5; color: #059669; }

    /* ── FILTERS BAR ── */
    .filters-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      background: white;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
    }
    .search-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 200px;
    }
    .search-icon { color: #9ca3af; font-size: 16px; }
    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #374151;
      background: transparent;
    }
    .search-input::placeholder { color: #9ca3af; }

    .btn-export {
      height: 36px;
      padding: 0 16px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-export:hover { border-color: #6366f1; color: #6366f1; }

    /* ── STATUS TABS ── */
    .status-tabs {
      display: flex;
      gap: 4px;
      margin-bottom: 20px;
      background: white;
      padding: 4px;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
      overflow-x: auto;
    }
    .stab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .stab:hover { color: #6366f1; background: #f5f3ff; }
    .stab.active { color: white; background: #6366f1; }
    .stab.active .stab-count { background: rgba(255,255,255,0.2); color: white; }
    .stab-count {
      padding: 1px 8px;
      border-radius: 12px;
      font-size: 12px;
      background: #f1f5f9;
      color: #6b7280;
    }

    /* ── TABLE ── */
    .table-card {
      background: white;
      border-radius: 12px;
      border: 1px solid #f0f0f0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
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
      padding: 14px 16px;
      font-weight: 600;
      color: #6b7280;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #f1f5f9;
      white-space: nowrap;
      background: #fafafa;
    }
    .data-table tbody td {
      padding: 14px 16px;
      color: #374151;
      border-bottom: 1px solid #f9fafb;
      vertical-align: middle;
    }
    .data-table tbody tr:hover td { background: #f8fafc; }
    .data-table tbody tr:last-child td { border-bottom: none; }

    .empty-row {
      text-align: center;
      padding: 48px 16px !important;
      color: #9ca3af !important;
      font-size: 14px;
    }

    /* ── CAR CELL ── */
    .car-cell {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .car-avatar {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(135deg, #6366f1, #818cf8);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
      flex-shrink: 0;
    }
    .car-info {
      display: flex;
      flex-direction: column;
    }
    .car-name {
      font-size: 13px;
      font-weight: 600;
      color: #1f2937;
    }
    .car-plate {
      font-size: 11px;
      color: #9ca3af;
      font-weight: 500;
    }

    .issue-text {
      max-width: 200px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #6b7280;
    }

    /* ── PILLS ── */
    .status-pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .pill-wait { background: #fef3c7; color: #d97706; }
    .pill-prog { background: #dbeafe; color: #2563eb; }
    .pill-done { background: #d1fae5; color: #059669; }
    .pill-canc { background: #fee2e2; color: #dc2626; }

    .type-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 500;
      background: #f1f5f9;
      color: #6b7280;
    }
    .type-mech { background: #fef3c7; color: #d97706; }
    .type-elec { background: #dbeafe; color: #2563eb; }
    .type-body { background: #fce7f3; color: #db2777; }
    .type-tire { background: #e0e7ff; color: #4338ca; }

    .priority-pill {
      display: inline-block;
      padding: 3px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }
    .pill-high { background: #fee2e2; color: #dc2626; }
    .pill-med { background: #fef3c7; color: #d97706; }
    .pill-low { background: #d1fae5; color: #059669; }

    /* ── CELLS ── */
    .cell-date { font-size: 12px; color: #6b7280; white-space: nowrap; }
    .garage-cell {
      display: flex;
      flex-direction: column;
    }
    .garage-name { font-size: 13px; font-weight: 500; color: #374151; }
    .tech-name { font-size: 11px; color: #9ca3af; }
    .cell-cost {
      display: flex;
      flex-direction: column;
    }
    .cost-value { font-size: 13px; font-weight: 600; color: #1f2937; }
    .cost-label { font-size: 10px; color: #9ca3af; }

    /* ── ACTION BUTTONS ── */
    .action-btns {
      display: flex;
      gap: 4px;
    }
    .action-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      background: white;
      color: #6b7280;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .action-btn:hover { border-color: #6366f1; color: #6366f1; }
    .action-done:hover { border-color: #10b981; color: #10b981; }

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
      color: #1f2937;
    }
    .modal-close {
      width: 32px;
      height: 32px;
      border: none;
      background: #f1f5f9;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6b7280;
      transition: all 0.2s;
    }
    .modal-close:hover { background: #fee2e2; color: #dc2626; }
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
    .req { color: #dc2626; }
    .issue-textarea {
      resize: vertical;
      min-height: 80px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 10px 14px;
      font-size: 14px;
      font-family: inherit;
    }
    .issue-textarea:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
    .upload-area {
      border: 2px dashed #e5e7eb;
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
    .upload-area:hover { border-color: #6366f1; background: #f5f3ff; }
    .upload-icon { font-size: 28px; color: #9ca3af; }
    .upload-text { font-size: 14px; color: #6b7280; font-weight: 500; }
    .upload-hint { font-size: 12px; color: #9ca3af; }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 28px 24px;
    }
    .btn-cancel {
      height: 40px;
      padding: 0 20px;
      border-radius: 8px;
      border: 1px solid #d1d5db;
      background: white;
      color: #374151;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-cancel:hover { background: #f9fafb; }

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

  newFix = {
    carId: '',
    priority: '',
    repairType: '',
    garage: '',
    issue: ''
  };

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
    { id: 'R001', plate: '1234 ABC', brand: 'Toyota', model: 'Camry LE', year: 2024, image: '', issue: 'Engine overheating after 30 min of driving. Coolant leak detected.', repairType: 'Mechanical', status: 'In Progress', reportedDate: '2026-05-20', startDate: '2026-05-22', expectedDate: '2026-05-28', garage: 'AutoPro Main', technician: 'Ahmed Sayeb', estimatedCost: 1200, priority: 'High' },
    { id: 'R002', plate: '5678 DEF', brand: 'Honda', model: 'Accord EX', year: 2024, image: '', issue: 'Check engine light on. Error code P0420.', repairType: 'Electrical', status: 'Waiting', reportedDate: '2026-05-22', startDate: '', expectedDate: '2026-05-30', garage: 'SpeedFix Center', technician: 'Karim Lazrak', estimatedCost: 450, priority: 'Medium' },
    { id: 'R003', plate: '9012 GHI', brand: 'Ford', model: 'Transit XLT', year: 2023, image: '', issue: 'Front bumper cracked. Minor body damage from parking incident.', repairType: 'Body Damage', status: 'Completed', reportedDate: '2026-05-10', startDate: '2026-05-12', expectedDate: '2026-05-19', garage: 'Elite Garage', technician: 'Sami Bouzid', estimatedCost: 800, actualCost: 750, priority: 'Low' },
    { id: 'R004', plate: '3456 JKL', brand: 'Nissan', model: 'Altima SV', year: 2023, image: '', issue: 'Tire pressure warning. Left rear tire has slow puncture.', repairType: 'Tire', status: 'Completed', reportedDate: '2026-05-18', startDate: '2026-05-19', expectedDate: '2026-05-20', garage: 'City Motors', technician: 'Yassin Fikri', estimatedCost: 120, actualCost: 95, priority: 'Low' },
    { id: 'R005', plate: '7890 MNO', brand: 'Mercedes', model: 'Sprinter', year: 2024, image: '', issue: 'Transmission slipping in 3rd gear. Needs full diagnostic.', repairType: 'Mechanical', status: 'Waiting', reportedDate: '2026-05-23', startDate: '', expectedDate: '2026-06-02', garage: 'AutoPro Main', technician: 'Ahmed Sayeb', estimatedCost: 2500, priority: 'High' },
    { id: 'R006', plate: '1112 PQR', brand: 'Chevrolet', model: 'Express', year: 2023, image: '', issue: 'AC not cooling. Compressor not engaging.', repairType: 'Electrical', status: 'In Progress', reportedDate: '2026-05-19', startDate: '2026-05-21', expectedDate: '2026-05-27', garage: 'SpeedFix Center', technician: 'Karim Lazrak', estimatedCost: 680, priority: 'Medium' },
    { id: 'R007', plate: '1314 STU', brand: 'BMW', model: '5 Series', year: 2024, image: '', issue: 'Oil leak from valve cover gasket. Needs immediate repair.', repairType: 'Mechanical', status: 'Waiting', reportedDate: '2026-05-24', startDate: '', expectedDate: '2026-06-01', garage: 'Elite Garage', technician: 'Sami Bouzid', estimatedCost: 950, priority: 'High' },
    { id: 'R008', plate: '1516 VWX', brand: 'Volkswagen', model: 'Passat', year: 2022, image: '', issue: 'Brake pads worn. Squeaking noise when braking.', repairType: 'Mechanical', status: 'Completed', reportedDate: '2026-04-28', startDate: '2026-04-29', expectedDate: '2026-05-01', garage: 'City Motors', technician: 'Yassin Fikri', estimatedCost: 350, actualCost: 320, priority: 'Medium' },
    { id: 'R009', plate: '1718 YZA', brand: 'Hyundai', model: 'Sonata', year: 2023, image: '', issue: 'Battery dead. Needs replacement battery.', repairType: 'Electrical', status: 'Cancelled', reportedDate: '2026-05-15', startDate: '', expectedDate: '2026-05-18', garage: 'AutoPro Main', technician: 'Ahmed Sayeb', estimatedCost: 200, priority: 'Low' },
    { id: 'R010', plate: '1920 BCD', brand: 'Kia', model: 'Sportage', year: 2024, image: '', issue: 'Check suspension. Clunking noise from front left.', repairType: 'Mechanical', status: 'In Progress', reportedDate: '2026-05-17', startDate: '2026-05-19', expectedDate: '2026-05-26', garage: 'SpeedFix Center', technician: 'Karim Lazrak', estimatedCost: 1100, priority: 'High' },
  ];

  get inRepairCount(): number {
    return this.repairs.filter(r => r.status === 'In Progress').length;
  }
  get waitingCount(): number {
    return this.repairs.filter(r => r.status === 'Waiting').length;
  }
  get repairedThisMonth(): number {
    const m = '2026-05';
    return this.repairs.filter(r => r.status === 'Completed' && r.reportedDate.startsWith(m)).length;
  }
  get monthlyChange(): number {
    return 12;
  }
  get avgRepairTime(): string {
    return '4.2 days';
  }
  get avgTrend(): string {
    return '-0.8d';
  }

  countByStatus(s: string): number {
    return this.repairs.filter(r => r.status === s).length;
  }

  get filteredRepairs(): Repair[] {
    let list = [...this.repairs];

    if (this.statusTab) {
      list = list.filter(r => r.status === this.statusTab);
    }
    if (this.filterStatus) {
      list = list.filter(r => r.status === this.filterStatus);
    }
    if (this.filterPriority) {
      list = list.filter(r => r.priority === this.filterPriority);
    }
    if (this.filterType) {
      list = list.filter(r => r.repairType === this.filterType);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(r =>
        r.plate.toLowerCase().includes(q) ||
        r.brand.toLowerCase().includes(q) ||
        r.model.toLowerCase().includes(q) ||
        r.issue.toLowerCase().includes(q) ||
        r.garage.toLowerCase().includes(q)
      );
    }
    return list;
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

  triggerUpload(): void {
    alert('File upload dialog would open here');
  }

  isFormValid(): boolean {
    return !!(this.newFix.carId && this.newFix.priority && this.newFix.repairType && this.newFix.issue);
  }

  formatCost(n: number): string {
    return '$' + n.toLocaleString();
  }

  submitNewFix(): void {
    if (!this.isFormValid()) return;

    const carOpt = this.carOptions.find(c => c.id === this.newFix.carId);
    const [brand, model, plate] = carOpt ? carOpt.label.split(' - ') : ['Unknown', '-', ''];

    const newRepair: Repair = {
      id: `R${String(this.repairs.length + 1).padStart(3, '0')}`,
      plate: plate || 'TBD',
      brand: brand || 'Unknown',
      model: model || '-',
      year: 2024,
      image: '',
      issue: this.newFix.issue,
      repairType: this.newFix.repairType,
      status: 'Waiting',
      reportedDate: new Date().toISOString().slice(0, 10),
      startDate: '',
      expectedDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      garage: this.newFix.garage || 'TBD',
      technician: 'Unassigned',
      estimatedCost: 0,
      priority: this.newFix.priority as 'High' | 'Medium' | 'Low',
    };

    this.repairs.unshift(newRepair);
    this.showReportModal = false;
    this.newFix = { carId: '', priority: '', repairType: '', garage: '', issue: '' };
  }
}