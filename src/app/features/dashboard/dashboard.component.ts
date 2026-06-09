import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CarService } from '../../core/services/car.service';
import { AuthService } from '../../core/services/auth.service';

interface TopVehicle {
  name: string;
  type: string;
  image: string;
  trips: number;
  status: 'In Road' | 'Free' | 'Maintenance';
}

interface VehicleStatusItem {
  name: string;
  driverName: string;
  status: 'Free' | 'In Road' | 'Maintenance';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  template: `
    <div class="dash-container">

      <!-- ══════════════════ OPERATOR DASHBOARD ══════════════════ -->
      <div class="operator-dash" *ngIf="authService.isOperator()">
        <div class="dash-header">
          <div>
            <h1 class="welcome-title">Welcome back, {{ authService.getUserName() }}</h1>
            <p class="welcome-sub">Manage gate operations and monitor fleet activity.</p>
          </div>
        </div>
        <div class="action-grid">
          <div class="action-card" routerLink="/gates">
            <div class="icon-wrap" style="color:#1a73e8">
              <span nz-icon nzType="field-time" nzTheme="outline"></span>
            </div>
            <span class="card-label">Gate</span>
          </div>
          <div class="action-card" routerLink="/drivers">
            <div class="icon-wrap" style="color:#06b6d4">
              <span nz-icon nzType="idcard" nzTheme="outline"></span>
            </div>
            <span class="card-label">Driver</span>
          </div>
          <div class="action-card" routerLink="/listing">
            <div class="icon-wrap" style="color:#6366f1">
              <span nz-icon nzType="car" nzTheme="outline"></span>
            </div>
            <span class="card-label">Cars</span>
          </div>
          <div class="action-card" routerLink="/settings">
            <div class="icon-wrap" style="color:#f59e0b">
              <span nz-icon nzType="setting" nzTheme="outline"></span>
            </div>
            <span class="card-label">Settings</span>
          </div>
        </div>
      </div>

      <!-- ══════════════════ ADMIN DASHBOARD ══════════════════ -->
      <ng-container *ngIf="!authService.isOperator()">
      <div class="dash-header">
        <div>
          <h1 class="welcome-title">Welcome back, Administrator</h1>
          <p class="welcome-sub">Track your fleet activity, drivers and parking operations here.</p>
        </div>
        <div class="header-actions">
          <div class="date-pill">
            <span nz-icon nzType="calendar" nzTheme="outline"></span>
            <span>May 1–30, 2026</span>
          </div>
          <button class="action-btn ghost-btn">
            <span nz-icon nzType="export" nzTheme="outline"></span> Export All
          </button>
          <button class="action-btn primary-btn">
            <span nz-icon nzType="file-text" nzTheme="outline"></span> Generate Report
          </button>
        </div>
      </div>

      <!-- ══════════════════ KPI CARDS ROW ══════════════════ -->
      <div class="kpi-row">
        <div class="kpi-card" *ngFor="let kpi of kpis">
          <div class="kpi-icon-wrap" [style.background]="kpi.bg">
            <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
          </div>
          <div class="kpi-body">
            <p class="kpi-label">{{ kpi.label }}</p>
            <h2 class="kpi-value">{{ kpi.value }}</h2>
            <a class="kpi-link" [routerLink]="kpi.route">{{ kpi.link }}</a>
          </div>
          <div class="kpi-badge" [class.badge-up]="kpi.trend === 'up'" [class.badge-down]="kpi.trend === 'down'">
            <span nz-icon [nzType]="kpi.trend === 'up' ? 'arrow-up' : 'arrow-down'"></span>
            {{ kpi.change }}
          </div>
        </div>
      </div>

      <!-- ══════════════════ MIDDLE GRID ══════════════════ -->
      <div class="mid-grid">

        <!-- LEFT COLUMN -->
        <div class="left-col">

          <!-- Fleet Traffic Share -->
          <div class="card traffic-card">
            <div class="card-header-row">
              <h3 class="card-title">Fleet by Category</h3>
              <a class="view-all">View All ▾</a>
            </div>
            <div class="traffic-list">
              <div class="traffic-item" *ngFor="let t of trafficData">
                <div class="traffic-dot" [style.background]="t.color"></div>
                <div class="traffic-body">
                  <div class="traffic-top-row">
                    <span class="traffic-label">{{ t.label }}</span>
                    <span class="traffic-badge" [class.badge-up]="t.trend === 'up'" [class.badge-down]="t.trend === 'down'">
                      {{ t.trend === 'up' ? '▲' : '▼' }} {{ t.change }}
                    </span>
                    <span class="traffic-count">{{ t.count }}</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" [style.width]="t.pct + '%'" [style.background]="t.color"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CENTER COLUMN — MAIN CHART -->
        <div class="center-col">
          <div class="card chart-main-card">
            <div class="card-header-row">
              <h3 class="card-title">Fleet Activity Statistics</h3>
              <a class="view-all">View All ▾</a>
            </div>

            <!-- Legend pills -->
            <div class="legend-row">
              <div class="legend-pill" *ngFor="let l of chartLegend" (mouseenter)="activeLegend = l.key" (mouseleave)="activeLegend = ''">
                <span class="legend-dot" [style.background]="l.color"></span>
                <span>{{ l.label }}</span>
              </div>
            </div>

            <!-- SVG Combo Chart -->
            <svg viewBox="0 0 560 200" class="combo-chart-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="drvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
                  <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
                </linearGradient>
              </defs>

              <!-- Y-axis grid lines -->
              <line x1="40" y1="20" x2="550" y2="20" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="60" x2="550" y2="60" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="100" x2="550" y2="100" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="140" x2="550" y2="140" stroke="#f1f5f9" stroke-width="1"/>
              <line x1="40" y1="180" x2="550" y2="180" stroke="#f1f5f9" stroke-width="1"/>
              <!-- Y labels -->
              <text x="0" y="24" class="axis-label">80</text>
              <text x="0" y="64" class="axis-label">60</text>
              <text x="0" y="104" class="axis-label">40</text>
              <text x="0" y="144" class="axis-label">20</text>
              <text x="0" y="184" class="axis-label">0</text>

              <!-- Bars (Dispatches) — one per month -->
              <g>
                <rect *ngFor="let b of barData; let i = index" [attr.x]="44 + i*43" [attr.y]="180 - b" width="20" [attr.height]="b" rx="4" fill="#6366f1" [attr.opacity]="activeLegend === 'dispatch' || activeLegend === '' ? 0.85 : 0.2" class="bar-rect"/>
              </g>

              <!-- Occupancy spline (amber) -->
              <path [attr.d]="occPath" fill="url(#occGrad)"/>
              <path [attr.d]="occLinePath" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" [attr.opacity]="activeLegend === 'occupancy' || activeLegend === '' ? 1 : 0.15"/>
              <circle *ngFor="let p of occPoints" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="white" stroke="#f59e0b" stroke-width="2" [attr.opacity]="activeLegend === 'occupancy' || activeLegend === '' ? 1 : 0.15"/>

              <!-- Driver Avail spline (cyan) -->
              <path [attr.d]="drvPath" fill="url(#drvGrad)"/>
              <path [attr.d]="drvLinePath" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" [attr.opacity]="activeLegend === 'drivers' || activeLegend === '' ? 1 : 0.15"/>
              <circle *ngFor="let p of drvPoints" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="white" stroke="#06b6d4" stroke-width="2" [attr.opacity]="activeLegend === 'drivers' || activeLegend === '' ? 1 : 0.15"/>

              <!-- X-axis labels -->
              <text *ngFor="let m of months; let i = index" [attr.x]="52 + i*43" y="198" class="axis-label" text-anchor="middle">{{ m }}</text>
            </svg>
          </div>
        </div>

        
      </div>

      <!-- ══════════════════ BOTTOM GRID ══════════════════ -->
      <div class="bottom-grid">

        <!-- Top Vehicles -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Top Vehicles in Use</h3>
            <a class="view-all" routerLink="/listing">View All ▾</a>
          </div>
          <div class="vehicles-list">
            <div class="vehicle-row" *ngFor="let v of topVehicles; let i = index">
              <div class="v-rank">{{ i + 1 }}</div>
              <img [src]="v.image" class="v-img" [alt]="v.name" />
              <div class="v-info">
                <div class="v-name">{{ v.name }}</div>
                <div class="v-type">{{ v.type }}</div>
              </div>
              <div class="v-trips">{{ v.trips }} <span>trips</span></div>
              <div class="v-status-pill" [class.pill-road]="v.status === 'In Road'" [class.pill-free]="v.status === 'Free'" [class.pill-maint]="v.status === 'Maintenance'">{{ v.status }}</div>
            </div>
          </div>
        </div>

        <!-- Vehicle Status & Drivers -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Vehicle Status &amp; Drivers</h3>
            <a class="view-all" routerLink="/listing">View All ▾</a>
          </div>
          <div class="vstatus-list">
            <div class="vstatus-row" *ngFor="let v of vehicleStatusList">
              <div class="vstatus-dot" [class.dot-free]="v.status === 'Free'" [class.dot-road]="v.status === 'In Road'" [class.dot-maint]="v.status === 'Maintenance'"></div>
              <div class="vstatus-info">
                <div class="vstatus-name">{{ v.name }}</div>
                <div class="vstatus-driver" [class.no-driver]="!v.driverName">
                  <span nz-icon nzType="idcard" nzTheme="outline"></span>
                  {{ v.driverName || 'No driver assigned' }}
                </div>
              </div>
              <div class="vstatus-pill" [class.pill-free]="v.status === 'Free'" [class.pill-road]="v.status === 'In Road'" [class.pill-maint]="v.status === 'Maintenance'">{{ v.status }}</div>
            </div>
          </div>
        </div>
      </div>

      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .dash-container { min-height: 100vh; padding: 24px 28px; }

    .dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .welcome-title { font-size: 22px; font-weight: 600; color: #202124; margin: 0; }
    .welcome-sub { font-size: 13px; color: #5f6368; margin: 4px 0 0; }
    .header-actions { display: flex; align-items: center; gap: 8px; }
    .date-pill { display: flex; align-items: center; gap: 6px; border: 1px solid #e0e0e0; padding: 0 12px; height: 34px; font-size: 13px; color: #5f6368; background: #fff; cursor: pointer; }
    .date-pill:hover { border-color: #ccc; }
    .action-btn { height: 34px; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0 14px; border: 1px solid #e0e0e0; background: #fff; color: #5f6368; }
    .action-btn:hover { background: #f1f3f4; border-color: #ccc; }
    .primary-btn { background: #1a73e8; color: #fff; border-color: #1a73e8; }
    .primary-btn:hover { background: #1557b0 !important; border-color: #1557b0; }

    .kpi-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin-bottom: 20px; }
    .kpi-card { background: #fff; padding: 16px 20px; display: flex; align-items: flex-start; gap: 14px; border: 1px solid #e0e0e0; position: relative; }
    .kpi-icon-wrap { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .kpi-body { flex: 1; }
    .kpi-label { font-size: 11px; color: #5f6368; font-weight: 500; margin: 0 0 2px; text-transform: uppercase; }
    .kpi-value { font-size: 24px; font-weight: 600; color: #202124; margin: 0 0 2px; }
    .kpi-link { font-size: 11px; color: #1a73e8; font-weight: 500; cursor: pointer; }
    .kpi-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 500; padding: 2px 8px; display: flex; align-items: center; gap: 2px; background: #e6f4ea; color: #1e8e3e; }

    .card { background: #fff; padding: 20px; border: 1px solid #e0e0e0; }
    .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .card-title { font-size: 14px; font-weight: 600; color: #202124; margin: 0; }
    .card-label { font-size: 11px; color: #5f6368; font-weight: 500; margin: 0 0 4px; }
    .view-all { font-size: 12px; color: #1a73e8; font-weight: 500; cursor: pointer; }

    .badge-up { background: #e6f4ea; color: #1e8e3e; }
    .badge-down { background: #fce8e6; color: #d93025; }
    .badge-up.small, .badge-down.small { font-size: 10px; font-weight: 500; padding: 2px 6px; display: inline-block; margin-top: 4px; }

    .mid-grid { display: grid; grid-template-columns: 220px 1fr; gap: 16px; margin-bottom: 20px; }
    .left-col { display: flex; flex-direction: column; gap: 16px; }

    .traffic-list { display: flex; flex-direction: column; gap: 12px; }
    .traffic-item { display: flex; align-items: center; gap: 10px; }
    .traffic-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .traffic-body { flex: 1; }
    .traffic-top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
    .traffic-label { font-size: 12px; font-weight: 500; color: #202124; }
    .traffic-count { font-size: 12px; font-weight: 600; color: #202124; }
    .traffic-badge { font-size: 10px; font-weight: 500; padding: 1px 5px; }
    .progress-track { height: 4px; background: #f1f3f4; overflow: hidden; }
    .progress-fill { height: 100%; transition: width 0.6s; }

    .chart-main-card { display: flex; flex-direction: column; }
    .legend-row { display: flex; gap: 16px; margin-bottom: 12px; }
    .legend-pill { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; color: #5f6368; cursor: pointer; padding: 4px 10px; border: 1px solid #e0e0e0; }
    .legend-pill:hover { background: #f1f3f4; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
    .combo-chart-svg { width: 100%; height: 200px; overflow: visible; }
    .axis-label { font-size: 8px; fill: #5f6368; font-family: 'Google Sans', Arial, sans-serif; }
    .bar-rect { transition: opacity 0.25s; }

    .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .vehicles-list { display: flex; flex-direction: column; gap: 10px; }
    .vehicle-row { display: flex; align-items: center; gap: 10px; }
    .v-rank { font-size: 12px; font-weight: 600; color: #5f6368; width: 14px; }
    .v-img { width: 44px; height: 32px; object-fit: contain; background: #f1f3f4; }
    .v-info { flex: 1; }
    .v-name { font-size: 12px; font-weight: 600; color: #202124; }
    .v-type { font-size: 10px; color: #5f6368; font-weight: 400; }
    .v-trips { font-size: 12px; font-weight: 600; color: #202124; }
    .v-trips span { font-size: 9px; color: #5f6368; font-weight: 400; }
    .v-status-pill { font-size: 9px; font-weight: 500; padding: 2px 7px; }
    .pill-road { background: #e8f0fe; color: #1a73e8; }
    .pill-free { background: #e6f4ea; color: #1e8e3e; }
    .pill-maint { background: #fce8e6; color: #d93025; }

    .vstatus-list { display: flex; flex-direction: column; gap: 8px; max-height: 340px; overflow-y: auto; }
    .vstatus-row { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f1f3f4; }
    .vstatus-row:last-child { border-bottom: none; }
    .vstatus-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .dot-free { background: #34a853; }
    .dot-road { background: #1a73e8; }
    .dot-maint { background: #ea4335; }
    .vstatus-info { flex: 1; min-width: 0; }
    .vstatus-name { font-size: 12px; font-weight: 600; color: #202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .vstatus-driver { font-size: 10px; color: #5f6368; display: flex; align-items: center; gap: 3px; margin-top: 1px; }
    .vstatus-driver.no-driver { color: #d93025; }
    .vstatus-driver span.anticon { font-size: 10px; }
    .vstatus-pill { font-size: 9px; font-weight: 500; padding: 2px 7px; flex-shrink: 0; }
    .vstatus-pill.pill-free { background: #e6f4ea; color: #1e8e3e; }
    .vstatus-pill.pill-road { background: #e8f0fe; color: #1a73e8; }
    .vstatus-pill.pill-maint { background: #fce8e6; color: #d93025; }

    /* === OPERATOR ACTION CARDS === */
    .operator-dash { padding-bottom: 24px; }
    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }
    .action-card {
      background: white; border: 1px solid #e0e0e0; border-radius: 4px;
      padding: 24px 20px; display: flex; align-items: center; gap: 16px;
      cursor: pointer; transition: all 0.2s ease-in-out;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
    }
    .action-card:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-color: #d2e3fc; transform: translateY(-2px);
    }
    .icon-wrap {
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    }
    .card-label {
      font-size: 15px; font-weight: 500; color: #3c4043;
    }
  `]
})
export class DashboardComponent implements OnInit {
  private carService = inject(CarService);
  authService = inject(AuthService);

  activeLegend = '';

  vehicleStatusList: VehicleStatusItem[] = [];

  kpis = [
    { label: 'Total Fleet Vehicles', value: '24', change: '1.2%', trend: 'up', link: 'View All Vehicles', route: '/listing', icon: 'car', color: '#6366f1', bg: '#eef2ff' },
    { label: 'Active Drivers', value: '15', change: '3.4%', trend: 'up', link: 'View All Drivers', route: '/drivers', icon: 'idcard', color: '#06b6d4', bg: '#ecfeff' },
    { label: 'Pending Requests', value: '8', change: '8.5%', trend: 'down', link: 'View Requests', route: '/repairs', icon: 'calendar', color: '#ef4444', bg: '#fef2f2' }
  ];

  trafficData = [
    { label: 'Cars', count: 17, pct: 65, change: '2.50%', trend: 'up', color: '#6366f1' },
    { label: 'Delivery Vans', count: 7, pct: 35, change: '5.88%', trend: 'down', color: '#06b6d4' }
  ];

  chartLegend = [
    { label: 'Dispatches', key: 'dispatch', color: '#6366f1' },
    { label: 'Parking Occupancy', key: 'occupancy', color: '#f59e0b' },
    { label: 'Driver Availability', key: 'drivers', color: '#06b6d4' }
  ];

  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Bar heights (dispatch count) — scaled 0-160 (maps to SVG y range of 0-160)
  barData = [60, 80, 100, 130, 90, 60, 80, 50, 70, 100, 110, 80];

  // Occupancy spline points (monthly), y is inverted in SVG (0=top, 180=bottom)
  occPoints = [
    {x: 54, y: 110}, {x: 97, y: 80}, {x: 140, y: 60}, {x: 183, y: 45},
    {x: 226, y: 70}, {x: 269, y: 90}, {x: 312, y: 65}, {x: 355, y: 100},
    {x: 398, y: 55}, {x: 441, y: 75}, {x: 484, y: 50}, {x: 527, y: 85}
  ];

  // Driver availability spline points
  drvPoints = [
    {x: 54, y: 140}, {x: 97, y: 120}, {x: 140, y: 100}, {x: 183, y: 115},
    {x: 226, y: 90}, {x: 269, y: 130}, {x: 312, y: 110}, {x: 355, y: 80},
    {x: 398, y: 120}, {x: 441, y: 100}, {x: 484, y: 130}, {x: 527, y: 115}
  ];

  occLinePath = '';
  occPath = '';
  drvLinePath = '';
  drvPath = '';

  topVehicles: TopVehicle[] = [
    { name: 'Ford Transit Connect', type: 'Delivery', image: '/images/cars/deliver/caddy.webp', trips: 34, status: 'In Road' },
    { name: 'Mercedes E Class', type: 'Car', image: '/images/cars/DGcars/jclass.png', trips: 28, status: 'Free' },
    { name: 'VW Caddy', type: 'Delivery', image: '/images/cars/deliver/caddy.webp', trips: 22, status: 'In Road' },
    { name: 'Porsche Taycan', type: 'Car', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif', trips: 19, status: 'Maintenance' },
    { name: 'Audi A4', type: 'Car', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif', trips: 16, status: 'Free' }
  ];

  ngOnInit() {
    this.buildSplinePaths();
    this.vehicleStatusList = this.carService.getCars().map(c => ({
      name: c.name,
      driverName: c.driver?.name || '',
      status: c.status || 'Free'
    }));
  }

  buildSplinePaths() {
    // Build SVG smooth spline path from point array using cubic bezier
    const catmullToPath = (pts: {x: number; y:number}[]): string => {
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i > 0 ? i - 1 : i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
      return d;
    };

    this.occLinePath = catmullToPath(this.occPoints);
    this.drvLinePath = catmullToPath(this.drvPoints);

    // Closed area path for fill
    const last = this.occPoints[this.occPoints.length - 1];
    const first = this.occPoints[0];
    this.occPath = this.occLinePath + ` L ${last.x} 180 L ${first.x} 180 Z`;

    const dlast = this.drvPoints[this.drvPoints.length - 1];
    const dfirst = this.drvPoints[0];
    this.drvPath = this.drvLinePath + ` L ${dlast.x} 180 L ${dfirst.x} 180 Z`;
  }
}
