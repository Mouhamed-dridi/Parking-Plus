import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, NzMenuModule, NzIconModule],
  template: `
    <div class="sidebar-inner">
      <div class="logo">
        <div class="logo-icon">
          <span nz-icon nzType="car" nzTheme="outline"></span>
        </div>
        <h2 *ngIf="!isCollapsed">ParkPlus</h2>
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
              <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'car'}"><span nz-icon nzType="car" nzTheme="outline"></span> Cars</li>
              <li nz-menu-item nzMatchRouter routerLink="/listing" [queryParams]="{category: 'delivery'}"><span nz-icon nzType="shopping-cart" nzTheme="outline"></span> Delivery</li>
            </ul>
          </li>

          <li nz-menu-item nzMatchRouter routerLink="/drivers">
            <span nz-icon nzType="idcard" nzTheme="outline"></span>
            <span *ngIf="!isCollapsed">Drivers</span>
          </li>
          <li nz-menu-item nzMatchRouter routerLink="/request-car">
            <span nz-icon nzType="calendar" nzTheme="outline"></span>
            <span *ngIf="!isCollapsed">Booking</span>
          </li>
          <li nz-menu-item nzMatchRouter routerLink="/repairs">
            <span nz-icon nzType="tool" nzTheme="outline"></span>
            <span *ngIf="!isCollapsed">Maintenance</span>
          </li>
        </ul>
      </div>

      <div class="menu-section">
        <span class="menu-label" *ngIf="!isCollapsed">System</span>
        <ul nz-menu nzMode="inline" [nzTheme]="'light'" [nzSelectable]="true">
          <li nz-menu-item nzMatchRouter routerLink="/reports">
            <span nz-icon nzType="file-text" nzTheme="outline"></span>
            <span *ngIf="!isCollapsed">Reports</span>
          </li>
          <li nz-menu-item nzMatchRouter routerLink="/settings">
            <span nz-icon nzType="setting" nzTheme="outline"></span>
            <span *ngIf="!isCollapsed">Settings</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--bg-surface);
      border-right: 1px solid var(--border-muted);
    }

    .sidebar-inner {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      padding: 0 0 16px;
    }

    .logo {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      gap: 10px;
      border-bottom: 1px solid var(--border-muted);
      margin-bottom: 16px;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: var(--accent);
      color: white;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .logo h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: -0.3px;
    }

    .menu-section {
      margin-bottom: 8px;
    }

    .menu-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      padding: 0 20px;
      margin-bottom: 6px;
      display: block;
      font-weight: 600;
    }

    ::ng-deep .ant-menu {
      border-right: none !important;
      background: transparent !important;
    }

    ::ng-deep .ant-menu-item {
      border-radius: 6px !important;
      margin: 2px 12px !important;
    }

    ::ng-deep .ant-menu-submenu-title {
      border-radius: 6px !important;
      margin: 2px 12px !important;
      width: calc(100% - 24px) !important;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;
}
