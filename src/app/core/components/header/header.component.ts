import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, NzLayoutModule, NzInputModule, NzIconModule,
    NzButtonModule, NzAvatarModule, NzDropDownModule, FormsModule
  ],
  template: `
    <div class="header-container">
      <div class="left-section">
        <button class="toggle-btn" (click)="toggle.emit()">
          <span nz-icon [nzType]="isCollapsed ? 'menu' : 'menu-fold'" nzTheme="outline"></span>
        </button>

        <div class="search-wrapper">
          <span nz-icon nzType="search" nzTheme="outline" class="search-icon"></span>
          <input nz-input placeholder="Search..." class="search-input" />
          <span class="search-hint">cmd K</span>
        </div>
      </div>

      <div class="right-section">
        <button class="icon-btn" nz-button nzType="text">
          <span nz-icon nzType="bell" nzTheme="outline"></span>
        </button>
        <div class="user-profile" nz-dropdown [nzDropdownMenu]="userMenu" nzPlacement="bottomRight">
          <nz-avatar nzSrc="https://randomuser.me/api/portraits/men/32.jpg"></nz-avatar>
          <div class="user-info">
            <span class="user-name">John Doe</span>
            <span class="user-role">Admin</span>
          </div>
          <span nz-icon nzType="down" nzTheme="outline" class="dropdown-icon"></span>
        </div>

        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu class="user-dropdown-menu">
            <li nz-menu-item><span nz-icon nzType="user" nzTheme="outline"></span> Profile</li>
            <li nz-menu-item><span nz-icon nzType="setting" nzTheme="outline"></span> Settings</li>
            <li nz-menu-divider></li>
            <li nz-menu-item (click)="logout()"><span nz-icon nzType="logout" nzTheme="outline"></span> Logout</li>
          </ul>
        </nz-dropdown-menu>
      </div>
    </div>
  `,
  styles: [`
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 16px;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      color: var(--text-secondary);
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 18px;
      transition: all 0.15s ease;
    }
    .toggle-btn:hover {
      background: var(--bg-elevated);
      color: var(--text-primary);
    }

    .search-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--bg-elevated);
      border: 1px solid var(--border-muted);
      border-radius: var(--radius-sm);
      padding: 0 12px;
      width: 280px;
      height: 36px;
      transition: all 0.15s ease;
    }
    .search-wrapper:focus-within {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.1);
    }
    .search-icon {
      color: var(--text-muted);
      font-size: 14px;
      flex-shrink: 0;
    }
    .search-input {
      flex: 1;
      border: none !important;
      background: transparent !important;
      color: var(--text-primary);
      font-size: 13px;
      padding: 0 !important;
      outline: none;
      box-shadow: none !important;
    }
    .search-input::placeholder {
      color: var(--text-muted);
    }
    .search-hint {
      font-size: 10px;
      color: var(--text-muted);
      background: var(--bg-base);
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
      letter-spacing: 0.3px;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .icon-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary) !important;
      border-radius: var(--radius-sm) !important;
    }
    .icon-btn:hover {
      color: var(--text-primary) !important;
      background: var(--bg-elevated) !important;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 4px 12px 4px 4px;
      border-radius: var(--radius-full);
      transition: background 0.15s ease;
    }
    .user-profile:hover {
      background: var(--bg-elevated);
    }
    .user-info {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-primary);
    }
    .user-role {
      font-size: 11px;
      color: var(--text-muted);
    }
    .dropdown-icon {
      font-size: 10px;
      color: var(--text-muted);
    }

    ::ng-deep .user-dropdown-menu {
      min-width: 180px;
    }
    ::ng-deep .user-dropdown-menu .ant-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 36px;
      line-height: 36px;
    }
  `]
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();
  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }
}
