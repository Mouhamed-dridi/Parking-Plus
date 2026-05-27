import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gps-container">
      <div class="map-area">
        <img src="/images/gps/mapX.png" class="map-img" />
        <div class="map-controls">
          <button><i class="fa-solid fa-plus"></i></button>
          <button><i class="fa-solid fa-minus"></i></button>
          <button><i class="fa-solid fa-expand"></i></button>
        </div>
      </div>
      <div class="info-bar">
        <div class="info-item">
          <span class="info-label">Current Location</span>
          <span class="info-value">Memphis, TN</span>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <span class="info-label">Avg Speed</span>
          <span class="info-value">90 km/h</span>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <span class="info-label">Distance Left</span>
          <span class="info-value">370 km</span>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <span class="info-label">Destination</span>
          <span class="info-value">New York</span>
        </div>
        <div class="divider"></div>
        <div class="info-item">
          <span class="info-label">Est. Arrival</span>
          <span class="info-value">12/9/24 6AM</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gps-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background: #f1f5f9;
      overflow: hidden;
    }
    .map-area {
      flex: 1;
      position: relative;
      overflow: hidden;
      background: #0f172a;
    }
    .map-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .map-controls {
      position: absolute;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .map-controls button {
      width: 40px;
      height: 40px;
      border: none;
      background: white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1e293b;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }
    .map-controls button:hover { background: #eff6ff; color: #2563eb; }
    .info-bar {
      display: flex;
      align-items: center;
      background: white;
      padding: 14px 32px;
      border-top: 1px solid #e2e8f0;
      gap: 0;
    }
    .info-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .info-label {
      font-size: 11px;
      color: #94a3b8;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
    }
    .divider {
      width: 1px;
      height: 32px;
      background: #e2e8f0;
    }
  `]
})
export class GpsComponent {}
