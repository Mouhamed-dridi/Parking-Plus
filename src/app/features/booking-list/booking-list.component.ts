import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { BookingService, Booking } from '../../core/services/booking.service';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, NzGridModule, NzButtonModule, NzIconModule, NzTableModule, NzTagModule, NzTypographyModule],
  template: `
    <div class="page-header">
      <div class="header-titles">
        <h1 nz-typography>Booking List</h1>
        <p nz-typography class="subtitle">View and export all vehicle booking requests</p>
      </div>
      <div class="header-actions">
        <button nz-button nzType="default" class="export-btn" (click)="exportToExcel()" [disabled]="bookings.length === 0">
          <span nz-icon nzType="file-excel" nzTheme="outline"></span>
          Export to Excel
        </button>
      </div>
    </div>

    <div class="table-container">
      <nz-table #bookingTable [nzData]="bookings" [nzShowPagination]="true" [nzPageSize]="10" nzSize="middle">
        <thead>
          <tr>
            <th nzWidth="100px">REF ID</th>
            <th>REQUESTER</th>
            <th>DEPARTMENT</th>
            <th>VEHICLE</th>
            <th>ROUTE</th>
            <th>DEPARTURE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let b of bookingTable.data">
            <td>
              <span class="ref-badge">{{ b.refId }}</span>
            </td>
            <td>
              <div class="requester-cell">
                <div class="requester-name">{{ b.name }}</div>
                <div class="requester-email">{{ b.email }}</div>
              </div>
            </td>
            <td>{{ b.department }}</td>
            <td>
              <div class="vehicle-cell">
                <div class="vehicle-name">{{ b.vehicleName }}</div>
                <div class="vehicle-type">{{ b.vehicleType }}</div>
              </div>
            </td>
            <td>
              <span class="route-text">{{ b.source }} ➔ {{ b.destination }}</span>
            </td>
            <td>{{ formatDate(b.departureTime) }}</td>
            <td>
              <nz-tag [nzColor]="'green'">Completed</nz-tag>
            </td>
          </tr>
        </tbody>
      </nz-table>

      <div class="empty-state" *ngIf="bookings.length === 0">
        <span nz-icon nzType="calendar" nzTheme="outline" class="empty-icon"></span>
        <p>No bookings yet</p>
        <p class="empty-sub">Bookings will appear here after completing a vehicle request</p>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    h1 {
      font-size: 32px;
      margin: 0;
      color: var(--text-dark);
      font-weight: 600;
      letter-spacing: -0.5px;
    }

    .subtitle {
      color: #9ca3af;
      margin: 8px 0 0 0;
      font-size: 14px;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .export-btn {
      border-radius: 8px;
      height: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #16a34a;
      border-color: #bbf7d0;
    }
    .export-btn:hover {
      color: #15803d !important;
      border-color: #86efac !important;
    }

    .table-container {
      background: white;
      border-radius: 16px;
      padding: 32px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .ref-badge {
      background: #f0fdf4;
      color: #16a34a;
      padding: 4px 10px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
    }

    .requester-cell {
      display: flex;
      flex-direction: column;
    }
    .requester-name {
      font-weight: 600;
      color: #111827;
    }
    .requester-email {
      font-size: 12px;
      color: #6b7280;
    }

    .vehicle-cell {
      display: flex;
      flex-direction: column;
    }
    .vehicle-name {
      font-weight: 600;
      color: #111827;
    }
    .vehicle-type {
      font-size: 12px;
      color: #6b7280;
    }

    .route-text {
      color: #374151;
      font-weight: 500;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }
    .empty-icon {
      font-size: 48px;
      color: #d1d5db;
      margin-bottom: 16px;
    }
    .empty-state p {
      color: #6b7280;
      font-size: 16px;
      margin: 8px 0;
    }
    .empty-sub {
      font-size: 14px !important;
      color: #9ca3af !important;
    }
  `]
})
export class BookingListComponent implements OnInit {
  private bookingService = inject(BookingService);

  bookings: Booking[] = [];

  ngOnInit() {
    this.bookings = this.bookingService.getBookings();
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  exportToExcel(): void {
    const headers = ['REF ID', 'Name', 'Email', 'Phone', 'Department', 'Vehicle', 'Type', 'Source', 'Destination', 'Departure', 'Return', 'Purpose'];
    const rows = this.bookings.map(b => [
      b.refId, b.name, b.email, b.phone, b.department,
      b.vehicleName, b.vehicleType, b.source, b.destination,
      this.formatDate(b.departureTime), this.formatDate(b.arrivalTime), b.purpose
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => '"' + (cell || '').replace(/"/g, '""') + '"').join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'booking-list-' + new Date().toISOString().slice(0, 10) + '.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
