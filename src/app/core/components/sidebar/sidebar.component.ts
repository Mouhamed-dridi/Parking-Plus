import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: { label: string; icon: string; route: string }[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzIconModule],
  template: `
    <div class="sidebar h-full bg-white border-r border-[#e0e0e0] flex flex-col select-none">
      <!-- Logo -->
      <div class="h-14 flex items-center gap-3 px-4 border-b border-[#e0e0e0]">
        <div class="w-8 h-8 bg-[#1a73e8] text-white flex items-center justify-center text-sm font-bold rounded-sm">
          P
        </div>
        <h2 *ngIf="!isCollapsed" class="text-[15px] font-semibold text-[#202124] m-0 tracking-tight">ParkPlus</h2>
      </div>

      <!-- Section: Menu -->
      <div class="py-2" *ngIf="!isCollapsed">
        <div class="text-[11px] font-bold text-[#5f6368] uppercase tracking-[0.05em] px-4 py-2">Menu</div>
        <div *ngFor="let item of menuItems" class="flex flex-col">
          <a *ngIf="!item.children"
             [routerLink]="item.route"
             routerLinkActive="active-nav"
             #rla="routerLinkActive"
             [class.active-nav]="rla.isActive"
             class="flex items-center h-10 px-4 gap-3 text-[13px] text-[#5f6368] hover:bg-[#f1f3f4] cursor-pointer no-underline transition-colors relative">
            <span class="flex items-center justify-center w-5 h-5 flex-shrink-0">
              <span nz-icon [nzType]="item.icon" nzTheme="outline" class="text-[16px]"></span>
            </span>
            <span class="flex-1 truncate">{{ item.label }}</span>
          </a>
          <!-- Submenu item -->
          <div *ngIf="item.children">
            <div class="flex items-center h-10 px-4 gap-3 text-[13px] text-[#5f6368] cursor-default">
              <span class="flex items-center justify-center w-5 h-5 flex-shrink-0">
                <span nz-icon [nzType]="item.icon" nzTheme="outline" class="text-[16px]"></span>
              </span>
              <span class="flex-1 truncate">{{ item.label }}</span>
              <span nz-icon nzType="chevron-down" nzTheme="outline" class="text-[12px] text-[#9aa0a6]"></span>
            </div>
            <div class="ml-2">
              <a *ngFor="let child of item.children"
                 [routerLink]="child.route"
                 routerLinkActive="active-nav"
                 #rla2="routerLinkActive"
                 [class.active-nav]="rla2.isActive"
                 class="flex items-center h-9 pl-11 pr-4 gap-3 text-[13px] text-[#5f6368] hover:bg-[#f1f3f4] cursor-pointer no-underline transition-colors relative">
                <span nz-icon [nzType]="child.icon" nzTheme="outline" class="text-[14px]"></span>
                <span class="flex-1 truncate">{{ child.label }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: System -->
      <div class="py-2 border-t border-[#e0e0e0]" *ngIf="!isCollapsed">
        <div class="text-[11px] font-bold text-[#5f6368] uppercase tracking-[0.05em] px-4 py-2">System</div>
        <a *ngFor="let item of systemItems"
           [routerLink]="item.route"
           routerLinkActive="active-nav"
           #rla3="routerLinkActive"
           [class.active-nav]="rla3.isActive"
           class="flex items-center h-10 px-4 gap-3 text-[13px] text-[#5f6368] hover:bg-[#f1f3f4] cursor-pointer no-underline transition-colors relative">
          <span class="flex items-center justify-center w-5 h-5 flex-shrink-0">
            <span nz-icon [nzType]="item.icon" nzTheme="outline" class="text-[16px]"></span>
          </span>
          <span class="flex-1 truncate">{{ item.label }}</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .sidebar { width: 100%; overflow-y: auto; overflow-x: hidden; }
    .active-nav { background: #e8f0fe !important; color: #1a73e8 !important; }
    .active-nav::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: #1a73e8;
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'appstore', route: '/dashboard' },
    { label: 'Vehicles', icon: 'car', children: [
      { label: 'Cars', icon: 'car', route: '/listing' },
      { label: 'Delivery', icon: 'shopping-cart', route: '/delivery-cars' },
      { label: 'Used Cars', icon: 'car', route: '/used-car' },
    ]},
    { label: 'Drivers', icon: 'idcard', route: '/drivers' },
    { label: 'Booking', icon: 'calendar', route: '/request-car' },
    { label: 'Booking List', icon: 'unordered-list', route: '/booking-list' },
    { label: 'Maintenance', icon: 'tool', children: [
      { label: 'Repairs', icon: 'tool', route: '/repairs' },
      { label: 'Garage CRM', icon: 'shop', route: '/garage-crm' }
    ]},
  ];

  systemItems: MenuItem[] = [
    { label: 'Reports', icon: 'file-text', route: '/reports' },
    { label: 'Trash', icon: 'delete', route: '/trash' },
    { label: 'Settings', icon: 'setting', route: '/settings' },
  ];
}
