import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TrashService, TrashItem } from '../../core/services/trash.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzTypographyModule,
  ],
  template: `
    <div class="trash-page">
      <nz-card class="trash-card" nzTitle="Trash">
        <div class="card-subtitle">{{ trashItems.length }} deleted items</div>

        <nz-table #trashTable [nzData]="trashItems" [nzShowPagination]="true" [nzPageSize]="10" nzSize="small">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>NAME</th>
              <th>DELETED AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of trashTable.data">
              <td>
                <nz-tag [nzColor]="item.type === 'driver' ? 'blue' : 'green'">{{ item.type }}</nz-tag>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ formatDate(item.deletedAt) }}</td>
              <td>
                <button nz-button nzType="text" nzSize="small" class="restore-btn" (click)="restoreItem(item.id)">
                  <span nz-icon nzType="undo" nzTheme="outline"></span> Restore
                </button>
                <button nz-button nzType="text" nzSize="small" nzDanger class="delete-btn" (click)="permanentDelete(item.id)">
                  <span nz-icon nzType="delete" nzTheme="outline"></span> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </nz-table>

        <div class="empty-trash" *ngIf="trashItems.length === 0">
          <span nz-icon nzType="inbox" nzTheme="outline" class="empty-icon"></span>
          <p>Trash is empty</p>
        </div>

        <div class="trash-actions" *ngIf="trashItems.length > 0">
          <button nz-button nzType="default" nzDanger (click)="clearAll()">
            <span nz-icon nzType="delete" nzTheme="outline"></span> Empty Trash
          </button>
        </div>
      </nz-card>
    </div>
  `,
  styles: [`
    .trash-page {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px;
    }

    .trash-card {
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      border: 1px solid #f0f0f0;
    }

    .trash-card ::ng-deep .ant-card-head {
      border-bottom: 1px solid #f5f5f5;
      padding: 16px 24px;
      min-height: auto;
    }

    .trash-card ::ng-deep .ant-card-head-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
    }

    .trash-card ::ng-deep .ant-card-body {
      padding: 20px 24px;
    }

    .card-subtitle {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 16px;
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
      padding: 60px 20px;
    }
    .empty-icon {
      font-size: 48px;
      color: #d1d5db;
      margin-bottom: 12px;
    }
    .empty-trash p {
      color: #9ca3af;
      margin: 0;
      font-size: 16px;
    }

    .trash-actions {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }
  `]
})
export class TrashComponent implements OnInit {
  private trashService = inject(TrashService);

  trashItems: TrashItem[] = [];

  ngOnInit() {
    this.trashItems = this.trashService.getItems();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  restoreItem(id: string) {
    this.trashService.restoreItem(id);
    this.trashItems = this.trashService.getItems();
  }

  permanentDelete(id: string) {
    this.trashService.permanentDelete(id);
    this.trashItems = this.trashService.getItems();
  }

  clearAll() {
    this.trashService.clearAll();
    this.trashItems = this.trashService.getItems();
  }
}
