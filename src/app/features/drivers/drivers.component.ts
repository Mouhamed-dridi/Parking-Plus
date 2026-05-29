import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../core/services/car.service';
import { TrashService } from '../../core/services/trash.service';

interface Driver {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  region: string;
  subRegion: string;
  groups: string[];
  status: 'Active' | 'Inactive';
  carState: 'in road' | 'free' | 'apsnet' | 'blocked';
  phone: string;
  license: string;
  vehicle: string;
  carRefId: string;
  trips: number;
  rating: number;
  checked?: boolean;
}

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [
    CommonModule, NzGridModule, NzButtonModule, NzIconModule, NzTableModule,
    NzAvatarModule, NzTagModule, NzDropDownModule, NzDrawerModule, NzDividerModule,
    NzBadgeModule, NzModalModule, NzInputModule, NzSelectModule, FormsModule
  ],
  template: `
    <div class="page-container">

      <!-- PAGE HEADER -->
      <div class="page-header">
        <div class="title-section">
          <h1>Drivers</h1>
          <span class="count-badge">{{ drivers.length }}</span>
        </div>
        <div class="actions-section">
          <div class="view-toggle">
            <button class="toggle-btn" [class.active]="viewMode === 'list'" (click)="viewMode = 'list'">
              <span nz-icon nzType="bars" nzTheme="outline"></span>
            </button>
            <button class="toggle-btn" [class.active]="viewMode === 'grid'" (click)="viewMode = 'grid'">
              <span nz-icon nzType="appstore" nzTheme="outline"></span>
            </button>
          </div>
          <button nz-button nzType="primary" class="add-btn" (click)="showAddModal()">
            <span nz-icon nzType="plus" nzTheme="outline"></span>
            Add New Driver
          </button>
        </div>
      </div>

      <!--  LIST VIEW  -->
      <div *ngIf="viewMode === 'list'" class="list-view">

        <nz-table #listTable [nzData]="drivers" [nzShowPagination]="true" [nzPageSize]="10" nzSize="middle">
          <thead>
            <tr>
              <th nzWidth="44px">
                <input type="checkbox" class="round-check" />
              </th>
              <th>NAME ↑</th>
              <th>TEL</th>
              <th>LICENCE</th>
              <th>DRIVER ID</th>
              <th>CAR STATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let d of listTable.data" class="table-row" (click)="navigateToProfile(d)">
              <td (click)="$event.stopPropagation()">
                <input type="checkbox" class="round-check" [(ngModel)]="d.checked" />
              </td>
              <td>
                <div class="name-cell">
                  <div class="avatar-wrap">
                    <img class="driver-avatar" [src]="d.avatar" [alt]="d.name" (error)="onAvatarError($event)" />
                  </div>
                  <div>
                    <div class="driver-name">{{ d.name }}</div>
                    <div class="driver-email">{{ d.email }}</div>
                  </div>
                </div>
              </td>
              <td class="tel-cell">{{ d.phone }}</td>
              <td class="licence-cell">{{ d.license }}</td>
              <td>
                <span class="ref-id-badge">{{ d.carRefId }}</span>
              </td>
              <td>
                <span class="car-state-pill" [ngClass]="'state-' + d.carState.replace(' ', '')">
                  <i class="fa-solid fa-circle" style="font-size: 8px; margin-right: 4px;"></i> {{ d.carState }}
                </span>
              </td>
              <td (click)="$event.stopPropagation()">
                <div class="action-btns">
                  <button nz-button nzType="text" nzSize="default" class="act-btn-edit" (click)="navigateToProfile(d)">
                    <span nz-icon nzType="edit"></span>
                  </button>
                  <button nz-button nzType="text" nzSize="default" nzDanger class="act-btn-del" (click)="showDeleteConfirm(d.id)">
                    <span nz-icon nzType="delete"></span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </div>

      <!-- GRID VIEW -->
      <div *ngIf="viewMode === 'grid'" class="grid-view">
        <div nz-row [nzGutter]="[20, 20]">
          <div nz-col nzXs="24" nzSm="12" nzMd="8" nzLg="6" *ngFor="let d of drivers">
            <div class="driver-card" (click)="navigateToProfile(d)">
              <div class="card-top">
                <span class="region-name">{{ d.region }}</span>
                <span class="status-pill" [ngClass]="d.status === 'Active' ? 'pill-active' : 'pill-inactive'">
                  ● {{ d.status }}
                </span>
              </div>
              <div class="card-user">
                <div class="avatar-wrap">
                  <img class="driver-avatar" [src]="d.avatar" [alt]="d.name" (error)="onAvatarError($event)" />
                </div>
                <div>
                  <div class="driver-name">{{ d.name }}</div>
                  <div class="driver-email">{{ d.email }}</div>
                </div>
              </div>

              <div class="card-info-grid">
                <div class="card-info-row">
                  <span class="card-info-icon"><i class="fa-solid fa-phone"></i></span>
                  <div class="card-info-text">
                    <span class="card-info-label">Phone</span>
                    <span class="card-info-val">{{ d.phone }}</span>
                  </div>
                </div>
                <div class="card-info-row">
                  <span class="card-info-icon"><i class="fa-solid fa-id-card"></i></span>
                  <div class="card-info-text">
                    <span class="card-info-label">License</span>
                    <span class="card-info-val">{{ d.license }}</span>
                  </div>
                </div>
                <div class="card-info-row">
                  <span class="card-info-icon"><i class="fa-solid fa-car"></i></span>
                  <div class="card-info-text">
                    <span class="card-info-label">Car Model</span>
                    <span class="card-info-val">{{ d.vehicle }}</span>
                  </div>
                </div>
                <div class="card-info-row">
                  <span class="card-info-icon"><i class="fa-solid fa-tag"></i></span>
                  <div class="card-info-text">
                    <span class="card-info-label">Car Ref ID</span>
                    <span class="card-info-val ref-id">{{ d.carRefId }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- DRIVER DETAIL DRAWER -->
    <nz-drawer
      [nzVisible]="drawerOpen"
      nzPlacement="right"
      [nzWidth]="420"
      nzTitle=""
      (nzOnClose)="drawerOpen = false"
      [nzClosable]="false">

      <ng-container *nzDrawerContent>
        <div *ngIf="selectedDriver" class="drawer-content">

          <!-- Close btn -->
          <button class="drawer-close" (click)="drawerOpen = false">
            <span nz-icon nzType="close"></span>
          </button>

          <!-- Profile header -->
          <div class="drawer-profile">
            <div class="drawer-avatar-wrap">
              <img class="drawer-avatar" [src]="selectedDriver.avatar" [alt]="selectedDriver.name" (error)="onAvatarError($event)" />
              <span class="drawer-status-dot" [ngClass]="selectedDriver.status === 'Active' ? 'dot-active' : 'dot-inactive'"></span>
            </div>
            <h2 class="drawer-name">{{ selectedDriver.name }}</h2>
            <p class="drawer-role">{{ selectedDriver.role }}</p>
            <span class="status-pill" [ngClass]="selectedDriver.status === 'Active' ? 'pill-active' : 'pill-inactive'">
              ● {{ selectedDriver.status }}
            </span>
          </div>

          <nz-divider></nz-divider>

          <!-- Info grid -->
          <div class="drawer-info-grid">
            <div class="info-row">
              <span nz-icon nzType="mail" nzTheme="outline" class="info-icon"></span>
              <div>
                <div class="info-label">Email</div>
                <div class="info-val">{{ selectedDriver.email }}</div>
              </div>
            </div>
            <div class="info-row">
              <span nz-icon nzType="phone" nzTheme="outline" class="info-icon"></span>
              <div>
                <div class="info-label">Phone</div>
                <div class="info-val">{{ selectedDriver.phone }}</div>
              </div>
            </div>
            <div class="info-row">
              <span nz-icon nzType="idcard" nzTheme="outline" class="info-icon"></span>
              <div>
                <div class="info-label">License</div>
                <div class="info-val">{{ selectedDriver.license }}</div>
              </div>
            </div>
            <div class="info-row">
              <span nz-icon nzType="car" nzTheme="outline" class="info-icon"></span>
              <div>
                <div class="info-label">Assigned Vehicle</div>
                <div class="info-val">{{ selectedDriver.vehicle }}</div>
              </div>
            </div>
            <div class="info-row">
              <span nz-icon nzType="environment" nzTheme="outline" class="info-icon"></span>
              <div>
                <div class="info-label">Region</div>
                <div class="info-val">{{ selectedDriver.region }} — {{ selectedDriver.subRegion }}</div>
              </div>
            </div>
          </div>

          <nz-divider></nz-divider>

          <!-- Stats row -->
          <div class="drawer-stats">
            <div class="stat-box">
              <div class="stat-val">{{ selectedDriver.trips }}</div>
              <div class="stat-lbl">Total Trips</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">{{ selectedDriver.rating }} ★</div>
              <div class="stat-lbl">Rating</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">{{ selectedDriver.groups.length }}</div>
              <div class="stat-lbl">Groups</div>
            </div>
          </div>

          <nz-divider></nz-divider>

          <!-- Groups -->
          <div class="drawer-groups">
            <div class="info-label" style="margin-bottom: 10px;">Groups</div>
            <div class="groups-row">
              <span *ngFor="let g of selectedDriver.groups" class="group-tag">{{ g }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="drawer-actions">
            <button nz-button nzType="primary" class="drawer-btn-primary" (click)="navigateToProfile(selectedDriver)">
              <span nz-icon nzType="edit"></span> Edit Driver
            </button>
            <button nz-button nzType="default" nzDanger class="drawer-btn-danger">
              <span nz-icon nzType="delete"></span> Remove
            </button>
          </div>

        </div>
      </ng-container>
    </nz-drawer>

    <!-- ADD DRIVER MODAL -->
    <nz-modal
      [(nzVisible)]="isAddModalVisible"
      nzTitle="Add New Driver"
      (nzOnCancel)="handleCancel()"
      (nzOnOk)="handleOk()"
      [nzFooter]="modalFooter"
      [nzWidth]="620">
      <ng-container *nzModalContent>
        <div class="add-driver-form">
          <!-- Profile Pic at Top -->
          <div class="profile-upload-section">
            <div class="upload-avatar-wrap">
              <img [src]="newDriver.avatar" class="upload-preview" />
              <div class="upload-overlay" (click)="fileInput.click()">
                <span nz-icon nzType="camera" nzTheme="outline"></span>
                <span>Change</span>
              </div>
            </div>
            <input #fileInput type="file" (change)="onFileSelected($event)" style="display: none" accept="image/*" />
            <p class="upload-hint">Up to 2MB, JPG/PNG</p>
          </div>

          <div class="form-grid">
            <div class="form-item">
              <label>Full Name</label>
              <input nz-input placeholder="e.g. Ahmed Benali" [(ngModel)]="newDriver.name" />
            </div>
            <div class="form-item">
              <label>Email Address</label>
              <input nz-input placeholder="e.g. ahmed@parkplus.com" [(ngModel)]="newDriver.email" />
            </div>
            <div class="form-item">
              <label>Phone Number</label>
              <input nz-input placeholder="e.g. +1 555 000 000" [(ngModel)]="newDriver.phone" />
            </div>
            <div class="form-item">
              <label>License ID</label>
              <input nz-input placeholder="e.g. DL-2024-NY-001" [(ngModel)]="newDriver.license" />
            </div>
            <div class="form-item">
              <label>Car Model</label>
              <nz-select [(ngModel)]="newDriver.vehicle" nzPlaceHolder="Select a car" style="width:100%;">
                <nz-option *ngFor="let c of allCars" [nzLabel]="c.name" [nzValue]="c.name"></nz-option>
              </nz-select>
            </div>
            <div class="form-item">
              <label>Car Ref ID</label>
              <input nz-input placeholder="e.g. CAR-NY-0012" [(ngModel)]="newDriver.carRefId" />
            </div>
            <div class="form-item">
              <label>Region</label>
              <nz-select [(ngModel)]="newDriver.region" nzPlaceHolder="Select a region" style="width:100%;">
                <nz-option *ngFor="let r of tunisianRegions" [nzLabel]="r" [nzValue]="r"></nz-option>
              </nz-select>
            </div>
            <div class="form-item">
              <label>CIN</label>
              <input nz-input placeholder="e.g. 12345678" [(ngModel)]="newDriver.subRegion" />
            </div>
          </div>
        </div>
      </ng-container>

      <ng-template #modalFooter>
        <button nz-button nzType="default" (click)="handleCancel()">Cancel</button>
        <button nz-button nzType="primary" (click)="handleOk()" [disabled]="!newDriver.name || !newDriver.email">
          Create Driver
        </button>
      </ng-template>
    </nz-modal>

    <!-- DELETE CONFIRMATION MODAL -->
    <nz-modal
      [(nzVisible)]="showDeleteModal"
      nzTitle="Delete Driver"
      (nzOnCancel)="showDeleteModal = false"
      [nzFooter]="deleteModalFooter"
      [nzWidth]="400">
      <ng-container *nzModalContent>
        <p>Are you sure you want to delete this driver? This action cannot be undone.</p>
      </ng-container>
      <ng-template #deleteModalFooter>
        <button nz-button nzType="default" (click)="showDeleteModal = false">Cancel</button>
        <button nz-button nzType="primary" nzDanger (click)="confirmDelete()">Delete</button>
      </ng-template>
    </nz-modal>

  `,
  styles: [`
    .page-container {
      background: #f8fafc;
      min-height: 100%;
    }

    /* HEADER */
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
    }
    .title-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .title-section h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
    }
    .count-badge {
      background: #e2e8f0;
      color: #64748b;
      padding: 2px 9px;
      border-radius: 10px;
      font-size: 12px;
      font-weight: 600;
    }
    .actions-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .view-toggle {
      display: flex;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 3px;
      gap: 2px;
    }
    .toggle-btn {
      border: none;
      background: transparent;
      border-radius: 6px;
      width: 36px;
      height: 32px;
      cursor: pointer;
      color: #94a3b8;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .toggle-btn.active {
      background: #f1f5f9;
      color: #334155;
    }
    .add-btn {
      height: 38px;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      background: #2563eb;
      border-color: #2563eb;
    }
    .add-btn:hover { background: #1d4ed8 !important; border-color: #1d4ed8 !important; }

    /* AVATAR */
    .avatar-wrap {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: #e2e8f0;
    }
    .driver-avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .driver-name {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }
    .driver-email {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 1px;
    }

    /* STATUS PILLS */
    .status-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 12px;
      white-space: nowrap;
    }
    .pill-active { background: #fef9c3; color: #b45309; }
    .pill-inactive { background: #fee2e2; color: #b91c1c; }

    /* ROLE DOT */
    .role-label { font-weight: 600; color: #475569; font-size: 13px; }

    .tel-cell, .licence-cell {
      color: #334155;
      font-size: 13px;
      font-weight: 500;
    }

    .ref-id-badge {
      font-family: monospace;
      background: #eff6ff;
      color: #2563eb;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    /* CAR STATE PILLS */
    .car-state-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      white-space: nowrap;
      text-transform: capitalize;
    }
    .state-inroad { background: #dbeafe; color: #1e40af; }
    .state-free { background: #dcfce7; color: #166534; }
    .state-apsnet { background: #f1f5f9; color: #475569; }
    .state-blocked { background: #fee2e2; color: #991b1b; }


    /* LIST VIEW */
    .list-view {
      background: white;
      border-radius: 12px;
      padding: 0 8px 8px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }
    .list-view ::ng-deep .ant-table-thead > tr > th {
      background: white;
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      border-bottom: 1px solid #f1f5f9;
      padding: 14px 12px;
    }
    .list-view ::ng-deep .ant-table-tbody > tr > td {
      padding: 14px 12px;
      border-bottom: 1px solid #f8fafc;
    }
    .table-row { cursor: pointer; transition: background 0.15s; }
    .table-row:hover ::ng-deep td { background: #f8fafc !important; }

    .name-cell { display: flex; align-items: center; gap: 12px; }
    .groups-cell { color: #64748b; font-size: 13px; }
    .action-btns { display: flex; gap: 4px; align-items: center; }
    .act-btn-edit { color: #64748b; padding: 0 8px; }
    .act-btn-edit:hover { color: #2563eb; background: #eff6ff !important; }
    .act-btn-del { padding: 0 8px; }
    .act-btn-del:hover { background: #fee2e2 !important; }


    .round-check {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      accent-color: #2563eb;
      cursor: pointer;
    }

    /* GRID VIEW */
    .grid-view { }
    .driver-card {
      background: white;
      border-radius: 14px;
      padding: 20px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 1px 4px rgba(0,0,0,0.03);
      cursor: pointer;
      transition: all 0.2s;
    }
    .driver-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.08);
      transform: translateY(-2px);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .region-name { font-size: 16px; font-weight: 700; color: #1e293b; }
    .card-user { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .card-location { display: flex; gap: 28px; margin-bottom: 20px; }
    .loc-block { display: flex; flex-direction: column; gap: 3px; }
    .loc-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.5px; }
    .loc-value { font-size: 13px; font-weight: 600; color: #334155; }
    /* CARD INFO GRID */
    .card-info-grid {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 16px;
      padding: 12px 14px;
      background: #f8fafc;
      border-radius: 10px;
      border: 1px solid #f1f5f9;
    }
    .card-info-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-info-icon {
      font-size: 13px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: white;
      color: #3b82f6;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      flex-shrink: 0;
    }

    .card-info-text {
      display: flex;
      align-items: baseline;
      gap: 6px;
      min-width: 0;
    }
    .card-info-label {
      font-size: 10px;
      color: #94a3b8;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .card-info-val {
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ref-id {
      font-family: monospace;
      background: #eff6ff;
      color: #2563eb;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 11px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #e2e8f0;
      padding-top: 12px;
    }
    .card-location-inline {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
    }
    .loc-sep { color: #cbd5e1; font-size: 12px; }
    .more-btn { color: #94a3b8; }
    .more-btn:hover { color: #334155; background: #f1f5f9 !important; }

    /* DRAWER */
    .drawer-content { 
      padding: 8px 4px;
      position: relative;
    }
    .drawer-close {
      position: absolute;
      top: 0;
      right: 0;
      border: none;
      background: #f1f5f9;
      border-radius: 8px;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #64748b;
      font-size: 14px;
    }
    .drawer-close:hover { background: #e2e8f0; color: #1e293b; }

    .drawer-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 16px 0;
      gap: 8px;
    }
    .drawer-avatar-wrap {
      position: relative;
      width: 90px;
      height: 90px;
      margin-bottom: 6px;
    }
    .drawer-avatar {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      border: 3px solid white;
    }
    .drawer-status-dot {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
    }
    .dot-active { background: #22c55e; }
    .dot-inactive { background: #ef4444; }
    .drawer-name { margin: 0; font-size: 20px; font-weight: 700; color: #0f172a; }
    .drawer-role { margin: 0; font-size: 13px; color: #64748b; font-weight: 500; }

    .drawer-info-grid { display: flex; flex-direction: column; gap: 16px; padding: 4px 0; }
    .info-row { display: flex; align-items: flex-start; gap: 14px; }
    .info-icon { font-size: 18px; color: #2563eb; margin-top: 2px; }
    .info-label { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 600; letter-spacing: 0.5px; }
    .info-val { font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 2px; }

    .drawer-stats {
      display: flex;
      justify-content: space-around;
      text-align: center;
      padding: 8px 0;
    }
    .stat-box { }
    .stat-val { font-size: 22px; font-weight: 700; color: #0f172a; }
    .stat-lbl { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }

    .drawer-groups { padding: 4px 0; }
    .groups-row { display: flex; flex-wrap: wrap; gap: 8px; }
    .group-tag {
      background: #eff6ff;
      color: #2563eb;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .drawer-actions {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .drawer-btn-primary {
      flex: 1;
      height: 40px;
      border-radius: 8px;
      background: #2563eb;
      border-color: #2563eb;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .drawer-btn-danger {
      flex: 1;
      height: 40px;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    /* ADD MODAL STYLES */
    .add-driver-form {
      padding: 10px 0;
    }
    .profile-upload-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }
    .upload-avatar-wrap {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      border: 4px solid #f1f5f9;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      cursor: pointer;
    }
    .upload-preview {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .upload-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      opacity: 0;
      transition: opacity 0.2s;
      gap: 4px;
      font-size: 13px;
      font-weight: 500;
    }
    .upload-avatar-wrap:hover .upload-overlay {
      opacity: 1;
    }
    .upload-hint {
      margin-top: 10px;
      color: #94a3b8;
      font-size: 11px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
    .form-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-item label {
      font-size: 12px;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .form-item input {
      height: 40px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      font-size: 14px;
    }
    .form-item input:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37,99,235,0.1);
    }
    .form-item ::ng-deep .ant-select-selector {
      height: 40px !important;
      border-radius: 8px !important;
      border-color: #e2e8f0 !important;
    }
    .form-item ::ng-deep .ant-select-selection-item {
      line-height: 40px !important;
    }
  `]
})
export class DriversComponent {
  private router = inject(Router);
  private carService = inject(CarService);
  private trashService = inject(TrashService);

  viewMode: 'list' | 'grid' = 'grid';
  drawerOpen = false;
  selectedDriver: Driver | null = null;

  allCars = this.carService.getCars();

  tunisianRegions = [
    'Tunis', 'Sfax', 'Sousse', 'Nabeul', 'Gabès',
    'Bizerte', 'Kairouan', 'Monastir', 'Médenine', 'Kasserine'
  ];

  showDeleteModal = false;
  deleteTargetId: number | null = null;

  showDeleteConfirm(id: number): void {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.deleteTargetId !== null) {
      const driver = this.drivers.find(d => d.id === this.deleteTargetId);
      if (driver) {
        this.trashService.addItem({
          id: 'driver-' + driver.id,
          type: 'driver',
          name: driver.name,
          data: { ...driver },
          deletedAt: new Date()
        });
      }
      this.drivers = this.drivers.filter(d => d.id !== this.deleteTargetId);
    }
    this.showDeleteModal = false;
    this.deleteTargetId = null;
  }

  navigateToProfile(driver: Driver | null) {
    if (driver) {
      this.router.navigate(['/drivers', driver.id]);
    }
  }

  // Add Modal State
  isAddModalVisible = false;
  newDriver: Partial<Driver> = this.getDefaultNewDriver();

  getDefaultNewDriver(): Partial<Driver> {
    return {
      name: '',
      email: '',
      avatar: '/images/drivers/Ahmed.jpg',
      role: 'Driver',
      region: '',
      subRegion: '',
      groups: ['Falcons'],
      status: 'Active',
      carState: 'free',
      phone: '',
      license: '',
      vehicle: '',
      carRefId: '',
      trips: 0,
      rating: 5.0
    };
  }

  showAddModal() {
    this.isAddModalVisible = true;
    this.newDriver = this.getDefaultNewDriver();
  }

  handleCancel() {
    this.isAddModalVisible = false;
  }

  handleOk() {
    if (this.newDriver.name && this.newDriver.email) {
      const driver: Driver = {
        ...this.newDriver as Driver,
        id: this.drivers.length + 1
      };
      this.drivers = [driver, ...this.drivers];
      this.isAddModalVisible = false;
    }
  }

  /* 
    Task Tracking:
    - [x] Add `NzModalModule` to `imports` in `DriversComponent`
    - [x] Add state variables for modal visibility and new driver data
    - [x] Implement `showAddModal()`, `handleCancel()`, and `handleOk()` methods
    - [x] Update template with `nz-modal` and form structure
    - [x] Implement profile image upload/preview at the top of the form
    - [x] Add CSS styles for the modal and form fields
    - [x] Verify new driver addition in both List and Grid views
  */

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newDriver.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  drivers: Driver[] = [
    {
      id: 1,
      name: 'Ahmed Benali',
      email: 'ahmed.benali@parkplus.com',
      avatar: '/images/drivers/Ahmed.jpg',
      role: 'Super Admin',
      region: 'NewYork',
      subRegion: 'West Bay',
      groups: ['Falcons', 'Stallions'],
      status: 'Active',
      carState: 'in road',
      phone: '+1 555 001 002',
      license: 'DL-2024-NY-001',
      vehicle: 'Isuzu D-Max',
      carRefId: 'CAR-NY-0012',
      trips: 312,
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sami Khaled',
      email: 'sami.khaled@parkplus.com',
      avatar: '/images/drivers/Sami.jpg',
      role: 'Admin',
      region: 'California',
      subRegion: 'Delaware',
      groups: ['Falcons'],
      status: 'Inactive',
      carState: 'free',
      phone: '+1 555 002 003',
      license: 'DL-2024-CA-002',
      vehicle: 'Ford Ranger',
      carRefId: 'CAR-CA-0034',
      trips: 198,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Yassine Morati',
      email: 'yassine.morati@parkplus.com',
      avatar: '/images/drivers/Yassine.jpg',
      role: 'Supervisor',
      region: 'New Jersey',
      subRegion: 'Maryland',
      groups: ['Falcons', 'Stallions'],
      status: 'Active',
      carState: 'in road',
      phone: '+1 555 003 004',
      license: 'DL-2024-NJ-003',
      vehicle: 'Toyota Hilux',
      carRefId: 'CAR-NJ-0056',
      trips: 254,
      rating: 4.8
    },
    {
      id: 4,
      name: 'Youssef Amrani',
      email: 'youssef.amrani@parkplus.com',
      avatar: '/images/drivers/Youssef.jpg',
      role: 'Regional Manager',
      region: 'Chicago',
      subRegion: 'West Bay',
      groups: ['Stallions'],
      status: 'Active',
      carState: 'apsnet',
      phone: '+1 555 004 005',
      license: 'DL-2024-IL-004',
      vehicle: 'Mercedes J Class',
      carRefId: 'CAR-IL-0078',
      trips: 421,
      rating: 4.95
    },
    {
      id: 5,
      name: 'Ahmed El Fassi',
      email: 'ahmed.elfassi@parkplus.com',
      avatar: '/images/drivers/Ahmed.jpg',
      role: 'Contributor',
      region: 'Texas',
      subRegion: 'West Bay',
      groups: ['Falcons'],
      status: 'Active',
      carState: 'free',
      phone: '+1 555 005 006',
      license: 'DL-2024-TX-005',
      vehicle: 'Blue Audi (PSD)',
      carRefId: 'CAR-TX-0091',
      trips: 87,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Sami Driss',
      email: 'sami.driss@parkplus.com',
      avatar: '/images/drivers/Sami.jpg',
      role: 'Client',
      region: 'Washington',
      subRegion: 'Massachusetts',
      groups: ['Falcons', 'Stallions'],
      status: 'Inactive',
      carState: 'blocked',
      phone: '+1 555 006 007',
      license: 'DL-2024-WA-006',
      vehicle: 'Bentley',
      carRefId: 'CAR-WA-0103',
      trips: 44,
      rating: 4.3
    },
    {
      id: 7,
      name: 'Yassine Tachfine',
      email: 'yassine.tach@parkplus.com',
      avatar: '/images/drivers/Yassine.jpg',
      role: 'Country Manager',
      region: 'Virginia',
      subRegion: 'West Virginia',
      groups: ['Stallions'],
      status: 'Inactive',
      carState: 'free',
      phone: '+1 555 007 008',
      license: 'DL-2024-VA-007',
      vehicle: 'Peugeot Partner',
      carRefId: 'CAR-VA-0117',
      trips: 163,
      rating: 4.5
    },
    {
      id: 8,
      name: 'Youssef Bennis',
      email: 'youssef.bennis@parkplus.com',
      avatar: '/images/drivers/Youssef.jpg',
      role: 'Continent Manager',
      region: 'Alaska',
      subRegion: 'Alabama',
      groups: ['Falcons', 'Stallions'],
      status: 'Active',
      carState: 'in road',
      phone: '+1 555 008 009',
      license: 'DL-2024-AK-008',
      vehicle: 'VW Caddy',
      carRefId: 'CAR-AK-0129',
      trips: 509,
      rating: 4.85
    }
  ];

  openDriver(d: Driver) {
    this.selectedDriver = d;
    this.drawerOpen = true;
  }

  onAvatarError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://randomuser.me/api/portraits/men/32.jpg';
  }

  getRoleDot(role: string): string {
    const r = role.toLowerCase();
    if (r.includes('super')) return 'dot-super';
    if (r.includes('admin')) return 'dot-admin';
    if (r.includes('contributor')) return 'dot-contributor';
    if (r.includes('supervisor')) return 'dot-supervisor';
    if (r.includes('client')) return 'dot-client';
    if (r.includes('sales')) return 'dot-sales';
    return 'dot-manager';
  }
}
