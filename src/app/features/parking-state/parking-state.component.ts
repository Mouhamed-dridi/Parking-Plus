import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface ParkingSpot {
  id: string;
  status: 'occupied' | 'available' | 'ai-suggested';
  carColor?: string;
}

@Component({
  selector: 'app-parking-state',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  template: `
    <div class="page-container">
      <div class="map-wrapper">
        <div class="parking-lot">
          
          <!-- LEFT COLUMN -->
          <div class="column left-col">
            <div *ngFor="let spot of leftSpots" class="spot-container">
              <div class="spot-label left">{{ spot.id }}</div>
              
              <div class="spot" [ngClass]="getSpotClass(spot)">
                <ng-container *ngIf="spot.status === 'occupied'">
                  <div class="car" [style.color]="spot.carColor">
                    <svg viewBox="0 0 200 100" width="100%" height="100%">
                      <rect x="10" y="20" width="180" height="60" rx="15" fill="currentColor" />
                      <rect x="40" y="22" width="25" height="56" fill="#1e293b" rx="5" /> <!-- Windshield -->
                      <rect x="140" y="22" width="20" height="56" fill="#1e293b" rx="5" /> <!-- Rear Window -->
                      <rect x="70" y="22" width="65" height="5" fill="#1e293b" /> <!-- Top Window -->
                      <rect x="70" y="73" width="65" height="5" fill="#1e293b" /> <!-- Bottom Window -->
                      <path d="M 40 22 L 70 22 M 40 78 L 70 78 M 160 22 L 135 22 M 160 78 L 135 78" stroke="#1e293b" stroke-width="3" fill="none" />
                    </svg>
                  </div>
                </ng-container>

                <ng-container *ngIf="spot.status === 'available'">
                  <span class="available-text">Available</span>
                </ng-container>

                <ng-container *ngIf="spot.status === 'ai-suggested'">
                  <div class="ai-suggested-content">
                    <span class="available-text">Available</span>
                    <div class="ai-badge">
                      <span nz-icon nzType="star" nzTheme="fill"></span> AI Suggested
                    </div>
                  </div>
                </ng-container>
              </div>
            </div>
          </div>

          <!-- CENTER LANE -->
          <div class="center-lane">
            <div class="lane-arrows">
              <span nz-icon nzType="arrow-up" nzTheme="outline" class="lane-icon text-muted"></span>
              <span nz-icon nzType="arrow-down" nzTheme="outline" class="lane-icon text-muted"></span>
              <span nz-icon nzType="arrow-up" nzTheme="outline" class="lane-icon text-muted"></span>
              <span nz-icon nzType="arrow-down" nzTheme="outline" class="lane-icon text-muted"></span>
              <span nz-icon nzType="arrow-up" nzTheme="outline" class="lane-icon text-muted"></span>
              <span nz-icon nzType="arrow-down" nzTheme="outline" class="lane-icon text-muted"></span>
            </div>
            <div class="lane-dashed"></div>
          </div>

          <!-- RIGHT COLUMN -->
          <div class="column right-col">
            <div *ngFor="let spot of rightSpots" class="spot-container">
              <div class="spot-label right">{{ spot.id }}</div>
              
              <div class="spot" [ngClass]="getSpotClass(spot)">
                <ng-container *ngIf="spot.status === 'occupied'">
                  <div class="car" [style.color]="spot.carColor">
                    <!-- Reversed Car SVG for the right column -->
                    <svg viewBox="0 0 200 100" width="100%" height="100%">
                      <rect x="10" y="20" width="180" height="60" rx="15" fill="currentColor" />
                      <rect x="135" y="22" width="25" height="56" fill="#1e293b" rx="5" /> <!-- Windshield -->
                      <rect x="40" y="22" width="20" height="56" fill="#1e293b" rx="5" /> <!-- Rear Window -->
                      <rect x="65" y="22" width="65" height="5" fill="#1e293b" /> <!-- Top Window -->
                      <rect x="65" y="73" width="65" height="5" fill="#1e293b" /> <!-- Bottom Window -->
                    </svg>
                  </div>
                </ng-container>

                <ng-container *ngIf="spot.status === 'available'">
                  <span class="available-text">Available</span>
                </ng-container>
              </div>
            </div>
          </div>
        </div>

        <!-- FLOOR NAVIGATION -->
        <div class="floor-nav">
          <div class="floor-pill">Floor 1</div>
          <div class="floor-pill active">Floor 2</div>
          <div class="floor-pill">Floor 3</div>
          <div class="floor-pill">Floor 4</div>
          <div class="floor-pill">Floor 5</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      background: white;
      min-height: 100%;
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .map-wrapper {
      max-width: 600px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .parking-lot {
      display: flex;
      width: 100%;
      border-top: 1px dashed #e2e8f0;
      border-bottom: 1px dashed #e2e8f0;
      margin-bottom: 32px;
    }

    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .left-col {
      border-right: 1px dashed #e2e8f0;
    }
    
    .right-col {
      border-left: 1px dashed #e2e8f0;
    }

    .spot-container {
      height: 120px;
      position: relative;
      border-bottom: 1px dashed #e2e8f0;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spot-container:last-child {
      border-bottom: none;
    }

    .spot-label {
      position: absolute;
      top: 8px;
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
    }
    .spot-label.left {
      left: 16px;
    }
    .spot-label.right {
      right: 16px;
    }

    .spot {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .spot-occupied {
      background: transparent;
    }

    .spot-available {
      background: transparent;
    }

    .spot-ai-suggested {
      background: linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%);
      box-shadow: 0 4px 12px rgba(168, 85, 247, 0.2);
    }

    .available-text {
      font-weight: 700;
      font-size: 15px;
      color: #1e293b;
    }

    .ai-suggested-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .ai-badge {
      background: white;
      color: #9333ea;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .car {
      width: 140px;
      height: 70px;
    }

    /* CENTER LANE */
    .center-lane {
      width: 60px;
      position: relative;
      display: flex;
      justify-content: center;
    }

    .lane-dashed {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-left: 2px dashed #cbd5e1;
    }

    .lane-arrows {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      z-index: 1;
    }

    .lane-icon {
      color: #cbd5e1;
      font-size: 16px;
      background: white;
      padding: 4px 0;
    }

    /* FOOTER NAVIGATION */
    .floor-nav {
      display: flex;
      gap: 12px;
    }

    .floor-pill {
      padding: 8px 16px;
      background: #f1f5f9;
      color: #475569;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .floor-pill:hover {
      background: #e2e8f0;
    }

    .floor-pill.active {
      background: #0f172a;
      color: white;
    }
  `]
})
export class ParkingStateComponent {
  
  leftSpots: ParkingSpot[] = [
    { id: 'P1', status: 'occupied', carColor: '#94a3b8' },
    { id: 'P2', status: 'ai-suggested' },
    { id: 'P3', status: 'occupied', carColor: '#ef4444' }, // Red
    { id: 'P4', status: 'occupied', carColor: '#f59e0b' }, // Yellow
    { id: 'P5', status: 'occupied', carColor: '#10b981' }  // Green
  ];

  rightSpots: ParkingSpot[] = [
    { id: 'P6', status: 'available' },
    { id: 'P7', status: 'occupied', carColor: '#94a3b8' },
    { id: 'P8', status: 'available' },
    { id: 'P9', status: 'available' },
    { id: 'P10', status: 'occupied', carColor: '#10b981' } // Green
  ];

  getSpotClass(spot: ParkingSpot): string {
    return 'spot-' + spot.status;
  }
}
