import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthService } from '../../core/services/auth.service';

interface AppUser {
  id: number;
  name: string;
  login: string;
  password: string;
  role: string;
  isSystem: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzCardModule, NzSelectModule, NzButtonModule,
    NzIconModule, NzTableModule, NzTagModule, NzModalModule, NzInputModule, NzAvatarModule
  ],
  template: `
    <div class="users-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">User Management</h1>
          <p class="page-sub">{{ users.length }} users in your team</p>
        </div>
        <button nz-button nzType="primary" class="btn-primary" (click)="openCreateModal()">
          <span nz-icon nzType="plus" nzTheme="outline"></span>
          Create User
        </button>
      </div>

      <nz-card class="users-card">
        <nz-table #userTable [nzData]="users" nzSize="middle" [nzPageSize]="20">
          <thead>
            <tr>
              <th>USER</th>
              <th>LOGIN</th>
              <th>PASSWORD</th>
              <th>ROLE</th>
              <th style="text-align:center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let u of userTable.data">
              <td>
                <div class="user-cell">
                  <nz-avatar [nzText]="u.name.charAt(0)" [nzSize]="32"
                    [style.background]="avatarColor(u.role)" [style.color]="'#fff'" [style.fontWeight]="'600'"></nz-avatar>
                  <div>
                    <div class="user-name">{{ u.name }}</div>
                    <span class="system-badge" *ngIf="u.isSystem">System</span>
                  </div>
                </div>
              </td>
              <td><span class="login-text">{{ u.login }}</span></td>
              <td>
                <div class="password-cell">
                  <span>{{ visiblePasswords[u.id] ? u.password : '••••••••' }}</span>
                  <button nz-button nzType="text" nzSize="small" class="eye-btn" (click)="togglePassword(u.id)">
                    <span nz-icon [nzType]="visiblePasswords[u.id] ? 'eye' : 'eye-invisible'" nzTheme="outline"></span>
                  </button>
                </div>
              </td>
              <td>
                <nz-tag [nzColor]="tagColor(u.role)">{{ u.role | uppercase }}</nz-tag>
              </td>
              <td style="text-align:center">
                <ng-container *ngIf="u.isSystem; else customActions">
                  <button nz-button nzType="text" nzSize="small" class="action-btn" (click)="openChangePassword(u)">
                    <span nz-icon nzType="lock" nzTheme="outline"></span> Change Password
                  </button>
                </ng-container>
                <ng-template #customActions>
                  <button nz-button nzType="text" nzSize="small" class="edit-btn" (click)="editUser(u)">
                    <span nz-icon nzType="edit" nzTheme="outline"></span>
                  </button>
                  <button nz-button nzType="text" nzSize="small" class="delete-btn" (click)="deleteUser(u)">
                    <span nz-icon nzType="delete" nzTheme="outline"></span>
                  </button>
                </ng-template>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>

      <!-- CREATE USER MODAL -->
      <nz-modal
        [(nzVisible)]="showCreateUserModal"
        nzTitle="Create User"
        (nzOnCancel)="closeCreateModal()"
        [nzFooter]="createUserFooter"
        [nzWidth]="480">
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
          <button nz-button nzType="default" (click)="closeCreateModal()">Cancel</button>
          <button nz-button nzType="primary" (click)="createUser()" [disabled]="!newUser.name || !newUser.login || !newUser.password">Create User</button>
        </ng-template>
      </nz-modal>

      <!-- CHANGE PASSWORD MODAL (System accounts) -->
      <nz-modal
        [(nzVisible)]="showChangePasswordModal"
        nzTitle="Change Password"
        (nzOnCancel)="closeChangePassword()"
        [nzFooter]="changePwFooter"
        [nzWidth]="420">
        <ng-container *nzModalContent>
          <div class="change-pw-form" *ngIf="changingPwUser">
            <p class="change-pw-user">
              Changing password for <strong>{{ changingPwUser.name }}</strong> ({{ changingPwUser.login }})
            </p>
            <div class="form-item">
              <label>New Password</label>
              <input nz-input type="password" placeholder="Enter new password" [(ngModel)]="changePwData.newPassword" />
            </div>
            <div class="form-item">
              <label>Confirm Password</label>
              <input nz-input type="password" placeholder="Confirm new password" [(ngModel)]="changePwData.confirmPassword" />
            </div>
            <p class="pw-error" *ngIf="changePwError">{{ changePwError }}</p>
          </div>
        </ng-container>
        <ng-template #changePwFooter>
          <button nz-button nzType="default" (click)="closeChangePassword()">Cancel</button>
          <button nz-button nzType="primary" (click)="saveChangePassword()">Update Password</button>
        </ng-template>
      </nz-modal>

      <!-- EDIT USER MODAL (custom users) -->
      <nz-modal
        [(nzVisible)]="showEditUserModal"
        nzTitle="Edit User"
        (nzOnCancel)="closeEditModal()"
        [nzFooter]="editUserFooter"
        [nzWidth]="480">
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
          <button nz-button nzType="default" (click)="closeEditModal()">Cancel</button>
          <button nz-button nzType="primary" (click)="saveEditUser()">Save Changes</button>
        </ng-template>
      </nz-modal>

      <!-- DELETE CONFIRMATION -->
      <nz-modal
        [(nzVisible)]="showDeleteModal"
        nzTitle="Delete User"
        nzOkText="Delete"
        nzOkType="primary"
        nzOkDanger
        (nzOnOk)="executeDelete()"
        (nzOnCancel)="showDeleteModal = false"
        [nzWidth]="400">
        <ng-container *nzModalContent>
          <p class="delete-text">
            Are you sure you want to delete <strong>{{ deletingUserName }}</strong>?
          </p>
        </ng-container>
      </nz-modal>
    </div>
  `,
  styles: [`
    .users-page { max-width: 960px; margin: 0 auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
    .page-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
    .page-title { margin: 0; font-size: 22px; font-weight: 600; color: #202124; }
    .page-sub { margin: 4px 0 0; font-size: 14px; color: #6b7280; }
    .users-card { border-radius: 2px; border: 1px solid #e0e0e0; }
    .users-card ::ng-deep .ant-card-body { padding: 0; }
    .btn-primary { height: 36px; border-radius: 2px; display: inline-flex; align-items: center; gap: 6px; }
    .user-cell { display: flex; align-items: center; gap: 10px; }
    .user-name { font-size: 14px; font-weight: 500; color: #202124; line-height: 1.3; }
    .system-badge { font-size: 10px; font-weight: 700; color: #1a73e8; background: #e8f0fe; padding: 0 6px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.03em; }
    .login-text { font-family: monospace; font-size: 13px; color: #5f6368; }
    .password-cell { display: flex; align-items: center; gap: 4px; font-family: monospace; font-size: 13px; color: #374151; }
    .eye-btn { color: #9ca3af !important; }
    .eye-btn:hover { color: #1a73e8 !important; }
    .action-btn { color: #1a73e8 !important; font-size: 13px; height: 28px; }
    .action-btn:hover { background: #e8f0fe !important; }
    .edit-btn { color: #1a73e8 !important; }
    .delete-btn { color: #dc2626 !important; }
    .delete-btn:hover { color: #b91c1c !important; }
    .user-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .form-item { display: flex; flex-direction: column; gap: 6px; }
    .form-item label { font-size: 12px; font-weight: 600; color: #5f6368; text-transform: uppercase; letter-spacing: 0.03em; }
    .change-pw-form { display: flex; flex-direction: column; gap: 16px; }
    .change-pw-user { margin: 0; font-size: 14px; color: #5f6368; }
    .pw-error { margin: 0; font-size: 13px; color: #dc2626; }
    .delete-text { font-size: 14px; color: #5f6368; margin: 0; line-height: 1.6; }
  `]
})
export class UserManagementComponent {
  private authService = inject(AuthService);

  users: AppUser[] = [
    { id: 1, name: 'Admin User', login: 'admin', password: 'admin123', role: 'admin', isSystem: true },
    { id: 2, name: 'Driver', login: 'driver', password: 'driver123', role: 'driver', isSystem: true },
    { id: 3, name: 'Operator', login: 'opt', password: 'opt123', role: 'operator', isSystem: true },
  ];

  private nextId = 100;

  visiblePasswords: Record<number, boolean> = {};

  showCreateUserModal = false;
  showEditUserModal = false;
  showDeleteModal = false;
  showChangePasswordModal = false;

  newUser = { name: '', login: '', password: '', role: 'user' };
  editingUser: any = {};
  deletingUserId: number | null = null;
  deletingUserName = '';

  changingPwUser: AppUser | null = null;
  changePwData = { newPassword: '', confirmPassword: '' };
  changePwError = '';

  avatarColor(role: string): string {
    const map: Record<string, string> = { admin: '#1a73e8', driver: '#0d9488', operator: '#7c3aed', user: '#6b7280' };
    return map[role] || '#6b7280';
  }

  tagColor(role: string): string {
    const map: Record<string, string> = { admin: 'purple', driver: 'cyan', operator: 'geekblue', user: 'default' };
    return map[role] || 'default';
  }

  togglePassword(id: number) { this.visiblePasswords[id] = !this.visiblePasswords[id]; }

  openCreateModal() { this.showCreateUserModal = true; }
  closeCreateModal() {
    this.showCreateUserModal = false;
    this.newUser = { name: '', login: '', password: '', role: 'user' };
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.login || !this.newUser.password) return;
    this.users = [...this.users, {
      id: this.nextId++, name: this.newUser.name, login: this.newUser.login,
      password: this.newUser.password, role: this.newUser.role, isSystem: false,
    }];
    this.closeCreateModal();
  }

  openChangePassword(u: AppUser) {
    this.changingPwUser = u;
    this.changePwData = { newPassword: '', confirmPassword: '' };
    this.changePwError = '';
    this.showChangePasswordModal = true;
  }

  closeChangePassword() {
    this.showChangePasswordModal = false;
    this.changingPwUser = null;
  }

  saveChangePassword() {
    this.changePwError = '';
    if (!this.changePwData.newPassword) {
      this.changePwError = 'Password is required.';
      return;
    }
    if (this.changePwData.newPassword !== this.changePwData.confirmPassword) {
      this.changePwError = 'Passwords do not match.';
      return;
    }
    const idx = this.users.findIndex(u => u.id === this.changingPwUser!.id);
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], password: this.changePwData.newPassword };
    }
    this.closeChangePassword();
  }

  editUser(user: any) {
    this.editingUser = { ...user };
    this.showEditUserModal = true;
  }

  closeEditModal() { this.showEditUserModal = false; }

  saveEditUser() {
    const idx = this.users.findIndex(u => u.id === this.editingUser.id);
    if (idx !== -1) {
      const updated = { ...this.editingUser };
      if (!updated.password) {
        updated.password = this.users[idx].password;
      }
      this.users[idx] = updated;
    }
    this.closeEditModal();
  }

  deleteUser(user: AppUser) {
    this.deletingUserId = user.id;
    this.deletingUserName = user.name;
    this.showDeleteModal = true;
  }

  executeDelete() {
    if (this.deletingUserId !== null) {
      this.users = this.users.filter(u => u.id !== this.deletingUserId);
    }
    this.showDeleteModal = false;
    this.deletingUserId = null;
    this.deletingUserName = '';
  }
}
