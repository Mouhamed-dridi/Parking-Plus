import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule } from '@angular/forms';

interface TrackingVehicle {
  id: string;
  model: string;
  status: 'In Transit' | 'Stopped' | 'Awaiting Loading';
  image: string;
  active?: boolean;
}

interface ChatMessage {
  author: string;
  text: string;
  time: string;
  isMe: boolean;
  avatar?: string;
}

@Component({
  selector: 'app-gps',
  standalone: true,
  imports: [
    CommonModule, NzGridModule, NzButtonModule, NzIconModule, 
    NzInputModule, NzTabsModule, NzAvatarModule, FormsModule
  ],
  template: `
    <div class="gps-container">
      
      <!-- SUB-SIDEBAR: TRACKING LIST -->
      <div class="tracking-sidebar">
        <div class="sidebar-header">
          <h3>Tracking</h3>
          <button class="add-circle-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        
        <div class="search-box">
          <nz-input-group [nzPrefix]="prefixIconSearch">
            <input type="text" nz-input placeholder="Search" />
          </nz-input-group>
          <ng-template #prefixIconSearch>
            <i class="fa-solid fa-magnifying-glass" style="color: #94a3b8;"></i>
          </ng-template>
        </div>

        <div class="vehicle-list">
          <div *ngFor="let v of vehicles" 
               class="vehicle-item" 
               [class.active]="v.active"
               (click)="selectVehicle(v)">
            <img [src]="v.image" class="vehicle-thumb" />
            <div class="vehicle-info">
              <div class="vehicle-id">{{ v.id }}</div>
              <div class="vehicle-model">{{ v.model }}</div>
              <div class="status-indicator" [ngClass]="v.status.toLowerCase().replace(' ', '-')">
                {{ v.status }}
              </div>
            </div>
            <div *ngIf="v.active" class="active-indicator"></div>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT AREA -->
      <div class="main-tracking-content">
        
        <div class="top-row">
          <!-- MAP OVERVIEW -->
          <div class="map-card">
            <div class="card-header">
              <h3>Map overview</h3>
              <button class="collapse-btn"><i class="fa-solid fa-chevron-up"></i></button>
            </div>
            <div class="map-placeholder">
              <img src="/images/gps/map.avif" class="map-img" />
              <div class="map-overlay">
                <div class="route-line"></div>
                <div class="marker start" style="top: 30%; left: 80%;"></div>
                <div class="marker current" style="top: 60%; left: 40%;">
                  <div class="marker-pulse"></div>
                </div>
                <div class="map-controls">
                  <button><i class="fa-solid fa-plus"></i></button>
                  <button><i class="fa-solid fa-minus"></i></button>
                  <button><i class="fa-solid fa-expand"></i></button>
                </div>
              </div>
            </div>
          </div>

          <!-- TRUCK CAPACITY -->
          <div class="capacity-card">
            <div class="card-header">
              <h3>Current truck capacity</h3>
              <a href="#" class="view-details">View details</a>
            </div>
            <div class="truck-viz">
              <div class="truck-container">
                <img src="/images/gps/truck.webp" class="truck-base" />
              </div>
            </div>
            <div class="capacity-stats">
              <div class="stat-row">
                <span class="stat-label">Current Load Weight</span>
                <span class="stat-value">15,000 lbs</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Max Load</span>
                <span class="stat-value">20,000 lbs</span>
              </div>
              <div class="stat-row">
                <span class="stat-label">Load Category</span>
                <span class="stat-value">Electronics</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom-row">
          <!-- DETAILS TABS -->
          <div class="details-section">
            <nz-tabset>
              <nz-tab nzTitle="Tracking details">
                <div class="tracking-timeline">
                  <div class="timeline-cities">
                    <div class="city active">
                      <div class="city-dot"></div>
                      <span class="city-name">Dallas</span>
                      <span class="city-time">12/4/24 06:48 AM</span>
                    </div>
                    <div class="city active current">
                      <div class="city-dot"></div>
                      <span class="city-name">Memphis</span>
                      <span class="city-time">12/4/24 11:58 AM</span>
                    </div>
                    <div class="city">
                      <div class="city-dot"></div>
                      <span class="city-name">Nachville</span>
                    </div>
                    <div class="city">
                      <div class="city-dot"></div>
                      <span class="city-name">Knoxville</span>
                    </div>
                    <div class="city">
                      <div class="city-dot"></div>
                      <span class="city-name">Harrisburg</span>
                    </div>
                    <div class="city destination">
                      <div class="city-dot"></div>
                      <span class="city-name">New York</span>
                      <span class="city-time">Est. 12/9/24 till 6AM</span>
                    </div>
                    <div class="progress-line">
                      <div class="progress-fill" style="width: 33%;"></div>
                    </div>
                  </div>

                  <div class="tracking-stats-grid">
                    <div class="track-stat">
                      <span class="stat-icon loc"><i class="fa-solid fa-location-dot"></i></span>
                      <div class="stat-content">
                        <span class="stat-label">Memphis</span>
                        <span class="stat-sub">Current Location</span>
                      </div>
                    </div>
                    <div class="track-stat">
                      <span class="stat-icon speed"><i class="fa-solid fa-gauge-high"></i></span>
                      <div class="stat-content">
                        <span class="stat-label">90 km/h</span>
                        <span class="stat-sub">Avg Speed</span>
                      </div>
                    </div>
                    <div class="track-stat">
                      <span class="stat-icon dist"><i class="fa-solid fa-route"></i></span>
                      <div class="stat-content">
                        <span class="stat-label">370 km</span>
                        <span class="stat-sub">Kilometres Left</span>
                      </div>
                    </div>
                    <div class="track-stat">
                      <span class="stat-icon time"><i class="fa-solid fa-clock"></i></span>
                      <div class="stat-content">
                        <span class="stat-label">3 hours ago</span>
                        <span class="stat-sub">Last Stop</span>
                      </div>
                    </div>
                  </div>
                </div>
              </nz-tab>
              <nz-tab nzTitle="Driver info"></nz-tab>
              <nz-tab nzTitle="Vehicle"></nz-tab>
              <nz-tab nzTitle="Customer info"></nz-tab>
              <nz-tab nzTitle="Documents"></nz-tab>
            </nz-tabset>

            <!-- PHOTO REPORTS -->
            <div class="photo-reports-section">
              <h3>Cargo photo reports</h3>
              <div class="photo-grid">
                <div class="photo-card">
                  <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=300" />
                  <div class="photo-info">
                    <span class="point-name">Point #1</span>
                    <span class="point-loc">2121 Flora St, Dallas, TX 75201</span>
                  </div>
                </div>
                <div class="photo-card">
                  <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=300" />
                  <div class="photo-info">
                    <span class="point-name">Point #2</span>
                    <span class="point-loc">3948 Park Ave, Memphis, TN 38111</span>
                  </div>
                </div>
                <div class="photo-card">
                  <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=300" />
                  <div class="photo-info">
                    <span class="point-name">Point #3</span>
                    <span class="point-loc">123 S Main St, Memphis, TN 38103</span>
                  </div>
                </div>
                <button class="request-photo-btn">
                  <i class="fa-solid fa-camera"></i>
                  <span>Request Photo</span>
                </button>
              </div>
            </div>
          </div>

          <!-- CHAT SECTION -->
          <div class="chat-card">
            <div class="card-header">
              <h3>Chat with driver</h3>
              <div class="chat-header-actions">
                <img src="/images/drivers/Yassine.jpg" class="chat-avatar" />
                <button class="icon-btn"><i class="fa-solid fa-phone"></i></button>
                <button class="icon-btn"><i class="fa-solid fa-up-right-and-down-left-from-center"></i></button>
              </div>
            </div>
            
            <div class="chat-messages">
              <div *ngFor="let m of messages" class="msg-group" [class.me]="m.isMe">
                <div class="msg-bubble" [class.me]="m.isMe">
                  {{ m.text }}
                </div>
                <div class="msg-time">{{ m.time }}</div>
              </div>
            </div>

            <div class="chat-input-area">
              <nz-input-group [nzSuffix]="suffixTemplate">
                <input type="text" nz-input placeholder="Write your message" />
              </nz-input-group>
              <ng-template #suffixTemplate>
                <i class="fa-solid fa-paper-plane send-icon"></i>
              </ng-template>
            </div>
          </div>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .gps-container {
      display: flex;
      height: 100vh;
      background: #f1f5f9;
      overflow: hidden;
    }

    /* SIDEBAR */
    .tracking-sidebar {
      width: 280px;
      background: white;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .sidebar-header {
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sidebar-header h3 { margin: 0; font-size: 18px; font-weight: 700; color: #1e293b; }
    .add-circle-btn {
      width: 28px; height: 28px; border-radius: 50%; border: none;
      background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center;
      cursor: pointer;
    }
    .search-box { padding: 0 24px 20px; }
    .search-box input { border-radius: 10px; background: #f8fafc; border: 1px solid #f1f5f9; }

    .vehicle-list { flex: 1; overflow-y: auto; }
    .vehicle-item {
      padding: 16px 24px; display: flex; gap: 12px; cursor: pointer; position: relative;
      border-bottom: 1px solid #f8fafc; transition: background 0.2s;
    }
    .vehicle-item:hover { background: #f8fafc; }
    .vehicle-item.active { background: #eff6ff; }
    .active-indicator {
      position: absolute; right: 0; top: 0; bottom: 0; width: 3px; background: #2563eb;
    }
    .vehicle-thumb { width: 44px; height: 44px; border-radius: 8px; object-fit: cover; }
    .vehicle-id { font-size: 14px; font-weight: 700; color: #1e293b; }
    .vehicle-model { font-size: 12px; color: #64748b; margin: 2px 0; }
    .status-indicator { font-size: 10px; font-weight: 700; }
    .status-indicator.in-transit { color: #2563eb; }
    .status-indicator.stopped { color: #ef4444; }
    .status-indicator.awaiting-loading { color: #f59e0b; }

    /* MAIN CONTENT */
    .main-tracking-content {
      flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 24px; overflow-y: auto;
    }
    .top-row, .bottom-row { display: flex; gap: 24px; }
    
    /* CARDS */
    .map-card, .capacity-card, .details-section, .chat-card {
      background: white; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .map-card { flex: 2; height: 400px; display: flex; flex-direction: column; }
    .capacity-card { width: 340px; }
    .details-section { flex: 2; }
    .chat-card { width: 340px; display: flex; flex-direction: column; height: 500px; }

    .card-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
    }
    .card-header h3 { margin: 0; font-size: 15px; font-weight: 700; color: #1e293b; }

    /* MAP */
    .map-placeholder { flex: 1; border-radius: 12px; overflow: hidden; position: relative; background: #e2e8f0; }
    .map-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; }
    .map-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
    .route-line {
      position: absolute; top: 45%; left: 40%; width: 40%; height: 4px; 
      background: #2563eb; transform: rotate(-30deg); border-radius: 2px;
    }
    .marker { position: absolute; width: 12px; height: 12px; border-radius: 50%; border: 3px solid white; }
    .marker.start { background: #64748b; }
    .marker.current { background: #2563eb; width: 16px; height: 16px; z-index: 2; }
    .marker-pulse {
      position: absolute; top: -10px; left: -10px; width: 36px; height: 36px;
      background: rgba(37,99,235,0.2); border-radius: 50%; animation: pulse 2s infinite;
    }
    @keyframes pulse { 0% { scale: 0.5; opacity: 1; } 100% { scale: 1.5; opacity: 0; } }

    /* TRUCK VIZ */
    .truck-viz { height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .truck-container { position: relative; width: 240px; }
    .truck-base { width: 100%; }
    .capacity-stats { display: flex; flex-direction: column; gap: 12px; }
    .stat-row { display: flex; justify-content: space-between; font-size: 13px; }
    .stat-label { color: #64748b; font-weight: 500; }
    .stat-value { color: #1e293b; font-weight: 700; }

    /* TIMELINE */
    .tracking-timeline { padding: 10px 0; }
    .timeline-cities {
      display: flex; position: relative; padding-bottom: 40px; margin-bottom: 30px;
      justify-content: space-between;
    }
    .city { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; flex: 1; }
    .city-dot { width: 10px; height: 10px; border-radius: 50%; background: #e2e8f0; margin-bottom: 12px; }
    .city.active .city-dot { background: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,0.1); }
    .city.current .city-dot { transform: scale(1.4); }
    .city-name { font-size: 13px; font-weight: 700; color: #94a3b8; }
    .city.active .city-name { color: #1e293b; }
    .city-time { position: absolute; top: 40px; font-size: 10px; color: #94a3b8; white-space: nowrap; }
    
    .progress-line {
      position: absolute; top: 4px; left: 8%; right: 8%; height: 2px; background: #f1f5f9; z-index: 1;
    }
    .progress-fill { height: 100%; background: #2563eb; }

    .tracking-stats-grid { display: flex; justify-content: space-between; background: #f8fafc; border-radius: 12px; padding: 16px; }
    .track-stat { display: flex; gap: 12px; align-items: center; }
    .stat-icon {
      width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px;
    }
    .stat-icon.loc { background: #eff6ff; color: #2563eb; }
    .stat-icon.speed { background: #f0fdf4; color: #22c55e; }
    .stat-icon.dist { background: #fdf2f8; color: #db2777; }
    .stat-icon.time { background: #fffbeb; color: #b45309; }
    .stat-content { display: flex; flex-direction: column; }
    .stat-label { font-size: 14px; font-weight: 700; color: #1e293b; }
    .stat-sub { font-size: 11px; color: #64748b; }

    /* PHOTO REPORTS */
    .photo-reports-section { margin-top: 30px; }
    .photo-reports-section h3 { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 16px; }
    .photo-grid { display: flex; gap: 12px; }
    .photo-card {
      width: 160px; border-radius: 12px; overflow: hidden; background: white; border: 1px solid #f1f5f9;
    }
    .photo-card img { width: 100%; height: 90px; object-fit: cover; }
    .photo-info { padding: 10px; display: flex; flex-direction: column; gap: 4px; }
    .point-name { font-size: 12px; font-weight: 700; color: #1e293b; }
    .point-loc { font-size: 10px; color: #94a3b8; }
    .request-photo-btn {
      width: 100px; border: 2px dashed #e2e8f0; border-radius: 12px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 8px; color: #2563eb; font-size: 12px; font-weight: 600;
      background: #f8fafc; cursor: pointer;
    }

    /* CHAT */
    .chat-header-actions { display: flex; align-items: center; gap: 8px; }
    .chat-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 2px solid #f1f5f9; }
    .map-controls button {
      width: 40px; height: 40px; border: none; background: white; border-radius: 8px;
      display: flex; align-items: center; justify-content: center; color: #1e293b;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); cursor: pointer; font-size: 14px;
    }
    .icon-btn:hover { background: #eff6ff; color: #2563eb; }
    .chat-messages { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; padding: 10px 0; scrollbar-width: thin; }
    .msg-group { display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
    .msg-group.me { align-items: flex-end; }
    .msg-bubble { 
      max-width: 85%; padding: 12px 16px; border-radius: 14px; font-size: 13px; font-weight: 500;
      background: #f1f5f9; color: #334155;
    }
    .msg-bubble.me { background: #2563eb; color: white; }
    .msg-time { font-size: 10px; color: #94a3b8; }
    .chat-input-area input { border-radius: 12px; background: #f8fafc; border: 1px solid #f1f5f9; height: 44px; }
    .send-icon { color: #2563eb; cursor: pointer; font-size: 18px; }
  `]
})
export class GpsComponent {
  vehicles: TrackingVehicle[] = [
    { id: '#AP-35602-AZ', model: 'Mercedes Benz Actros', status: 'In Transit', image: '/images/cars/trucks/truck.png', active: true },
    { id: '#OH-44459-KC', model: 'Iveco Eurocargo', status: 'In Transit', image: 'https://images.unsplash.com/photo-1591768793355-74d7f8d38446?auto=format&fit=crop&q=80&w=100' },
    { id: '#CE-87990-IS', model: 'Volvo VNL', status: 'In Transit', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=100' },
    { id: '#JY-36844-IU', model: 'Kenworth T680', status: 'In Transit', image: 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&q=80&w=100' },
    { id: '#YU-49266-LG', model: 'Scania R Series', status: 'Stopped', image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=100' }
  ];

  messages: ChatMessage[] = [
    { author: 'Driver', text: 'Hey, John! Just checking in - are you on schedule for the delivery to New York?', time: '07:35 AM', isMe: false },
    { author: 'Me', text: 'Morning, boss! Yeah, I\'m about 30 min out from the next stop. Traffic\'s been clear so far, so all good.', time: '07:40 AM', isMe: true },
    { author: 'Driver', text: 'Great to hear! Let me know if anything changes. Also, remember to check the tire pressure before you head back.', time: '07:49 AM', isMe: false }
  ];

  selectVehicle(v: TrackingVehicle) {
    this.vehicles.forEach(veh => veh.active = (veh === v));
  }
}
