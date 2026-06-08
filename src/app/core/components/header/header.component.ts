import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzAvatarModule, NzDropDownModule, NzDividerModule],
  template: `
    <div class="h-full flex items-center justify-between w-full gap-4 px-4">
      <!-- Left -->
      <div class="flex items-center gap-3"></div>

      <!-- Right -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-2.5 pl-2 border-l border-[#e0e0e0]">
          <div class="flex flex-col items-end leading-tight">
            <span class="text-[13px] font-medium text-[#202124]">{{ authService.getUserName() }}</span>
            <span class="text-[11px] text-[#5f6368]">{{ authService.getRole() }}</span>
          </div>
          <div
            class="user-avatar-wrap"
            nz-dropdown
            [nzDropdownMenu]="userMenu"
            nzTrigger="click">
            <nz-avatar [nzSrc]="authService.getUserAvatar() || undefined" class="cursor-pointer" [nzSize]="32">
              <span nz-icon nzType="user" *ngIf="!authService.getUserAvatar()" nzTheme="outline"></span>
            </nz-avatar>
          </div>
        </div>
      </div>
    </div>

    <nz-dropdown-menu #userMenu="nzDropdownMenu">
      <div nz-menu>
        <div nz-menu-item class="menu-header">
          <span nz-icon nzType="user" nzTheme="outline"></span>
          <span>{{ authService.getUserName() }}</span>
        </div>
        <nz-divider style="margin: 4px 0;"></nz-divider>
        <div nz-menu-item (click)="goToSettings()" *ngIf="authService.isAdmin()">
          <span nz-icon nzType="setting" nzTheme="outline"></span>
          <span>Manage Users</span>
        </div>
        <div nz-menu-item (click)="logout()" class="logout-item">
          <span nz-icon nzType="logout" nzTheme="outline"></span>
          <span>Logout</span>
        </div>
      </div>
    </nz-dropdown-menu>
  `,
  styles: [`
    .user-avatar-wrap {
      cursor: pointer;
    }
    .menu-header {
      font-weight: 600;
      color: #111827 !important;
      cursor: default !important;
    }
    .menu-header:hover {
      background: transparent !important;
    }
    .logout-item {
      color: #dc2626 !important;
    }
    .logout-item:hover {
      background: #fef2f2 !important;
      color: #dc2626 !important;
    }
  `]
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  authService = inject(AuthService);

  constructor(private router: Router) {}

  goToSettings(): void {
    this.router.navigate(['/user-management']);
  }

  logout(): void {
    this.authService.logout();
  }
}
