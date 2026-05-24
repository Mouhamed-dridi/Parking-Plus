import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzRadioModule,
    FormsModule
  ],
  template: `
    <div class="header-container">
      <div class="left-section">
        <div class="toggle-btn" (click)="toggle.emit()">
          <span nz-icon nzType="menu" nzTheme="outline" *ngIf="isCollapsed"></span>
          <span nz-icon nzType="menu-fold" nzTheme="outline" *ngIf="!isCollapsed"></span>
        </div>
        
        <nz-input-group [nzPrefix]="prefixIconSearch" class="search-input">
          <input type="text" nz-input placeholder="Search" />
        </nz-input-group>
        <ng-template #prefixIconSearch>
          <span nz-icon nzType="search"></span>
        </ng-template>
      </div>

      <div class="right-section">
        <div class="user-profile" nz-dropdown [nzDropdownMenu]="userMenu" nzPlacement="bottomRight">
          <nz-avatar nzIcon="user" nzSrc="https://randomuser.me/api/portraits/men/32.jpg"></nz-avatar>
          <span class="user-name">Admin</span>
          <span nz-icon nzType="down" nzTheme="outline" class="dropdown-icon"></span>
        </div>
        
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item>Profile</li>
            <li nz-menu-item>Settings</li>
            <li nz-menu-divider></li>
            <li nz-menu-item>Logout</li>
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
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .toggle-btn {
      font-size: 18px;
      cursor: pointer;
      color: var(--text-dark);
      padding: 4px;
      border-radius: 4px;
    }

    .toggle-btn:hover {
      background: var(--bg-color);
    }

    .search-input {
      width: 250px;
      border-radius: 20px;
      overflow: hidden;
    }
    
    .search-input input {
      border: none;
      background: var(--bg-color);
    }
    
    .search-input .ant-input-prefix {
      background: var(--bg-color);
      padding-left: 12px;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 4px 12px;
      border-radius: 24px;
      transition: background 0.2s;
    }

    .user-profile:hover {
      background: var(--bg-color);
    }

    .user-name {
      font-weight: 500;
      color: var(--text-dark);
    }

    .dropdown-icon {
      font-size: 10px;
      color: var(--text-gray);
    }
  `]
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();
}
