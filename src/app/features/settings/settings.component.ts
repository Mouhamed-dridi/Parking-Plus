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
              [ngModel]="themeService.isDark"
              (ngModelChange)="themeService.toggleTheme()"
              [nzCheckedChildren]="checkedTemplate"
              [nzUnCheckedChildren]="uncheckedTemplate"
            ></nz-switch>
            <ng-template #checkedTemplate><span nz-icon nzType="moon" nzTheme="fill" style="font-size:14px"></span></ng-template>
            <ng-template #uncheckedTemplate><span nz-icon nzType="sun" nzTheme="fill" style="font-size:14px"></span></ng-template>
          </div>
        </div>
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

}
