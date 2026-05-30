import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzSelectModule,
    NzSwitchModule,
    NzButtonModule,
    NzIconModule,
    NzTypographyModule,
    NzDividerModule,
    NzTableModule,
    NzTagModule,
    NzModalModule,
  ],
  template: `
    <div class="settings-page">
      <!-- General Settings Card -->
      <nz-card class="settings-card" nzTitle="General Settings">
        <div class="field-row">
          <div class="field">
            <label>Language</label>
            <nz-select [(ngModel)]="language" nzPlaceHolder="Select language">
              <nz-option nzLabel="English" nzValue="en"></nz-option>
              <nz-option nzLabel="French" nzValue="fr"></nz-option>
              <nz-option nzLabel="Arabic" nzValue="ar"></nz-option>
            </nz-select>
          </div>
          <div class="field">
            <label>Time Zone</label>
            <nz-select [(ngModel)]="timeZone" nzPlaceHolder="Select time zone">
              <nz-option nzLabel="UTC" nzValue="UTC"></nz-option>
              <nz-option nzLabel="Europe/Paris" nzValue="Europe/Paris"></nz-option>
              <nz-option nzLabel="America/New_York" nzValue="America/New_York"></nz-option>
            </nz-select>
          </div>
          <div class="field">
            <label>Date Format</label>
            <nz-select [(ngModel)]="dateFormat" nzPlaceHolder="Select format">
              <nz-option nzLabel="MM/DD/YYYY" nzValue="MM/DD/YYYY"></nz-option>
              <nz-option nzLabel="DD/MM/YYYY" nzValue="DD/MM/YYYY"></nz-option>
              <nz-option nzLabel="YYYY-MM-DD" nzValue="YYYY-MM-DD"></nz-option>
            </nz-select>
          </div>
        </div>
      </nz-card>

      <!-- Appearance Card -->
      <nz-card class="settings-card" nzTitle="Appearance">
        <div class="field-row">
          <div class="field toggle-field">
            <div class="toggle-label">
              <span class="label-icon" nz-icon [nzType]="themeService.isDark ? 'moon' : 'sun'" nzTheme="fill"></span>
              <label>{{ themeService.isDark ? 'Dark Mode' : 'Light Mode' }}</label>
            </div>
            <nz-switch
              [(ngModel)]="themeService.isDark"
              (ngModelChange)="themeService.toggleTheme()"
              [nzCheckedChildren]="checkedTemplate"
              [nzUnCheckedChildren]="uncheckedTemplate"
            ></nz-switch>
            <ng-template #checkedTemplate><span nz-icon nzType="moon" nzTheme="fill" style="font-size:14px"></span></ng-template>
            <ng-template #uncheckedTemplate><span nz-icon nzType="sun" nzTheme="fill" style="font-size:14px"></span></ng-template>
          </div>
        </div>
      </nz-card>

      <!-- User Management Card -->
      <nz-card class="settings-card" nzTitle="User Management">
        <div class="card-subtitle">{{ users.length }} users in your team</div>
        <div class="actions" style="margin-bottom: 20px;">
          <button nz-button nzType="primary" class="btn-primary" (click)="showCreateUserModal = true">
            <span nz-icon nzType="user-add" nzTheme="outline"></span>
            Create User
          </button>
        </div>

        <nz-table #userTable [nzData]="users" nzSize="small">
          <thead>
            <tr>
              <th>NAME</th>
              <th>LOGIN</th>
              <th>PASSWORD</th>
              <th>ROLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of userTable.data">
              <td>{{ u.name }}</td>
              <td>{{ u.login }}</td>
              <td>
                <div class="password-cell">
                  <span>{{ visiblePasswords[u.id] ? u.password : '••••••••' }}</span>
                  <button nz-button nzType="text" nzSize="small" class="eye-btn" (click)="togglePassword(u.id)">
                    <span nz-icon [nzType]="visiblePasswords[u.id] ? 'eye' : 'eye-invisible'" nzTheme="outline"></span>
                  </button>
                </div>
              </td>
              <td>
                <nz-tag [nzColor]="u.role === 'admin' ? 'purple' : 'blue'">{{ u.role }}</nz-tag>
              </td>
              <td>
                <button nz-button nzType="text" nzSize="small" class="edit-btn" (click)="editUser(u)">
                  <span nz-icon nzType="edit" nzTheme="outline"></span>
                </button>
                <button nz-button nzType="text" nzSize="small" nzDanger class="delete-btn" (click)="deleteUser(u.id)">
                  <span nz-icon nzType="delete" nzTheme="outline"></span>
                </button>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>

      <!-- Software & Updates Card -->
      <nz-card class="settings-card" nzTitle="Software & Updates">
        <div class="version-info">
          <div class="info-row">
            <span class="info-label">Current Version</span>
            <span class="info-value">{{currentVersion}}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Last Updated</span>
            <span class="info-value">{{lastUpdated}}</span>
          </div>
        </div>
        <div class="actions">
          <button nz-button nzType="default" class="btn-secondary">
            <span nz-icon nzType="reload" nzTheme="outline"></span>
            Check for Updates
          </button>
          <button nz-button nzType="primary" class="btn-primary">
            <span nz-icon nzType="download" nzTheme="outline"></span>
            Update Software
          </button>
        </div>
        <nz-divider style="margin: 16px 0;"></nz-divider>
        <div class="field toggle-field">
          <label>Enable Automatic Updates</label>
          <nz-switch [(ngModel)]="autoUpdates"></nz-switch>
        </div>
      </nz-card>

      <!-- CREATE USER MODAL -->
      <nz-modal
        [(nzVisible)]="showCreateUserModal"
        nzTitle="Create User"
        (nzOnCancel)="showCreateUserModal = false"
        [nzFooter]="createUserFooter"
        [nzWidth]="520">
        <ng-container *nzModalContent>
          <div class="user-form-grid">
            <div class="form-item">
              <label>Full Name</label>
              <input nz-input placeholder="e.g. John Doe" [(ngModel)]="newUser.name" />
            </div>
            <div class="form-item">
              <label>Login</label>
              <input nz-input placeholder="e.g. johndoe" [(ngModel)]="newUser.login" />
            </div>
            <div class="form-item">
              <label>Password</label>
              <input nz-input type="password" placeholder="Enter password" [(ngModel)]="newUser.password" />
            </div>
            <div class="form-item">
              <label>Role</label>
              <nz-select [(ngModel)]="newUser.role" nzPlaceHolder="Select role" style="width: 100%;">
                <nz-option nzLabel="Simple User" nzValue="user"></nz-option>
                <nz-option nzLabel="Admin" nzValue="admin"></nz-option>
              </nz-select>
            </div>
          </div>
        </ng-container>
        <ng-template #createUserFooter>
          <button nz-button nzType="default" (click)="showCreateUserModal = false">Cancel</button>
          <button nz-button nzType="primary" (click)="createUser()" [disabled]="!newUser.name || !newUser.login || !newUser.password">Create User</button>
        </ng-template>
      </nz-modal>

      <!-- EDIT USER MODAL -->
      <nz-modal
        [(nzVisible)]="showEditUserModal"
        nzTitle="Edit User"
        (nzOnCancel)="showEditUserModal = false"
        [nzFooter]="editUserFooter"
        [nzWidth]="520">
        <ng-container *nzModalContent>
          <div class="user-form-grid">
            <div class="form-item">
              <label>Full Name</label>
              <input nz-input [(ngModel)]="editingUser.name" />
            </div>
            <div class="form-item">
              <label>Login</label>
              <input nz-input [(ngModel)]="editingUser.login" />
            </div>
            <div class="form-item">
              <label>New Password</label>
              <input nz-input type="password" placeholder="Leave blank to keep current" [(ngModel)]="editingUser.password" />
            </div>
            <div class="form-item">
              <label>Role</label>
              <nz-select [(ngModel)]="editingUser.role" style="width: 100%;">
                <nz-option nzLabel="Simple User" nzValue="user"></nz-option>
                <nz-option nzLabel="Admin" nzValue="admin"></nz-option>
              </nz-select>
            </div>
          </div>
        </ng-container>
        <ng-template #editUserFooter>
          <button nz-button nzType="default" (click)="showEditUserModal = false">Cancel</button>
          <button nz-button nzType="primary" (click)="saveEditUser()">Save Changes</button>
        </ng-template>
      </nz-modal>
    </div>
  `,
  styles: [`
    .settings-page {
      max-width: 800px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .settings-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      border: 1px solid #f0f0f0;
    }

    .settings-card ::ng-deep .ant-card-head {
      border-bottom: 1px solid #f5f5f5;
      padding: 16px 24px;
      min-height: auto;
    }

    .settings-card ::ng-deep .ant-card-head-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    .settings-card ::ng-deep .ant-card-body {
      padding: 20px 24px;
    }

    .field-row {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 180px;
      flex: 1;
    }

    .field label {
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .toggle-field {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .toggle-field label {
      text-transform: none;
      letter-spacing: normal;
      font-size: 14px;
      color: #374151;
    }

    .toggle-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-label label {
      text-transform: none;
      letter-spacing: normal;
      font-size: 14px;
      color: #374151;
    }

    .label-icon {
      font-size: 18px;
      color: #6366f1;
    }

    .card-subtitle {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 16px;
    }

    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: #6366f1;
      border-color: #6366f1;
      border-radius: 8px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .btn-primary:hover {
      background: #4f46e5 !important;
      border-color: #4f46e5 !important;
    }

    .btn-secondary {
      border-radius: 8px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-color: #d1d5db;
    }

    .version-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
    }

    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 0;
    }

    .info-label {
      font-size: 14px;
      color: #6b7280;
    }

    .info-value {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    nz-divider {
      margin: 16px 0;
    }

    .restore-btn {
      color: #16a34a !important;
    }
    .restore-btn:hover {
      color: #15803d !important;
    }

    .delete-btn {
      color: #dc2626 !important;
    }
    .delete-btn:hover {
      color: #b91c1c !important;
    }

    .empty-trash {
      text-align: center;
      padding: 40px 20px;
    }
    .empty-icon {
      font-size: 48px;
      color: #d1d5db;
      margin-bottom: 12px;
    }
    .empty-trash p {
      color: #9ca3af;
      margin: 0;
    }

    .trash-actions {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }

    .create-user-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .user-form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-item label {
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
    }
    .pwd-user-info {
      margin: 0 0 8px;
      font-size: 14px;
      color: #374151;
    }
    .edit-btn { color: #6366f1 !important; }
    .delete-btn { color: #dc2626 !important; }
    .delete-btn:hover { color: #b91c1c !important; }

    .password-cell {
      display: flex;
      align-items: center;
      gap: 4px;
      font-family: monospace;
      font-size: 13px;
      color: #374151;
    }
    .eye-btn {
      color: #9ca3af !important;
    }
    .eye-btn:hover {
      color: #6366f1 !important;
    }
  `]
})
export class SettingsComponent {
  language = 'en';
  timeZone = 'UTC';
  dateFormat = 'MM/DD/YYYY';

  constructor(public themeService: ThemeService) {}

  currentVersion = 'v1.0.0';
  lastUpdated = new Date().toLocaleDateString();
  autoUpdates = false;

  // User Management
  users = [
    { id: 1, name: 'Admin User', login: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Regular User', login: 'user', password: 'user123', role: 'user' }
  ];

  visiblePasswords: Record<number, boolean> = {};

  showCreateUserModal = false;
  showEditUserModal = false;

  newUser = { name: '', login: '', password: '', role: 'user' };
  editingUser: any = {};

  createUser() {
    if (!this.newUser.name || !this.newUser.login || !this.newUser.password) return;
    this.users = [...this.users, {
      id: Date.now(),
      name: this.newUser.name,
      login: this.newUser.login,
      password: this.newUser.password,
      role: this.newUser.role
    }];
    this.newUser = { name: '', login: '', password: '', role: 'user' };
    this.showCreateUserModal = false;
  }

  togglePassword(id: number) {
    this.visiblePasswords[id] = !this.visiblePasswords[id];
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.showEditUserModal = true;
  }

  saveEditUser() {
    const index = this.users.findIndex(u => u.id === this.editingUser.id);
    if (index !== -1) {
      const updated = { ...this.editingUser };
      if (updated.password) {
        this.users[index] = updated;
      } else {
        const { password, ...rest } = updated;
        this.users[index] = rest as any;
      }
    }
    this.showEditUserModal = false;
  }

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }
}
