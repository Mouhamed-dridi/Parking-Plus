import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';

interface KpiCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

interface ReportTab {
  key: string;
  label: string;
  icon: string;
}

interface TableRow {
  [key: string]: string | number;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzIconModule, NzButtonModule,
    NzSelectModule, NzDropDownModule, NzTagModule
  ],
  template: `
    <div class="reports-container">

      <!-- ═══ HEADER ═══ -->
      <div class="reports-header">
        <div>
          <h1 class="page-title">Reports</h1>
          <p class="page-sub">Comprehensive insights into your fleet operations</p>
        </div>
        <div class="header-actions">
          <div class="date-range-picker">
            <span nz-icon nzType="calendar" nzTheme="outline"></span>
            <nz-select [(ngModel)]="selectedRange" nzPlaceHolder="Select range" style="width: 180px;">
              <nz-option nzLabel="Last 7 days" nzValue="7d"></nz-option>
              <nz-option nzLabel="Last 30 days" nzValue="30d"></nz-option>
              <nz-option nzLabel="Last 3 months" nzValue="3m"></nz-option>
              <nz-option nzLabel="Custom" nzValue="custom"></nz-option>
            </nz-select>
          </div>
          <button class="btn-export">
            <span nz-icon nzType="export" nzTheme="outline"></span> Export All
          </button>
          <button class="btn-generate" (click)="generateReport()">
            <span nz-icon nzType="reload" nzTheme="outline"></span> Generate Report
          </button>
        </div>
      </div>

      <!-- ═══ REPORT TABS ═══ -->
      <div class="report-tabs">
        <div
          class="tab-item"
          *ngFor="let tab of tabs"
          [class.active]="activeTab === tab.key"
          (click)="activeTab = tab.key"
        >
          <span nz-icon [nzType]="tab.icon" nzTheme="outline"></span>
          <span>{{ tab.label }}</span>
        </div>
      </div>

      <!-- ═══ FLEET OVERVIEW ═══ -->
      <ng-container *ngIf="activeTab === 'overview'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of fleetKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">
              {{ kpi.change }}
            </span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header">
              <h3>Fleet Status Distribution</h3>
            </div>
            <div class="pie-chart-wrap">
              <svg viewBox="0 0 200 200" class="pie-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f5f9" stroke-width="35"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" stroke-width="35" stroke-dasharray="251" stroke-dashoffset="0" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-90 100 100)"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#818cf8" stroke-width="35" stroke-dasharray="126" stroke-dashoffset="-251" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-90 100 100)"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#f59e0b" stroke-width="35" stroke-dasharray="63" stroke-dashoffset="-377" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-90 100 100)"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" stroke-width="35" stroke-dasharray="63" stroke-dashoffset="-440" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-90 100 100)"/>
                <text x="100" y="94" text-anchor="middle" class="pie-center-value">45</text>
                <text x="100" y="114" text-anchor="middle" class="pie-center-label">Total Cars</text>
              </svg>
              <div class="pie-legend-inline">
                <div class="legend-pill"><span class="dot" style="background:#10b981"></span> Active</div>
                <div class="legend-pill"><span class="dot" style="background:#818cf8"></span> Available</div>
                <div class="legend-pill"><span class="dot" style="background:#f59e0b"></span> In Use</div>
                <div class="legend-pill"><span class="dot" style="background:#ef4444"></span> Maintenance</div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-header">
              <h3>Monthly Mileage Trend</h3>
            </div>
            <svg viewBox="0 0 400 180" class="line-chart-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="mileageGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <line x1="40" y1="170" x2="390" y2="170" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="130" x2="390" y2="130" stroke="#f8fafc" stroke-width="1"/>
              <line x1="40" y1="90" x2="390" y2="90" stroke="#f8fafc" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="#f8fafc" stroke-width="1"/>
              <path d="M50,160 L95,120 L140,100 L185,70 L230,85 L275,45 L320,55 L365,40" fill="url(#mileageGrad)"/>
              <path d="M50,160 L95,120 L140,100 L185,70 L230,85 L275,45 L320,55 L365,40" fill="none" stroke="#6366f1" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="50" cy="160" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="95" cy="120" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="140" cy="100" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="185" cy="70" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="230" cy="85" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="275" cy="45" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="320" cy="55" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <circle cx="365" cy="40" r="3.5" fill="white" stroke="#6366f1" stroke-width="2"/>
              <text x="50" y="185" class="axis-label">Jan</text>
              <text x="140" y="185" class="axis-label">Mar</text>
              <text x="230" y="185" class="axis-label">May</text>
              <text x="320" y="185" class="axis-label">Jul</text>
              <text x="410" y="185" class="axis-label">Sep</text>
              <text x="30" y="174" class="axis-label" text-anchor="end">0</text>
              <text x="30" y="134" class="axis-label" text-anchor="end">5k</text>
              <text x="30" y="94" class="axis-label" text-anchor="end">10k</text>
              <text x="30" y="54" class="axis-label" text-anchor="end">15k</text>
            </svg>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header">
            <h3>Fleet Summary</h3>
            <button class="btn-small">Download</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>Vehicle</th><th>Type</th><th>Total Trips</th><th>Total Miles</th><th>Avg MPG</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let v of fleetSummary">
                <td class="cell-primary">{{ v.vehicle }}</td>
                <td>{{ v.type }}</td>
                <td>{{ v.trips }}</td>
                <td>{{ v.miles }}</td>
                <td>{{ v.mpg }}</td>
                <td><span class="status-pill" [class.pill-active]="v.status === 'Active'" [class.pill-idle]="v.status === 'Idle'" [class.pill-maint]="v.status === 'Maintenance'">{{ v.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ VEHICLE UTILIZATION ═══ -->
      <ng-container *ngIf="activeTab === 'utilization'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of utilizationKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">{{ kpi.change }}</span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header"><h3>Vehicle Usage Rate (%)</h3></div>
            <div class="bar-chart-wrap">
              <div class="bar-item" *ngFor="let v of utilizationData">
                <div class="bar-label">{{ v.name }}</div>
                <div class="bar-track">
                  <div class="bar-fill bar-indigo" [style.width]="v.usage + '%'"></div>
                </div>
                <div class="bar-value">{{ v.usage }}%</div>
              </div>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-header"><h3>Top 5 Most Used Cars</h3></div>
            <div class="top-list">
              <div class="top-row" *ngFor="let v of topUsed; let i = index">
                <span class="top-rank">#{{i+1}}</span>
                <div class="top-info">
                  <span class="top-name">{{ v.name }}</span>
                  <span class="top-meta">{{ v.model }}</span>
                </div>
                <div class="top-stat">
                  <span class="top-val">{{ v.hours }}h</span>
                  <span class="top-pct">{{ v.pct }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header"><h3>Vehicle Utilization Detail</h3><button class="btn-small">Export</button></div>
          <table class="data-table">
            <thead>
              <tr><th>Vehicle</th><th>Total Hours</th><th>In Use (h)</th><th>Idle (h)</th><th>Usage %</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let v of utilizationTable">
                <td class="cell-primary">{{ v.vehicle }}</td>
                <td>{{ v.total }}</td>
                <td>{{ v.inUse }}</td>
                <td>{{ v.idle }}</td>
                <td>
                  <div class="mini-bar-track"><div class="mini-bar-fill" [style.width]="v.pct + '%'"></div></div>
                  <span style="font-size:12px;color:#6b7280">{{ v.pct }}%</span>
                </td>
                <td><span class="status-pill" [class.pill-active]="v.status === 'Active'" [class.pill-idle]="v.status === 'Idle'">{{ v.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ DRIVER PERFORMANCE ═══ -->
      <ng-container *ngIf="activeTab === 'drivers'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of driverKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">{{ kpi.change }}</span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header"><h3>Driver Trips Comparison</h3></div>
            <svg viewBox="0 0 400 180" class="line-chart-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="driverGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
                </linearGradient>
              </defs>
              <line x1="40" y1="170" x2="390" y2="170" stroke="#e5e7eb" stroke-width="1"/>
              <line x1="40" y1="130" x2="390" y2="130" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="90" x2="390" y2="90" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="#f1f5f9" stroke-width="1"/>
              <path d="M50,150 L95,110 L140,130 L185,80 L230,60 L275,90 L320,50 L365,70" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M50,150 L95,110 L140,130 L185,80 L230,60 L275,90 L320,50 L365,70" fill="url(#driverGrad)"/>
              <circle cx="50" cy="150" r="4" fill="#10b981"/>
              <circle cx="95" cy="110" r="4" fill="#10b981"/>
              <circle cx="140" cy="130" r="4" fill="#10b981"/>
              <circle cx="185" cy="80" r="4" fill="#10b981"/>
              <circle cx="230" cy="60" r="4" fill="#10b981"/>
              <circle cx="275" cy="90" r="4" fill="#10b981"/>
              <circle cx="320" cy="50" r="4" fill="#10b981"/>
              <circle cx="365" cy="70" r="4" fill="#10b981"/>
              <text x="50" y="185" class="axis-label">Week 1</text>
              <text x="140" y="185" class="axis-label">Week 2</text>
              <text x="230" y="185" class="axis-label">Week 3</text>
              <text x="320" y="185" class="axis-label">Week 4</text>
              <text x="30" y="174" text-anchor="end" class="axis-label">0</text>
              <text x="30" y="134" text-anchor="end" class="axis-label">25</text>
              <text x="30" y="94" text-anchor="end" class="axis-label">50</text>
              <text x="30" y="54" text-anchor="end" class="axis-label">75</text>
            </svg>
          </div>
          <div class="chart-card">
            <div class="chart-header"><h3>On-Time Delivery Rate</h3></div>
            <div class="donut-wrap">
              <svg viewBox="0 0 200 200" class="pie-svg">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" stroke-width="30"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" stroke-width="30" stroke-dasharray="377" stroke-dashoffset="50" stroke-linecap="butt" transform="rotate(-90 100 100)"/>
                <text x="100" y="96" text-anchor="middle" class="pie-center-value" style="fill:#10b981">92%</text>
                <text x="100" y="114" text-anchor="middle" class="pie-center-label">On Time</text>
              </svg>
              <div class="donut-stats">
                <div class="d-stat"><span class="d-dot" style="background:#10b981"></span> On Time: 276</div>
                <div class="d-stat"><span class="d-dot" style="background:#f59e0b"></span> Late: 24</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header"><h3>Driver Performance Table</h3><button class="btn-small">Download</button></div>
          <table class="data-table">
            <thead>
              <tr><th>Driver</th><th>Total Trips</th><th>On-Time</th><th>Late</th><th>Avg Duration</th><th>Rating</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let d of driverTable">
                <td class="cell-primary"><div class="driver-cell"><div class="driver-avatar">{{ d.name[0] }}</div>{{ d.name }}</div></td>
                <td>{{ d.trips }}</td>
                <td>{{ d.onTime }}</td>
                <td>{{ d.late }}</td>
                <td>{{ d.avgDuration }}</td>
                <td><span class="star-rating">{{ d.rating }} <span nz-icon nzType="star" nzTheme="fill" style="color:#f59e0b;font-size:12px"></span></span></td>
                <td><span class="status-pill" [class.pill-active]="d.status === 'Active'" [class.pill-idle]="d.status === 'Inactive'">{{ d.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ PARKING ACTIVITY ═══ -->
      <ng-container *ngIf="activeTab === 'parking'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of parkingKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">{{ kpi.change }}</span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header"><h3>Occupancy Rate Over Time</h3></div>
            <svg viewBox="0 0 400 180" class="line-chart-svg" preserveAspectRatio="none">
              <line x1="40" y1="170" x2="390" y2="170" stroke="#e5e7eb" stroke-width="1"/>
              <line x1="40" y1="130" x2="390" y2="130" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="90" x2="390" y2="90" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="#f1f5f9" stroke-width="1"/>
              <defs><linearGradient id="parkGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></linearGradient></defs>
              <path d="M50,140 L95,100 L140,120 L185,80 L230,60 L275,70 L320,45 L365,55" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M50,140 L95,100 L140,120 L185,80 L230,60 L275,70 L320,45 L365,55" fill="url(#parkGrad)"/>
              <circle cx="50" cy="140" r="4" fill="#f59e0b"/><circle cx="95" cy="100" r="4" fill="#f59e0b"/>
              <circle cx="140" cy="120" r="4" fill="#f59e0b"/><circle cx="185" cy="80" r="4" fill="#f59e0b"/>
              <circle cx="230" cy="60" r="4" fill="#f59e0b"/><circle cx="275" cy="70" r="4" fill="#f59e0b"/>
              <circle cx="320" cy="45" r="4" fill="#f59e0b"/><circle cx="365" cy="55" r="4" fill="#f59e0b"/>
              <text x="50" y="185" class="axis-label">Mon</text><text x="140" y="185" class="axis-label">Wed</text>
              <text x="230" y="185" class="axis-label">Fri</text><text x="320" y="185" class="axis-label">Sun</text>
              <text x="30" y="174" text-anchor="end" class="axis-label">0%</text>
              <text x="30" y="94" text-anchor="end" class="axis-label">50%</text>
              <text x="30" y="54" text-anchor="end" class="axis-label">100%</text>
            </svg>
          </div>
          <div class="chart-card">
            <div class="chart-header"><h3>Most Used Parking Spots</h3></div>
            <div class="bar-chart-wrap">
              <div class="bar-item" *ngFor="let s of parkingTop">
                <div class="bar-label">{{ s.spot }}</div>
                <div class="bar-track">
                  <div class="bar-fill bar-amber" [style.width]="s.pct + '%'"></div>
                </div>
                <div class="bar-value">{{ s.count }}x</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header"><h3>Parking Activity Details</h3><button class="btn-small">Export</button></div>
          <table class="data-table">
            <thead>
              <tr><th>Spot ID</th><th>Location</th><th>Total Occupancy</th><th>Avg Duration</th><th>Occupancy Rate</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let p of parkingTable">
                <td class="cell-primary">{{ p.spot }}</td>
                <td>{{ p.location }}</td>
                <td>{{ p.occupancy }}</td>
                <td>{{ p.duration }}</td>
                <td><div class="mini-bar-track"><div class="mini-bar-fill fill-amber" [style.width]="p.rate + '%'"></div></div><span style="font-size:12px;color:#6b7280;margin-left:6px;">{{ p.rate }}%</span></td>
                <td><span class="status-pill" [class.pill-active]="p.status === 'Active'" [class.pill-idle]="p.status === 'Full'">{{ p.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ MAINTENANCE REPORT ═══ -->
      <ng-container *ngIf="activeTab === 'maintenance'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of maintenanceKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">{{ kpi.change }}</span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header"><h3>Maintenance Cost by Vehicle</h3></div>
            <svg viewBox="0 0 400 180" class="line-chart-svg" preserveAspectRatio="none">
              <line x1="40" y1="170" x2="390" y2="170" stroke="#e5e7eb" stroke-width="1"/>
              <line x1="40" y1="130" x2="390" y2="130" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="90" x2="390" y2="90" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="#f1f5f9" stroke-width="1"/>
              <defs><linearGradient id="maintGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ef4444" stop-opacity="0.2"/><stop offset="100%" stop-color="#ef4444" stop-opacity="0"/></linearGradient></defs>
              <rect x="50" y="80" width="30" height="90" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="95" y="60" width="30" height="110" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="140" y="100" width="30" height="70" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="185" y="50" width="30" height="120" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="230" y="90" width="30" height="80" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="275" y="70" width="30" height="100" rx="4" fill="#818cf8" opacity="0.75"/>
              <rect x="320" y="110" width="30" height="60" rx="4" fill="#818cf8" opacity="0.75"/>
              <text x="65" y="185" class="axis-label" text-anchor="middle">Car A</text>
              <text x="110" y="185" class="axis-label" text-anchor="middle">Car B</text>
              <text x="155" y="185" class="axis-label" text-anchor="middle">Car C</text>
              <text x="200" y="185" class="axis-label" text-anchor="middle">Car D</text>
              <text x="245" y="185" class="axis-label" text-anchor="middle">Car E</text>
              <text x="290" y="185" class="axis-label" text-anchor="middle">Car F</text>
              <text x="335" y="185" class="axis-label" text-anchor="middle">Car G</text>
              <text x="30" y="174" text-anchor="end" class="axis-label">$0</text>
              <text x="30" y="134" text-anchor="end" class="axis-label">$200</text>
              <text x="30" y="94" text-anchor="end" class="axis-label">$400</text>
              <text x="30" y="54" text-anchor="end" class="axis-label">$600</text>
            </svg>
          </div>
          <div class="chart-card">
            <div class="chart-header"><h3>Due for Maintenance</h3></div>
            <div class="top-list">
              <div class="top-row" *ngFor="let v of dueMaintenance; let i = index">
                <span class="top-rank urgent" *ngIf="i < 3">!</span>
                <span class="top-rank" *ngIf="i >= 3">#{{i+1}}</span>
                <div class="top-info">
                  <span class="top-name">{{ v.name }}</span>
                  <span class="top-meta">{{ v.dueIn }}</span>
                </div>
                <span class="status-pill pill-maint">{{ v.priority }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header"><h3>Maintenance History</h3><button class="btn-small">Download</button></div>
          <table class="data-table">
            <thead>
              <tr><th>Vehicle</th><th>Service Type</th><th>Date</th><th>Cost</th><th>Mileage</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of maintenanceTable">
                <td class="cell-primary">{{ m.vehicle }}</td>
                <td>{{ m.service }}</td>
                <td>{{ m.date }}</td>
                <td>{{ m.cost }}</td>
                <td>{{ m.mileage }}</td>
                <td><span class="status-pill" [class.pill-active]="m.status === 'Completed'" [class.pill-maint]="m.status === 'Pending'" [class.pill-idle]="m.status === 'Scheduled'">{{ m.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

      <!-- ═══ FUEL CONSUMPTION ═══ -->
      <ng-container *ngIf="activeTab === 'fuel'">
        <div class="kpi-row">
          <div class="kpi-card" *ngFor="let kpi of fuelKpis">
            <div class="kpi-icon" [style.background]="kpi.color + '15'">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
            <div class="kpi-info">
              <span class="kpi-label">{{ kpi.label }}</span>
              <span class="kpi-value">{{ kpi.value }}</span>
            </div>
            <span class="kpi-change" [class.up]="kpi.trend === 'up'" [class.down]="kpi.trend === 'down'">{{ kpi.change }}</span>
          </div>
        </div>
        <div class="charts-grid two-col">
          <div class="chart-card">
            <div class="chart-header"><h3>Fuel Consumption Trend</h3></div>
            <svg viewBox="0 0 400 180" class="line-chart-svg" preserveAspectRatio="none">
              <line x1="40" y1="170" x2="390" y2="170" stroke="#e5e7eb" stroke-width="1"/>
              <line x1="40" y1="130" x2="390" y2="130" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="90" x2="390" y2="90" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="50" x2="390" y2="50" stroke="#f1f5f9" stroke-width="1"/>
              <defs><linearGradient id="fuelGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2"/><stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/></linearGradient></defs>
              <path d="M50,150 L95,130 L140,110 L185,120 L230,90 L275,100 L320,70 L365,80" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>
              <path d="M50,150 L95,130 L140,110 L185,120 L230,90 L275,100 L320,70 L365,80" fill="url(#fuelGrad)"/>
              <circle cx="50" cy="150" r="4" fill="#f59e0b"/><circle cx="95" cy="130" r="4" fill="#f59e0b"/>
              <circle cx="140" cy="110" r="4" fill="#f59e0b"/><circle cx="185" cy="120" r="4" fill="#f59e0b"/>
              <circle cx="230" cy="90" r="4" fill="#f59e0b"/><circle cx="275" cy="100" r="4" fill="#f59e0b"/>
              <circle cx="320" cy="70" r="4" fill="#f59e0b"/><circle cx="365" cy="80" r="4" fill="#f59e0b"/>
              <text x="50" y="185" class="axis-label">Jan</text><text x="140" y="185" class="axis-label">Mar</text>
              <text x="230" y="185" class="axis-label">May</text><text x="320" y="185" class="axis-label">Jul</text>
              <text x="30" y="174" text-anchor="end" class="axis-label">0</text>
              <text x="30" y="134" text-anchor="end" class="axis-label">200</text>
              <text x="30" y="94" text-anchor="end" class="axis-label">400</text>
              <text x="30" y="54" text-anchor="end" class="axis-label">600</text>
            </svg>
          </div>
          <div class="chart-card">
            <div class="chart-header"><h3>Fuel Cost per Vehicle</h3></div>
            <div class="bar-chart-wrap">
              <div class="bar-item" *ngFor="let v of fuelByVehicle">
                <div class="bar-label">{{ v.name }}</div>
                <div class="bar-track"><div class="bar-fill bar-amber" [style.width]="v.pct + '%'"></div></div>
                <div class="bar-value">{{ v.cost }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-card">
          <div class="chart-header"><h3>Fuel Consumption Details</h3><button class="btn-small">Export</button></div>
          <table class="data-table">
            <thead>
              <tr><th>Vehicle</th><th>Gallons Used</th><th>Total Cost</th><th>Avg MPG</th><th>Miles Driven</th><th>Efficiency</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let f of fuelTable">
                <td class="cell-primary">{{ f.vehicle }}</td>
                <td>{{ f.gallons }}</td>
                <td>{{ f.cost }}</td>
                <td>{{ f.mpg }}</td>
                <td>{{ f.miles }}</td>
                <td><span class="status-pill" [class.pill-active]="f.efficiency === 'Good'" [class.pill-idle]="f.efficiency === 'Average'" [class.pill-maint]="f.efficiency === 'Poor'">{{ f.efficiency }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .reports-container { min-height: 100vh; padding: 24px 28px; }

    .reports-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }
    .page-title { margin: 0; font-size: 22px; font-weight: 600; color: #202124; }
    .page-sub { margin: 4px 0 0; font-size: 13px; color: #5f6368; }
    .header-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .date-range-picker { display: flex; align-items: center; gap: 6px; background: #fff; padding: 0 10px 0 12px; border: 1px solid #e0e0e0; height: 34px; }
    .date-range-picker span[nz-icon] { color: #1a73e8; font-size: 16px; }
    .date-range-picker nz-select { border: none; }
    .btn-export { height: 34px; padding: 0 14px; border: 1px solid #e0e0e0; background: #fff; color: #5f6368; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
    .btn-export:hover { border-color: #ccc; }
    .btn-generate { height: 34px; padding: 0 14px; border: 1px solid #1a73e8; background: #1a73e8; color: #fff; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
    .btn-generate:hover { background: #1557b0; }

    .report-tabs { display: flex; gap: 0; margin-bottom: 24px; border-bottom: 1px solid #e0e0e0; overflow-x: auto; }
    .tab-item { display: flex; align-items: center; gap: 6px; padding: 10px 18px; font-size: 13px; font-weight: 500; color: #5f6368; cursor: pointer; white-space: nowrap; border-bottom: 2px solid transparent; margin-bottom: -1px; }
    .tab-item:hover { color: #202124; background: #f1f3f4; }
    .tab-item.active { color: #1a73e8; border-bottom-color: #1a73e8; }
    .tab-item span[nz-icon] { font-size: 15px; }

    .kpi-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
    .kpi-card { background: #fff; padding: 16px 20px; display: flex; align-items: center; gap: 14px; border: 1px solid #e0e0e0; }
    .kpi-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .kpi-icon span[nz-icon] { font-size: 18px; }
    .kpi-info { display: flex; flex-direction: column; flex: 1; }
    .kpi-label { font-size: 11px; font-weight: 500; color: #5f6368; text-transform: uppercase; }
    .kpi-value { font-size: 22px; font-weight: 600; color: #202124; margin-top: 2px; }
    .kpi-change { font-size: 11px; font-weight: 500; padding: 3px 8px; white-space: nowrap; }
    .kpi-change.up { background: #e6f4ea; color: #1e8e3e; }
    .kpi-change.down { background: #fce8e6; color: #d93025; }

    .charts-grid { display: grid; gap: 16px; margin-bottom: 24px; }
    .charts-grid.two-col { grid-template-columns: 1fr 1fr; }
    .chart-card { background: #fff; padding: 20px; border: 1px solid #e0e0e0; }
    .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .chart-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #202124; }
    .btn-small { padding: 4px 12px; border: 1px solid #e0e0e0; background: #fff; font-size: 12px; color: #5f6368; cursor: pointer; }
    .btn-small:hover { background: #f1f3f4; }

    .pie-chart-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; }
    .pie-svg { width: 200px; height: 200px; }
    .pie-center-value { font-size: 28px; font-weight: 600; fill: #202124; font-family: 'Google Sans', Arial, sans-serif; }
    .pie-center-label { font-size: 11px; fill: #5f6368; font-family: 'Google Sans', Arial, sans-serif; }
    .pie-legend-inline { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
    .legend-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: #f1f3f4; font-size: 12px; color: #5f6368; }

    .line-chart-svg { width: 100%; height: 200px; }
    .axis-label { font-size: 10px; fill: #5f6368; font-family: 'Google Sans', Arial, sans-serif; }

    .bar-chart-wrap { display: flex; flex-direction: column; gap: 10px; }
    .bar-item { display: flex; align-items: center; gap: 10px; }
    .bar-label { width: 80px; font-size: 13px; color: #5f6368; flex-shrink: 0; text-align: right; overflow: hidden; text-overflow: ellipsis; }
    .bar-track { flex: 1; height: 6px; background: #f1f3f4; overflow: hidden; }
    .bar-fill { height: 100%; transition: width 0.6s; }
    .bar-indigo { background: #1a73e8; }
    .bar-amber { background: #f9ab00; }
    .bar-value { width: 50px; font-size: 12px; font-weight: 600; color: #5f6368; flex-shrink: 0; }

    .donut-wrap { display: flex; align-items: center; gap: 24px; }
    .donut-stats { display: flex; flex-direction: column; gap: 8px; }
    .d-stat { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #5f6368; }
    .d-dot { width: 10px; height: 10px; display: inline-block; }

    .top-list { display: flex; flex-direction: column; }
    .top-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #e0e0e0; }
    .top-row:last-child { border-bottom: none; }
    .top-rank { width: 24px; height: 24px; background: #f1f3f4; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #5f6368; flex-shrink: 0; }
    .top-rank.urgent { background: #fce8e6; color: #d93025; }
    .top-info { display: flex; flex-direction: column; flex: 1; }
    .top-name { font-size: 13px; font-weight: 500; color: #202124; }
    .top-meta { font-size: 11px; color: #5f6368; }
    .top-stat { display: flex; flex-direction: column; align-items: flex-end; }
    .top-val { font-size: 14px; font-weight: 600; color: #202124; }
    .top-pct { font-size: 11px; color: #5f6368; }

    .table-card { background: #fff; padding: 20px; border: 1px solid #e0e0e0; overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
    .data-table thead th { text-align: left; padding: 10px 12px; font-weight: 500; color: #5f6368; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #e0e0e0; white-space: nowrap; }
    .data-table tbody td { padding: 10px 12px; color: #5f6368; border-bottom: 1px solid #e0e0e0; }
    .data-table tbody tr:last-child td { border-bottom: none; }
    .data-table tbody tr:hover td { background: #f1f3f4; }
    .cell-primary { font-weight: 500; color: #202124; }

    .status-pill { display: inline-block; padding: 2px 10px; font-size: 11px; font-weight: 500; }
    .pill-active { background: #e6f4ea; color: #1e8e3e; }
    .pill-idle { background: #fef7e0; color: #e37400; }
    .pill-maint { background: #fce8e6; color: #d93025; }

    .mini-bar-track { width: 80px; height: 6px; background: #f1f3f4; display: inline-block; vertical-align: middle; overflow: hidden; }
    .mini-bar-fill { height: 100%; background: #1a73e8; }
    .mini-bar-fill.fill-amber { background: #f9ab00; }

    .driver-cell { display: flex; align-items: center; gap: 10px; }
    .driver-avatar { width: 28px; height: 28px; background: #1a73e8; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; }

    .star-rating { font-weight: 500; color: #5f6368; }

    @media (max-width: 1024px) { .charts-grid.two-col { grid-template-columns: 1fr; } .reports-header { flex-direction: column; } .header-actions { width: 100%; } }
  `]
})
export class ReportsComponent {
  selectedRange = '30d';

  activeTab = 'overview';

  tabs: ReportTab[] = [
    { key: 'overview', label: 'Fleet Overview', icon: 'dashboard' },
    { key: 'utilization', label: 'Vehicle Utilization', icon: 'car' },
    { key: 'drivers', label: 'Driver Performance', icon: 'idcard' },
    { key: 'parking', label: 'Parking Activity', icon: 'inbox' },
    { key: 'maintenance', label: 'Maintenance', icon: 'tool' },
    { key: 'fuel', label: 'Fuel Consumption', icon: 'thunderbolt' },
  ];

  generateReport(): void {
    const current = this.activeTab;
    this.activeTab = '';
    setTimeout(() => this.activeTab = current, 10);
  }

  // ── Fleet Overview KPIs ──
  fleetKpis: KpiCard[] = [
    { label: 'Total Cars', value: '45', change: '+3 this month', trend: 'up', icon: 'car', color: '#6366f1' },
    { label: 'Active Cars', value: '32', change: '71% fleet', trend: 'up', icon: 'check-circle', color: '#10b981' },
    { label: 'Total Mileage', value: '12,850', change: '+8.2%', trend: 'up', icon: 'dashboard', color: '#f59e0b' },
    { label: 'Avg MPG', value: '24.6', change: '+1.2', trend: 'up', icon: 'thunderbolt', color: '#3b82f6' },
    { label: 'Total Trips', value: '1,247', change: '+12.5%', trend: 'up', icon: 'swap', color: '#8b5cf6' },
  ];

  fleetSummary = [
    { vehicle: 'Toyota Camry', type: 'Sedan', trips: 156, miles: '18,720', mpg: '28', status: 'Active' },
    { vehicle: 'Honda Accord', type: 'Sedan', trips: 142, miles: '16,340', mpg: '30', status: 'Active' },
    { vehicle: 'Ford Transit', type: 'Van', trips: 98, miles: '22,100', mpg: '18', status: 'Active' },
    { vehicle: 'Chevrolet Express', type: 'Van', trips: 87, miles: '19,850', mpg: '16', status: 'Idle' },
    { vehicle: 'Nissan Altima', type: 'Sedan', trips: 134, miles: '15,200', mpg: '32', status: 'Active' },
    { vehicle: 'Mercedes Sprinter', type: 'Van', trips: 76, miles: '24,500', mpg: '15', status: 'Maintenance' },
    { vehicle: 'BMW 5 Series', type: 'Luxury', trips: 112, miles: '14,300', mpg: '26', status: 'Active' },
  ];

  // ── Utilization ──
  utilizationKpis: KpiCard[] = [
    { label: 'Avg Utilization', value: '68%', change: '+5%', trend: 'up', icon: 'car', color: '#6366f1' },
    { label: 'Most Used', value: 'Toyota Camry', change: '84% usage', trend: 'up', icon: 'arrow-up', color: '#10b981' },
    { label: 'Idle Cars', value: '7', change: '-2 from last month', trend: 'down', icon: 'pause-circle', color: '#f59e0b' },
    { label: 'Peak Usage Hour', value: '10:00 AM', change: 'busiest time', trend: 'up', icon: 'clock-circle', color: '#8b5cf6' },
  ];

  utilizationData = [
    { name: 'Camry', usage: 84 }, { name: 'Accord', usage: 76 },
    { name: 'Altima', usage: 72 }, { name: 'Transit', usage: 65 },
    { name: 'Sprinter', usage: 58 }, { name: 'Express', usage: 52 },
  ];

  topUsed = [
    { name: 'Toyota Camry', model: '2024 LE', hours: 312, pct: 84 },
    { name: 'Honda Accord', model: '2024 EX', hours: 289, pct: 76 },
    { name: 'Nissan Altima', model: '2023 SV', hours: 267, pct: 72 },
    { name: 'BMW 5 Series', model: '2024 530i', hours: 245, pct: 68 },
    { name: 'Ford Transit', model: '2023 XLT', hours: 221, pct: 65 },
  ];

  utilizationTable = [
    { vehicle: 'Toyota Camry', total: '372h', inUse: '312h', idle: '60h', pct: 84, status: 'Active' },
    { vehicle: 'Honda Accord', total: '380h', inUse: '289h', idle: '91h', pct: 76, status: 'Active' },
    { vehicle: 'Nissan Altima', total: '370h', inUse: '267h', idle: '103h', pct: 72, status: 'Active' },
    { vehicle: 'BMW 5 Series', total: '360h', inUse: '245h', idle: '115h', pct: 68, status: 'Active' },
    { vehicle: 'Ford Transit', total: '340h', inUse: '221h', idle: '119h', pct: 65, status: 'Idle' },
  ];

  // ── Driver Performance ──
  driverKpis: KpiCard[] = [
    { label: 'Total Drivers', value: '28', change: '+2 this month', trend: 'up', icon: 'team', color: '#6366f1' },
    { label: 'Active Drivers', value: '24', change: '86% active', trend: 'up', icon: 'check-circle', color: '#10b981' },
    { label: 'On-Time Rate', value: '92%', change: '+3%', trend: 'up', icon: 'clock-circle', color: '#059669' },
    { label: 'Avg Trip Duration', value: '45 min', change: '-2 min', trend: 'up', icon: 'swap', color: '#8b5cf6' },
  ];

  driverTable = [
    { name: 'Ahmed Benali', trips: 89, onTime: 84, late: 5, avgDuration: '38 min', rating: 4.8, status: 'Active' },
    { name: 'Sara Khelifi', trips: 76, onTime: 72, late: 4, avgDuration: '42 min', rating: 4.6, status: 'Active' },
    { name: 'Mehdi Bouzid', trips: 68, onTime: 61, late: 7, avgDuration: '50 min', rating: 4.3, status: 'Active' },
    { name: 'Leila Mansouri', trips: 54, onTime: 50, late: 4, avgDuration: '40 min', rating: 4.7, status: 'Active' },
    { name: 'Karim Nouri', trips: 45, onTime: 38, late: 7, avgDuration: '55 min', rating: 4.0, status: 'Inactive' },
    { name: 'Yasmine Gharbi', trips: 42, onTime: 40, late: 2, avgDuration: '35 min', rating: 4.9, status: 'Active' },
  ];

  // ── Parking Activity ──
  parkingKpis: KpiCard[] = [
    { label: 'Total Spots', value: '60', change: '100% capacity', trend: 'up', icon: 'inbox', color: '#6366f1' },
    { label: 'Avg Occupancy', value: '74%', change: '+6%', trend: 'up', icon: 'rise', color: '#f59e0b' },
    { label: 'Most Used Spot', value: 'A-12', change: '92% occupancy', trend: 'up', icon: 'star', color: '#10b981' },
    { label: 'Available Now', value: '16', change: '26% free', trend: 'down', icon: 'check', color: '#059669' },
  ];

  parkingTop = [
    { spot: 'A-12', pct: 92, count: 184 },
    { spot: 'B-07', pct: 88, count: 176 },
    { spot: 'A-05', pct: 85, count: 170 },
    { spot: 'C-03', pct: 79, count: 158 },
    { spot: 'B-12', pct: 74, count: 148 },
  ];

  parkingTable = [
    { spot: 'A-12', location: 'Zone A - North', occupancy: 184, duration: '3.2h', rate: 92, status: 'Active' },
    { spot: 'B-07', location: 'Zone B - East', occupancy: 176, duration: '2.8h', rate: 88, status: 'Active' },
    { spot: 'A-05', location: 'Zone A - South', occupancy: 170, duration: '4.1h', rate: 85, status: 'Active' },
    { spot: 'C-03', location: 'Zone C - West', occupancy: 158, duration: '2.5h', rate: 79, status: 'Active' },
    { spot: 'B-12', location: 'Zone B - West', occupancy: 148, duration: '3.0h', rate: 74, status: 'Full' },
    { spot: 'A-08', location: 'Zone A - Center', occupancy: 132, duration: '2.2h', rate: 66, status: 'Active' },
  ];

  // ── Maintenance ──
  maintenanceKpis: KpiCard[] = [
    { label: 'Total Cost', value: '$12,450', change: '+$2,100', trend: 'up', icon: 'dollar', color: '#ef4444' },
    { label: 'Pending Services', value: '5', change: '+2 this month', trend: 'down', icon: 'warning', color: '#f59e0b' },
    { label: 'Avg Cost/Repair', value: '$415', change: '-$50', trend: 'up', icon: 'tags', color: '#6366f1' },
    { label: 'Cars Due This Month', value: '3', change: 'schedule soon', trend: 'down', icon: 'calendar', color: '#8b5cf6' },
  ];

  dueMaintenance = [
    { name: 'Ford Transit', dueIn: 'Due in 2 days', priority: 'High' },
    { name: 'Mercedes Sprinter', dueIn: 'Due in 5 days', priority: 'High' },
    { name: 'Chevrolet Express', dueIn: 'Due in 1 week', priority: 'Medium' },
    { name: 'Honda Accord', dueIn: 'Due in 2 weeks', priority: 'Medium' },
    { name: 'Nissan Altima', dueIn: 'Due in 3 weeks', priority: 'Low' },
  ];

  maintenanceTable = [
    { vehicle: 'Mercedes Sprinter', service: 'Oil Change', date: '2026-05-15', cost: '$180', mileage: '24,500', status: 'Completed' },
    { vehicle: 'Ford Transit', service: 'Brake Pads', date: '2026-05-12', cost: '$450', mileage: '22,100', status: 'Completed' },
    { vehicle: 'Chevrolet Express', service: 'Tire Rotation', date: '2026-05-10', cost: '$120', mileage: '19,850', status: 'Scheduled' },
    { vehicle: 'BMW 5 Series', service: 'AC Service', date: '2026-05-08', cost: '$380', mileage: '14,300', status: 'Completed' },
    { vehicle: 'Toyota Camry', service: 'Transmission', date: '2026-05-05', cost: '$1,200', mileage: '18,720', status: 'Pending' },
    { vehicle: 'Honda Accord', service: 'Spark Plugs', date: '2026-05-03', cost: '$220', mileage: '16,340', status: 'Pending' },
  ];

  // ── Fuel Consumption ──
  fuelKpis: KpiCard[] = [
    { label: 'Total Fuel Cost', value: '$8,920', change: '+$640', trend: 'up', icon: 'dollar', color: '#f59e0b' },
    { label: 'Total Gallons', value: '3,240', change: '+210 gal', trend: 'up', icon: 'thunderbolt', color: '#f59e0b' },
    { label: 'Avg MPG Fleet', value: '24.6', change: '+0.8', trend: 'up', icon: 'dashboard', color: '#10b981' },
    { label: 'Most Efficient', value: 'Altima', change: '32 MPG', trend: 'up', icon: 'star', color: '#6366f1' },
  ];

  fuelByVehicle = [
    { name: 'Transit', pct: 100, cost: '$2,100' },
    { name: 'Sprinter', pct: 88, cost: '$1,850' },
    { name: 'Camry', pct: 72, cost: '$1,510' },
    { name: 'Express', pct: 68, cost: '$1,430' },
    { name: 'Altima', pct: 52, cost: '$1,090' },
    { name: 'Accord', pct: 48, cost: '$940' },
  ];

  fuelTable = [
    { vehicle: 'Ford Transit', gallons: 420, cost: '$2,100', mpg: '18', miles: '7,560', efficiency: 'Average' },
    { vehicle: 'Mercedes Sprinter', gallons: 370, cost: '$1,850', mpg: '15', miles: '5,550', efficiency: 'Poor' },
    { vehicle: 'Toyota Camry', gallons: 302, cost: '$1,510', mpg: '28', miles: '8,456', efficiency: 'Good' },
    { vehicle: 'Chevrolet Express', gallons: 286, cost: '$1,430', mpg: '16', miles: '4,576', efficiency: 'Average' },
    { vehicle: 'Nissan Altima', gallons: 218, cost: '$1,090', mpg: '32', miles: '6,976', efficiency: 'Good' },
    { vehicle: 'Honda Accord', gallons: 188, cost: '$940', mpg: '30', miles: '5,640', efficiency: 'Good' },
  ];
}