import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface ActivityItem {
  icon: string;
  iconColor: string;
  title: string;
  desc: string;
  time: string;
}

interface ParkingSlot {
  id: string;
  status: 'occupied' | 'available' | 'ai-suggested';
  vehicle?: string;
  color?: string;
}

interface TopVehicle {
  name: string;
  type: string;
  image: string;
  trips: number;
  status: 'In Road' | 'Free' | 'Maintenance';
}

interface Region {
  city: string;
  country: string;
  flag: string;
  trips: number;
  pct: number;
  trend: 'up' | 'down';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  template: `
    <div class="dash-container">

      <!-- ══════════════════ HEADER ══════════════════ -->
      <div class="dash-header">
        <div>
          <h1 class="welcome-title">Welcome back, Administrator <span class="wave">👋</span></h1>
          <p class="welcome-sub">Track your fleet activity, drivers and parking operations here.</p>
        </div>
        <div class="header-actions">
          <div class="date-pill">
            <span nz-icon nzType="calendar" nzTheme="outline"></span>
            <span>2026-05-01 to 2026-05-30</span>
          </div>
          <button class="export-btn">
            <span nz-icon nzType="export" nzTheme="outline"></span> Export
          </button>
        </div>
      </div>

      <!-- ══════════════════ KPI CARDS ROW ══════════════════ -->
      <div class="kpi-row">
        <div class="kpi-card" *ngFor="let kpi of kpis">
          <div class="kpi-left">
            <div class="kpi-icon-wrap" [style.background]="kpi.bg">
              <span nz-icon [nzType]="kpi.icon" nzTheme="outline" [style.color]="kpi.color"></span>
            </div>
          </div>
          <div class="kpi-body">
            <p class="kpi-label">{{ kpi.label }}</p>
            <h2 class="kpi-value">{{ kpi.value }}</h2>
            <a class="kpi-link">{{ kpi.link }}</a>
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

          <!-- Utilization Wave Card -->
          <div class="card wave-card">
            <div class="wave-top">
              <div>
                <p class="card-label">Fleet Utilization Hours</p>
                <h2 class="wave-value">1,350 <span class="wave-unit">hrs</span></h2>
                <span class="badge-up small">▲ 0.25%</span>
              </div>
            </div>
            <!-- SVG Area Wave -->
            <svg viewBox="0 0 300 80" class="wave-svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#818cf8" stop-opacity="0.5"/>
                  <stop offset="100%" stop-color="#818cf8" stop-opacity="0.02"/>
                </linearGradient>
              </defs>
              <path d="M0,60 C20,50 40,20 70,30 C100,40 120,15 150,20 C180,25 200,45 230,35 C260,25 280,40 300,30 L300,80 L0,80 Z" fill="url(#waveGrad)"/>
              <path d="M0,60 C20,50 40,20 70,30 C100,40 120,15 150,20 C180,25 200,45 230,35 C260,25 280,40 300,30" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round"/>
              <!-- Bar overlays -->
              <rect x="10" y="55" width="8" height="25" rx="2" fill="#818cf8" opacity="0.5"/>
              <rect x="28" y="45" width="8" height="35" rx="2" fill="#818cf8" opacity="0.6"/>
              <rect x="46" y="35" width="8" height="45" rx="2" fill="#818cf8" opacity="0.7"/>
              <rect x="64" y="48" width="8" height="32" rx="2" fill="#818cf8" opacity="0.6"/>
              <rect x="82" y="28" width="8" height="52" rx="2" fill="#818cf8" opacity="0.8"/>
              <rect x="100" y="38" width="8" height="42" rx="2" fill="#818cf8" opacity="0.6"/>
              <rect x="118" y="22" width="8" height="58" rx="2" fill="#818cf8" opacity="0.9"/>
              <rect x="136" y="42" width="8" height="38" rx="2" fill="#818cf8" opacity="0.6"/>
              <rect x="154" y="30" width="8" height="50" rx="2" fill="#818cf8" opacity="0.7"/>
              <rect x="172" y="50" width="8" height="30" rx="2" fill="#818cf8" opacity="0.5"/>
              <rect x="190" y="20" width="8" height="60" rx="2" fill="#818cf8" opacity="0.85"/>
              <rect x="208" y="40" width="8" height="40" rx="2" fill="#818cf8" opacity="0.6"/>
            </svg>
          </div>

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
                  <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
                </linearGradient>
                <linearGradient id="drvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
                  <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
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
                <rect *ngFor="let b of barData; let i = index" [attr.x]="44 + i*43" [attr.y]="180 - b" width="20" [attr.height]="b" rx="4" fill="#818cf8" [attr.opacity]="activeLegend === 'dispatch' || activeLegend === '' ? 0.85 : 0.2" class="bar-rect"/>
              </g>

              <!-- Occupancy spline (orange) -->
              <path [attr.d]="occPath" fill="url(#occGrad)"/>
              <path [attr.d]="occLinePath" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" [attr.opacity]="activeLegend === 'occupancy' || activeLegend === '' ? 1 : 0.15"/>
              <!-- Nodes -->
              <circle *ngFor="let p of occPoints" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="white" stroke="#f59e0b" stroke-width="2" [attr.opacity]="activeLegend === 'occupancy' || activeLegend === '' ? 1 : 0.15"/>

              <!-- Driver Avail spline (teal) -->
              <path [attr.d]="drvPath" fill="url(#drvGrad)"/>
              <path [attr.d]="drvLinePath" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" [attr.opacity]="activeLegend === 'drivers' || activeLegend === '' ? 1 : 0.15"/>
              <circle *ngFor="let p of drvPoints" [attr.cx]="p.x" [attr.cy]="p.y" r="4" fill="white" stroke="#10b981" stroke-width="2" [attr.opacity]="activeLegend === 'drivers' || activeLegend === '' ? 1 : 0.15"/>

              <!-- X-axis labels -->
              <text *ngFor="let m of months; let i = index" [attr.x]="52 + i*43" y="198" class="axis-label" text-anchor="middle">{{ m }}</text>
            </svg>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="right-col">

          <!-- Radial Gauge -->
          <div class="card gauge-card">
            <div class="card-header-row">
              <h3 class="card-title">Parking Occupancy</h3>
              <a class="view-all">View All ▾</a>
            </div>
            <div class="gauge-wrap">
              <svg viewBox="0 0 120 120" class="gauge-svg">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f1f5f9" stroke-width="10"/>
                <!-- Dotted progress ring -->
                <circle cx="60" cy="60" r="50" fill="none" stroke="#3b82f6" stroke-width="10"
                  stroke-dasharray="264" stroke-dashoffset="45"
                  stroke-linecap="round" transform="rotate(-90 60 60)"/>
                <text x="60" y="55" text-anchor="middle" class="gauge-pct">83%</text>
                <text x="60" y="70" text-anchor="middle" class="gauge-sub">Occupancy</text>
              </svg>
            </div>
            <div class="gauge-stats">
              <div class="g-stat" *ngFor="let s of gaugeStats">
                <span class="g-val" [style.color]="s.color">{{ s.val }} <span nz-icon [nzType]="s.up ? 'arrow-up' : 'arrow-down'" style="font-size:10px;"></span></span>
                <span class="g-lbl">{{ s.label }}</span>
              </div>
            </div>
          </div>

          <!-- Status Growth Cards -->
          <div class="card status-card green-card">
            <span nz-icon nzType="check-circle" nzTheme="fill" class="status-icon green"></span>
            <div class="status-body">
              <div class="status-val">+12 Trips</div>
              <div class="status-label">Completed This Month</div>
            </div>
            <div class="status-badge badge-up">▲ 0.98%</div>
          </div>

          <div class="card status-card orange-card">
            <span nz-icon nzType="warning" nzTheme="fill" class="status-icon orange"></span>
            <div class="status-body">
              <div class="status-val">-2 Vehicles</div>
              <div class="status-label">In Maintenance</div>
            </div>
            <div class="status-badge badge-down">▼ 4.27%</div>
          </div>
        </div>
      </div>

      <!-- ══════════════════ BOTTOM GRID ══════════════════ -->
      <div class="bottom-grid">

        <!-- Parking Slots Mini Map -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Parking Slots</h3>
            <a class="view-all" routerLink="/parking-state">View All ▾</a>
          </div>
          <div class="slots-grid">
            <div class="slot-item" *ngFor="let s of parkingSlots" [class.slot-occupied]="s.status === 'occupied'" [class.slot-available]="s.status === 'available'" [class.slot-ai]="s.status === 'ai-suggested'" [title]="s.vehicle || 'Available'">
              <div class="slot-id">{{ s.id }}</div>
              <div class="slot-car-icon">
                <svg viewBox="0 0 40 20" width="36" height="18" *ngIf="s.status === 'occupied'">
                  <rect x="2" y="5" width="36" height="12" rx="4" [attr.fill]="s.color || '#94a3b8'"/>
                  <rect x="8" y="5" width="7" height="11" fill="#1e293b" rx="2" opacity="0.8"/>
                  <rect x="25" y="5" width="6" height="11" fill="#1e293b" rx="2" opacity="0.8"/>
                </svg>
                <span class="slot-avail-text" *ngIf="s.status === 'available'">Free</span>
                <div class="slot-ai-badge" *ngIf="s.status === 'ai-suggested'">
                  <span nz-icon nzType="star" nzTheme="fill" style="color:#a855f7;font-size:9px;"></span> AI
                </div>
              </div>
              <div class="slot-status-dot" [class.dot-occupied]="s.status === 'occupied'" [class.dot-available]="s.status === 'available'" [class.dot-ai]="s.status === 'ai-suggested'"></div>
            </div>
          </div>
        </div>

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

        <!-- Recent Activity -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Recent Activity</h3>
            <a class="view-all">View All ▾</a>
          </div>
          <div class="activity-list">
            <div class="activity-item" *ngFor="let a of activities">
              <div class="a-icon-wrap" [style.background]="a.iconColor + '20'">
                <span nz-icon [nzType]="a.icon" nzTheme="outline" [style.color]="a.iconColor"></span>
              </div>
              <div class="a-body">
                <div class="a-title">{{ a.title }}</div>
                <div class="a-desc">{{ a.desc }}</div>
              </div>
              <div class="a-time">{{ a.time }}</div>
            </div>
          </div>
        </div>

        <!-- Active Regions -->
        <div class="card">
          <div class="card-header-row">
            <h3 class="card-title">Active Regions</h3>
            <a class="view-all">Export ▾</a>
          </div>
          <div class="regions-list">
            <div class="region-row" *ngFor="let r of regions">
              <div class="r-flag">{{ r.flag }}</div>
              <div class="r-info">
                <div class="r-city">{{ r.city }}</div>
                <div class="r-country">{{ r.country }}</div>
              </div>
              <div class="r-right">
                <div class="r-trips">{{ r.trips.toLocaleString() }} trips</div>
                <div class="r-bar-track">
                  <div class="r-bar-fill" [style.width]="r.pct + '%'" [class.fill-up]="r.trend === 'up'" [class.fill-down]="r.trend === 'down'"></div>
                </div>
                <div class="r-badge" [class.badge-up]="r.trend === 'up'" [class.badge-down]="r.trend === 'down'">{{ r.trend === 'up' ? '▲' : '▼' }} ({{ r.pct }}%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; }

    .dash-container {
      background: #f8fafc;
      min-height: 100vh;
      padding: 28px 32px;
      font-family: 'Inter', sans-serif;
    }

    /* ── HEADER ── */
    .dash-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .welcome-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .wave { font-size: 20px; }
    .welcome-sub { font-size: 13px; color: #94a3b8; margin: 4px 0 0; }
    .header-actions { display: flex; align-items: center; gap: 12px; }
    .date-pill {
      display: flex; align-items: center; gap: 8px;
      border: 1px solid #e2e8f0; border-radius: 8px;
      padding: 8px 14px; font-size: 13px; font-weight: 600; color: #475569;
      background: white; cursor: pointer;
    }
    .export-btn {
      background: #818cf8; color: white; border: none;
      border-radius: 8px; padding: 8px 18px; font-weight: 700; font-size: 13px;
      cursor: pointer; display: flex; align-items: center; gap: 6px;
      box-shadow: 0 4px 12px rgba(129,140,248,0.3); transition: all 0.2s;
    }
    .export-btn:hover { background: #6366f1; }

    /* ── KPI ROW ── */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    .kpi-card {
      background: white; border-radius: 14px; padding: 18px 20px;
      display: flex; align-items: flex-start; gap: 14px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      transition: all 0.2s;
      position: relative;
    }
    .kpi-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.07); }
    .kpi-icon-wrap {
      width: 42px; height: 42px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .kpi-body { flex: 1; }
    .kpi-label { font-size: 12px; color: #94a3b8; font-weight: 600; margin: 0 0 4px; }
    .kpi-value { font-size: 24px; font-weight: 800; color: #0f172a; margin: 0 0 4px; }
    .kpi-link { font-size: 11px; color: #818cf8; font-weight: 600; cursor: pointer; text-decoration: none; }
    .kpi-link:hover { text-decoration: underline; }
    .kpi-badge {
      position: absolute; top: 16px; right: 16px;
      font-size: 10px; font-weight: 700; padding: 3px 8px;
      border-radius: 20px; display: flex; align-items: center; gap: 2px;
    }

    /* ── CARDS ── */
    .card {
      background: white; border-radius: 14px; padding: 20px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
    }
    .card-header-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 16px;
    }
    .card-title { font-size: 15px; font-weight: 700; color: #0f172a; margin: 0; }
    .card-label { font-size: 12px; color: #94a3b8; font-weight: 600; margin: 0 0 4px; }
    .view-all { font-size: 12px; color: #818cf8; font-weight: 600; cursor: pointer; text-decoration: none; }

    /* Badges */
    .badge-up { background: #dcfce7; color: #16a34a; }
    .badge-down { background: #fee2e2; color: #dc2626; }
    .badge-up.small, .badge-down.small {
      font-size: 10px; font-weight: 700; padding: 2px 6px;
      border-radius: 6px; display: inline-block; margin-top: 4px;
    }
    .badge-up.small { background: #dcfce7; color: #16a34a; }

    /* ── MID GRID ── */
    .mid-grid {
      display: grid;
      grid-template-columns: 220px 1fr 200px;
      gap: 16px;
      margin-bottom: 20px;
    }
    .left-col, .right-col { display: flex; flex-direction: column; gap: 16px; }

    /* Wave Card */
    .wave-card { padding-bottom: 0; overflow: hidden; }
    .wave-top { padding-bottom: 8px; }
    .wave-value { font-size: 26px; font-weight: 800; color: #0f172a; margin: 2px 0; }
    .wave-unit { font-size: 14px; color: #94a3b8; font-weight: 500; }
    .wave-svg { width: 100%; height: 90px; display: block; }

    /* Traffic Card */
    .traffic-list { display: flex; flex-direction: column; gap: 14px; }
    .traffic-item { display: flex; align-items: center; gap: 10px; }
    .traffic-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
    .traffic-body { flex: 1; }
    .traffic-top-row {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 5px;
    }
    .traffic-label { font-size: 12px; font-weight: 600; color: #334155; }
    .traffic-count { font-size: 12px; font-weight: 700; color: #0f172a; }
    .traffic-badge { font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 4px; }
    .progress-track {
      height: 5px; background: #f1f5f9; border-radius: 3px; overflow: hidden;
    }
    .progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease; }

    /* ── MAIN CHART ── */
    .chart-main-card { display: flex; flex-direction: column; }
    .legend-row { display: flex; gap: 16px; margin-bottom: 12px; }
    .legend-pill {
      display: flex; align-items: center; gap: 6px;
      font-size: 12px; font-weight: 600; color: #475569;
      cursor: pointer; padding: 4px 10px; border-radius: 20px;
      border: 1px solid #f1f5f9; transition: all 0.2s;
    }
    .legend-pill:hover { background: #f8fafc; }
    .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
    .combo-chart-svg { width: 100%; height: 200px; overflow: visible; }
    .axis-label { font-size: 8px; fill: #94a3b8; font-family: 'Inter', sans-serif; }
    .bar-rect { transition: opacity 0.25s; }

    /* ── GAUGE ── */
    .gauge-card { text-align: center; }
    .gauge-wrap { display: flex; justify-content: center; margin: 8px 0; }
    .gauge-svg { width: 120px; height: 120px; }
    .gauge-pct { font-size: 20px; font-weight: 800; fill: #0f172a; font-family: 'Inter', sans-serif; }
    .gauge-sub { font-size: 8px; fill: #94a3b8; font-family: 'Inter', sans-serif; }
    .gauge-stats { display: flex; justify-content: space-around; margin-top: 10px; }
    .g-stat { display: flex; flex-direction: column; align-items: center; }
    .g-val { font-size: 13px; font-weight: 700; }
    .g-lbl { font-size: 9px; color: #94a3b8; font-weight: 600; text-transform: uppercase; margin-top: 2px; }

    /* Status Cards */
    .status-card { display: flex; align-items: center; gap: 12px; padding: 16px; }
    .green-card { border-left: 3px solid #10b981; }
    .orange-card { border-left: 3px solid #f59e0b; }
    .status-icon { font-size: 24px; }
    .status-icon.green { color: #10b981; }
    .status-icon.orange { color: #f59e0b; }
    .status-body { flex: 1; }
    .status-val { font-size: 16px; font-weight: 800; color: #0f172a; }
    .status-label { font-size: 11px; color: #94a3b8; font-weight: 500; }
    .status-badge { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 20px; }

    /* ── BOTTOM GRID ── */
    .bottom-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 16px;
    }

    /* Parking Slots */
    .slots-grid {
      display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;
    }
    .slot-item {
      border-radius: 8px; padding: 6px 4px; display: flex; flex-direction: column;
      align-items: center; gap: 4px; cursor: pointer; border: 1.5px solid transparent;
      transition: all 0.2s;
    }
    .slot-item:hover { transform: scale(1.04); }
    .slot-occupied { background: #f8fafc; border-color: #e2e8f0; }
    .slot-available { background: #f0fdf4; border-color: #bbf7d0; }
    .slot-ai { background: #faf5ff; border-color: #d8b4fe; }
    .slot-id { font-size: 9px; font-weight: 700; color: #64748b; }
    .slot-car-icon { height: 20px; display: flex; align-items: center; justify-content: center; }
    .slot-avail-text { font-size: 8px; color: #16a34a; font-weight: 700; }
    .slot-ai-badge { font-size: 8px; color: #9333ea; font-weight: 700; display: flex; align-items: center; gap: 2px; }
    .slot-status-dot { width: 5px; height: 5px; border-radius: 50%; }
    .dot-occupied { background: #94a3b8; }
    .dot-available { background: #22c55e; }
    .dot-ai { background: #a855f7; }

    /* Top Vehicles */
    .vehicles-list { display: flex; flex-direction: column; gap: 10px; }
    .vehicle-row { display: flex; align-items: center; gap: 10px; }
    .v-rank { font-size: 12px; font-weight: 700; color: #94a3b8; width: 14px; }
    .v-img { width: 44px; height: 32px; object-fit: contain; border-radius: 6px; background: #f8fafc; }
    .v-info { flex: 1; }
    .v-name { font-size: 12px; font-weight: 700; color: #1e293b; }
    .v-type { font-size: 10px; color: #94a3b8; font-weight: 500; }
    .v-trips { font-size: 12px; font-weight: 700; color: #0f172a; }
    .v-trips span { font-size: 9px; color: #94a3b8; font-weight: 500; }
    .v-status-pill { font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 10px; }
    .pill-road { background: #dbeafe; color: #1d4ed8; }
    .pill-free { background: #dcfce7; color: #16a34a; }
    .pill-maint { background: #fee2e2; color: #dc2626; }

    /* Activity Feed */
    .activity-list { display: flex; flex-direction: column; gap: 12px; }
    .activity-item { display: flex; align-items: center; gap: 10px; }
    .a-icon-wrap { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
    .a-body { flex: 1; }
    .a-title { font-size: 12px; font-weight: 700; color: #1e293b; }
    .a-desc { font-size: 10px; color: #94a3b8; font-weight: 500; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 160px; }
    .a-time { font-size: 10px; color: #94a3b8; font-weight: 600; flex-shrink: 0; }

    /* Regions */
    .regions-list { display: flex; flex-direction: column; gap: 14px; }
    .region-row { display: flex; align-items: center; gap: 10px; }
    .r-flag { font-size: 22px; flex-shrink: 0; }
    .r-info { flex: 1; }
    .r-city { font-size: 12px; font-weight: 700; color: #1e293b; }
    .r-country { font-size: 10px; color: #94a3b8; font-weight: 500; }
    .r-right { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; }
    .r-trips { font-size: 12px; font-weight: 700; color: #0f172a; }
    .r-bar-track { width: 80px; height: 4px; background: #f1f5f9; border-radius: 2px; overflow: hidden; }
    .r-bar-fill { height: 100%; border-radius: 2px; }
    .fill-up { background: #10b981; }
    .fill-down { background: #ef4444; }
    .r-badge { font-size: 10px; font-weight: 700; }
  `]
})
export class DashboardComponent implements OnInit {
  activeLegend = '';

  kpis = [
    { label: 'Total Fleet Vehicles', value: '24', change: '1.2%', trend: 'up', link: 'View All Vehicles', icon: 'car', color: '#818cf8', bg: '#ede9fe' },
    { label: 'Active Drivers', value: '15', change: '3.4%', trend: 'up', link: 'View All Drivers', icon: 'idcard', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Pending Requests', value: '8', change: '8.5%', trend: 'down', link: 'View Requests', icon: 'calendar', color: '#ef4444', bg: '#fee2e2' },
    { label: 'Parking Slots Occupied', value: '6 / 10', change: '2.1%', trend: 'up', link: 'View Parking State', icon: 'inbox', color: '#10b981', bg: '#d1fae5' }
  ];

  trafficData = [
    { label: 'Cars', count: 17, pct: 65, change: '2.50%', trend: 'up', color: '#818cf8' },
    { label: 'Delivery Vans', count: 7, pct: 35, change: '5.88%', trend: 'down', color: '#10b981' }
  ];

  chartLegend = [
    { label: 'Dispatches', key: 'dispatch', color: '#818cf8' },
    { label: 'Parking Occupancy', key: 'occupancy', color: '#f59e0b' },
    { label: 'Driver Availability', key: 'drivers', color: '#10b981' }
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

  gaugeStats = [
    { val: '8/10', label: 'Today', color: '#10b981', up: true },
    { val: '7/10', label: 'Target', color: '#ef4444', up: false },
    { val: '6/10', label: 'This Year', color: '#10b981', up: true }
  ];

  parkingSlots: ParkingSlot[] = [
    { id: 'P1', status: 'occupied', vehicle: 'Blue Audi', color: '#94a3b8' },
    { id: 'P2', status: 'ai-suggested' },
    { id: 'P3', status: 'occupied', vehicle: 'Red Audi', color: '#ef4444' },
    { id: 'P4', status: 'occupied', vehicle: 'Bentley', color: '#f59e0b' },
    { id: 'P5', status: 'occupied', vehicle: 'Mercedes', color: '#10b981' },
    { id: 'P6', status: 'available' },
    { id: 'P7', status: 'occupied', vehicle: 'Porsche', color: '#6366f1' },
    { id: 'P8', status: 'available' },
    { id: 'P9', status: 'available' },
    { id: 'P10', status: 'occupied', vehicle: 'Toyota', color: '#3b82f6' }
  ];

  topVehicles: TopVehicle[] = [
    { name: 'Ford Transit Connect', type: 'Delivery', image: '/images/cars/deliver/caddy.webp', trips: 34, status: 'In Road' },
    { name: 'Mercedes E Class', type: 'Car', image: '/images/cars/DGcars/jclass.png', trips: 28, status: 'Free' },
    { name: 'VW Caddy', type: 'Delivery', image: '/images/cars/deliver/caddy.webp', trips: 22, status: 'In Road' },
    { name: 'Porsche Taycan', type: 'Car', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif', trips: 19, status: 'Maintenance' },
    { name: 'Audi A4', type: 'Car', image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif', trips: 16, status: 'Free' }
  ];

  activities: ActivityItem[] = [
    { icon: 'car', iconColor: '#818cf8', title: 'New Booking Requested', desc: 'Ahmed Benali requested a Ford Transit Connect', time: '12:24 PM' },
    { icon: 'environment', iconColor: '#10b981', title: 'Vehicle Dispatched', desc: 'Mercedes E Class departed from Dallas Hub', time: '11:58 AM' },
    { icon: 'warning', iconColor: '#f59e0b', title: 'Maintenance Alert', desc: 'Porsche Taycan scheduled for service', time: '10:45 AM' },
    { icon: 'check-circle', iconColor: '#10b981', title: 'Trip Completed', desc: 'Ford Transit Connect returned from Memphis', time: '09:30 AM' },
    { icon: 'idcard', iconColor: '#3b82f6', title: 'New Driver Registered', desc: 'Yassine Dridi added to the system', time: '08:12 AM' }
  ];

  regions: Region[] = [
    { city: 'Tunis', country: 'Tunisia', flag: '🇹🇳', trips: 32879, pct: 65, trend: 'down' },
    { city: 'Dallas', country: 'United States', flag: '🇺🇸', trips: 16343, pct: 42, trend: 'up' },
    { city: 'Memphis', country: 'United States', flag: '🇺🇸', trips: 18564, pct: 58, trend: 'up' },
    { city: 'New York', country: 'United States', flag: '🇺🇸', trips: 14123, pct: 35, trend: 'down' }
  ];

  ngOnInit() {
    this.buildSplinePaths();
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
