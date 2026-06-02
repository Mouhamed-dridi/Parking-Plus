import { Component } from '@angular/core';
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

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzCardModule, NzSelectModule, NzButtonModule,
    NzIconModule, NzTableModule, NzTagModule, NzModalModule, NzInputModule
  ],
  template: `
    <div class="users-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">User Management</h1>
          <p class="page-sub">{{ users.length }} users in your team</p>
        </div>
        <button nz-button nzType="primary" class="btn-primary" (click)="showCreateUserModal = true">
          <span nz-icon nzType="user-add" nzTheme="outline"></span>
          Create User
        </button>
      </div>

      <nz-card class="users-card" nzTitle="Users">
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

      <!-- DELETE USER CONFIRMATION MODAL -->
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
          <p style="font-size:14px;color:#5f6368;margin:0;line-height:1.6;">
            Are you sure you want to delete <strong>{{ deletingUserName }}</strong>?
          </p>
        </ng-container>
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
    .users-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .page-title {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      color: #202124;
    }
    .page-sub {
      margin: 4px 0 0;
      font-size: 14px;
      color: #6b7280;
    }
    .users-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      border: 1px solid #f0f0f0;
    }
    .users-card ::ng-deep .ant-card-head {
      border-bottom: 1px solid #f5f5f5;
      padding: 16px 24px;
      min-height: auto;
    }
    .users-card ::ng-deep .ant-card-head-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }
    .users-card ::ng-deep .ant-card-body {
      padding: 20px 24px;
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
    .edit-btn { color: #6366f1 !important; }
    .delete-btn { color: #dc2626 !important; }
    .delete-btn:hover { color: #b91c1c !important; }
  `]
})
export class UserManagementComponent {
  users = [
    { id: 1, name: 'Admin User', login: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Regular User', login: 'user', password: 'user123', role: 'user' }
  ];

  visiblePasswords: Record<number, boolean> = {};

  showCreateUserModal = false;
  showEditUserModal = false;
  showDeleteModal = false;

  newUser = { name: '', login: '', password: '', role: 'user' };
  editingUser: any = {};
  deletingUserId: number | null = null;
  deletingUserName = '';

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
    const user = this.users.find(u => u.id === id);
    if (user) {
      this.deletingUserId = id;
      this.deletingUserName = user.name;
      this.showDeleteModal = true;
    }
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
