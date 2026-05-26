import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface VipCar {
  id: string;
  name: string;
  model: string;
  image: string;
  refId: string;
  status: 'Available' | 'In Use' | 'Maintenance';
  assignedTo?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, NzMenuModule, NzIconModule],
  template: `
    <div class="logo">
      <div class="logo-icon">P</div>
      <h2 *ngIf="!isCollapsed">Park+</h2>
    </div>

    <div class="menu-section">
      <span class="menu-label" *ngIf="!isCollapsed">Menu</span>
      <ul nz-menu nzMode="inline" [nzTheme]="'light'" [nzSelectable]="true">
        <li nz-menu-item nzMatchRouter routerLink="/dashboard">
          <span nz-icon nzType="appstore" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Dashboard</span>
        </li>
        <li nz-submenu nzTitle="Cars / Vehicles" nzIcon="car" nzOpen>
          <ul>
            <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'pickup'}"><span nz-icon nzType="carry-out" nzTheme="outline"></span> Pickup</li>
            <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'delivery'}"><span nz-icon nzType="shopping-cart" nzTheme="outline"></span> Delivery</li>
            <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'trucks'}"><span nz-icon nzType="deployment-unit" nzTheme="outline"></span> Trucks</li>
            <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'DG cars'}"><span nz-icon nzType="thunderbolt" nzTheme="outline"></span> DG cars</li>
          </ul>
        </li>

        <li nz-menu-item nzMatchRouter routerLink="/drivers">
          <span nz-icon nzType="idcard" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Drivers</span>
        </li>
        <li nz-menu-item nzMatchRouter routerLink="/gps">
          <span nz-icon nzType="environment" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">GPS / Tracking</span>
        </li>
        <li nz-menu-item nzMatchRouter routerLink="/parking-state">
          <span nz-icon nzType="inbox" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Packing State</span>
        </li>
        <li nz-menu-item nzMatchRouter routerLink="/request-car">
          <span nz-icon nzType="calendar" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Booking Car Request</span>
        </li>
        <li nz-menu-item nzMatchRouter>
          <span nz-icon nzType="tool" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Maintenance</span>
        </li>
      </ul>
    </div>

    <div class="menu-section">
      <span class="menu-label" *ngIf="!isCollapsed">System</span>
      <ul nz-menu nzMode="inline" [nzTheme]="'light'" [nzSelectable]="true">
        <li nz-menu-item nzMatchRouter>
          <span nz-icon nzType="file-text" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Reports</span>
        </li>
        <li nz-menu-item nzMatchRouter>
          <span nz-icon nzType="setting" nzTheme="outline"></span>
          <span *ngIf="!isCollapsed">Settings</span>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: white;
    }
    
    .logo {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 24px;
      margin-top: 16px;
      margin-bottom: 24px;
      cursor: pointer;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: var(--primary-color);
      color: white;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
      flex-shrink: 0;
    }

    .logo h2 {
      margin: 0 0 0 12px;
      font-size: 20px;
      font-weight: 700;
      color: var(--text-dark);
      white-space: nowrap;
      overflow: hidden;
    }

    .menu-section {
      margin-bottom: 24px;
    }
    
    .menu-label {
      font-size: 12px;
      text-transform: uppercase;
      color: #9ca3af;
      margin-left: 24px;
      margin-bottom: 8px;
      display: block;
      font-weight: 600;
    }
    
    .ant-menu {
      border-right: none;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
}
