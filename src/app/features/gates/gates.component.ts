import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';

let nextId = 1;
function genId(): string { return 'gate-' + (nextId++); }

type VehicleType = 'Car' | 'Delivery' | 'Used';
type DriverType = 'Internal' | 'External';
type Movement = 'Entry' | 'Exit';

interface GateRecord {
  id: string;
  vehicleType: VehicleType;
  seriesId: string;
  driverCid: string;
  driverName: string;
  date: Date;
  time: string;
  driverType: DriverType;
  movement: Movement;
}

@Component({
  selector: 'app-gates',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    NzTableModule, NzButtonModule, NzIconModule, NzModalModule,
    NzSelectModule, NzDatePickerModule, NzInputModule, NzTagModule,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="title-section">
          <h1>Gates</h1>
          <span class="count-badge">{{ records.length }}</span>
        </div>
        <button nz-button nzType="primary" class="create-btn" (click)="showCreateModal = true">
          <span nz-icon nzType="plus" nzTheme="outline"></span> Create Movement
        </button>
      </div>

      <div class="table-card">
        <nz-table #gateTable [nzData]="records" [nzPageSize]="10" nzSize="middle">
          <thead>
            <tr>
              <th>Vehicle Type</th>
              <th>Series ID</th>
              <th>Driver CID</th>
              <th>Driver Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Driver Type</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of gateTable.data">
              <td>
                <span class="vehicle-tag" [class]="'vt-' + r.vehicleType.toLowerCase()">{{ r.vehicleType }}</span>
              </td>
              <td>{{ r.seriesId }}</td>
              <td>{{ r.driverCid }}</td>
              <td>{{ r.driverName }}</td>
              <td>{{ r.date | date:'dd/MM/yyyy' }}</td>
              <td>{{ r.time }}</td>
              <td>
                <span class="driver-type-tag" [class]="'dt-' + r.driverType.toLowerCase()">{{ r.driverType }}</span>
              </td>
              <td>
                <span class="movement-tag" [class]="'movement-' + r.movement.toLowerCase()">{{ r.movement }}</span>
              </td>
            </tr>
          </tbody>
        </nz-table>
      </div>
    </div>

    <nz-modal
      [(nzVisible)]="showCreateModal"
      nzTitle="Create Movement"
      (nzOnCancel)="closeModal()"
      (nzOnOk)="submitForm()"
      [nzOkText]="'Create'"
      [nzOkDisabled]="!isFormValid()">
      <ng-container *nzModalContent>
        <div class="modal-form">
          <div class="form-row">
            <div class="form-item">
              <label>Vehicle Type</label>
              <nz-select [(ngModel)]="form.vehicleType" nzPlaceHolder="Select type">
                <nz-option nzValue="Car" nzLabel="Car"></nz-option>
                <nz-option nzValue="Delivery" nzLabel="Delivery"></nz-option>
                <nz-option nzValue="Used" nzLabel="Used"></nz-option>
              </nz-select>
            </div>
            <div class="form-item">
              <label>Series ID</label>
              <input nz-input [(ngModel)]="form.seriesId" placeholder="e.g. 666 TU 3389" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label>Driver CID</label>
              <input nz-input [(ngModel)]="form.driverCid" placeholder="National ID" />
            </div>
            <div class="form-item">
              <label>Driver Name</label>
              <input nz-input [(ngModel)]="form.driverName" placeholder="Full name" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label>Date</label>
              <nz-date-picker [(ngModel)]="form.date" style="width: 100%"></nz-date-picker>
            </div>
            <div class="form-item">
              <label>Time</label>
              <nz-select [(ngModel)]="form.time" nzPlaceHolder="Select time">
                <nz-option *ngFor="let t of timeSlots" [nzValue]="t" [nzLabel]="t"></nz-option>
              </nz-select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-item">
              <label>Driver Type</label>
              <nz-select [(ngModel)]="form.driverType" nzPlaceHolder="Select type">
                <nz-option nzValue="Internal" nzLabel="Internal"></nz-option>
                <nz-option nzValue="External" nzLabel="External"></nz-option>
              </nz-select>
            </div>
            <div class="form-item">
              <label>Movement</label>
              <nz-select [(ngModel)]="form.movement" nzPlaceHolder="Entry or Exit">
                <nz-option nzValue="Entry" nzLabel="Entry"></nz-option>
                <nz-option nzValue="Exit" nzLabel="Exit"></nz-option>
              </nz-select>
            </div>
          </div>
        </div>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .page-container {
      padding: 24px; max-width: 1200px; margin: 0 auto;
    }
    .page-header {
      display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
    }
    .title-section {
      display: flex; align-items: center; gap: 12px;
    }
    .title-section h1 {
      font-size: 22px; font-weight: 600; color: #202124; margin: 0;
    }
    .count-badge {
      background: #e8f0fe; color: #1a73e8; font-size: 13px; font-weight: 600;
      padding: 2px 10px; border-radius: 12px;
    }
    .create-btn {
      height: 36px; border-radius: 2px;
    }
    .table-card {
      background: #fff; border: 1px solid #e0e0e0; border-radius: 2px;
    }
    .vehicle-tag {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 600;
    }
    .vt-car { background: #e0e7ff; color: #4338ca; }
    .vt-delivery { background: #fef3c7; color: #b45309; }
    .vt-used { background: #d1fae5; color: #065f46; }
    .driver-type-tag {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 600;
    }
    .dt-internal { background: #dbeafe; color: #1e40af; }
    .dt-external { background: #f3e8ff; color: #6b21a8; }
    .movement-tag {
      display: inline-block; padding: 2px 10px; border-radius: 12px;
      font-size: 12px; font-weight: 600;
    }
    .movement-entry { background: #d1fae5; color: #065f46; }
    .movement-exit { background: #fee2e2; color: #b91c1c; }
    .modal-form {
      display: flex; flex-direction: column; gap: 16px;
    }
    .form-row {
      display: flex; gap: 16px;
    }
    .form-item {
      flex: 1; display: flex; flex-direction: column; gap: 6px;
    }
    .form-item label {
      font-size: 13px; font-weight: 600; color: #374151;
    }
    @media (max-width: 768px) {
      .form-row { flex-direction: column; }
    }
  `]
})
export class GatesComponent {
  showCreateModal = false;

  timeSlots: string[] = [];
  records: GateRecord[] = [];

  form: {
    vehicleType: VehicleType | null;
    seriesId: string;
    driverCid: string;
    driverName: string;
    date: Date | null;
    time: string;
    driverType: DriverType | null;
    movement: Movement | null;
  };

  constructor() {
    this.timeSlots = this.generateTimeSlots();
    this.form = this.emptyForm();

    const today = new Date();
    this.records = [
      {
        id: genId(), vehicleType: 'Car', seriesId: '666 TU 3389',
        driverCid: '12345678', driverName: 'Ahmed Benali',
        date: today, time: '08:15', driverType: 'Internal', movement: 'Entry',
      },
      {
        id: genId(), vehicleType: 'Delivery', seriesId: '555 TU 1245',
        driverCid: '23456789', driverName: 'Sami Khaled',
        date: today, time: '09:30', driverType: 'Internal', movement: 'Entry',
      },
      {
        id: genId(), vehicleType: 'Used', seriesId: '901 TU 2356',
        driverCid: '34567890', driverName: 'Yassine Morati',
        date: today, time: '10:00', driverType: 'External', movement: 'Entry',
      },
      {
        id: genId(), vehicleType: 'Car', seriesId: '789 TU 4532',
        driverCid: '45678901', driverName: 'Fares Ben Amor',
        date: today, time: '16:45', driverType: 'Internal', movement: 'Exit',
      },
    ];
  }

  private generateTimeSlots(): string[] {
    const slots: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 15) {
        slots.push(
          String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0')
        );
      }
    }
    return slots;
  }

  private emptyForm() {
    return {
      vehicleType: null as VehicleType | null,
      seriesId: '', driverCid: '', driverName: '',
      date: null as Date | null, time: '',
      driverType: null as DriverType | null,
      movement: null as Movement | null,
    };
  }

  isFormValid(): boolean {
    return !!this.form.vehicleType && !!this.form.seriesId
      && !!this.form.driverCid && !!this.form.driverName
      && !!this.form.date && !!this.form.time
      && !!this.form.driverType && !!this.form.movement;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.form = this.emptyForm();
  }

  submitForm(): void {
    if (!this.isFormValid()) return;
    this.records.unshift({
      id: genId(),
      vehicleType: this.form.vehicleType!,
      seriesId: this.form.seriesId,
      driverCid: this.form.driverCid,
      driverName: this.form.driverName,
      date: this.form.date!,
      time: this.form.time,
      driverType: this.form.driverType!,
      movement: this.form.movement!,
    });
    this.closeModal();
  }
}
