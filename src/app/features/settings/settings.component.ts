import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, NzCardModule, NzSelectModule, NzSwitchModule,
    NzButtonModule, NzIconModule, NzInputModule, NzDividerModule, NzRadioModule,
  ],
  template: `
    <div class="settings-page">

      <!-- Basic Settings -->
      <nz-card class="settings-card" nzTitle="Basic Settings">
        <div class="field-row">
          <div class="field">
            <label>Company Name</label>
            <input nz-input [(ngModel)]="companyName" placeholder="Your company name" />
          </div>
          <div class="field">
            <label>Phone</label>
            <input nz-input [(ngModel)]="companyPhone" placeholder="+216 XX XXX XXX" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>Email</label>
            <input nz-input [(ngModel)]="companyEmail" placeholder="contact@company.com" />
          </div>
          <div class="field">
            <label>Address</label>
            <input nz-input [(ngModel)]="companyAddress" placeholder="Street, City" />
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>Currency</label>
            <nz-select [(ngModel)]="currency" nzPlaceHolder="Select currency">
              <nz-option nzLabel="TND - Tunisian Dinar" nzValue="TND"></nz-option>
              <nz-option nzLabel="EUR - Euro" nzValue="EUR"></nz-option>
              <nz-option nzLabel="USD - US Dollar" nzValue="USD"></nz-option>
            </nz-select>
          </div>
          <div class="field">
            <label>Language</label>
            <nz-select [(ngModel)]="language" nzPlaceHolder="Select language">
              <nz-option nzLabel="English" nzValue="en"></nz-option>
              <nz-option nzLabel="French" nzValue="fr"></nz-option>
              <nz-option nzLabel="Arabic" nzValue="ar"></nz-option>
            </nz-select>
          </div>
        </div>
      </nz-card>

      <!-- Time & Date -->
      <nz-card class="settings-card" nzTitle="Time & Date">
        <div class="field-row">
          <div class="field">
            <label>Time Zone</label>
            <nz-select [(ngModel)]="timeZone" nzPlaceHolder="Select time zone">
              <nz-option nzLabel="UTC" nzValue="UTC"></nz-option>
              <nz-option nzLabel="Africa/Tunis" nzValue="Africa/Tunis"></nz-option>
              <nz-option nzLabel="Europe/Paris" nzValue="Europe/Paris"></nz-option>
              <nz-option nzLabel="America/New_York" nzValue="America/New_York"></nz-option>
            </nz-select>
          </div>
          <div class="field">
            <label>Date Format</label>
            <nz-select [(ngModel)]="dateFormat" nzPlaceHolder="Select format">
              <nz-option nzLabel="DD/MM/YYYY" nzValue="DD/MM/YYYY"></nz-option>
              <nz-option nzLabel="MM/DD/YYYY" nzValue="MM/DD/YYYY"></nz-option>
              <nz-option nzLabel="YYYY-MM-DD" nzValue="YYYY-MM-DD"></nz-option>
            </nz-select>
          </div>
          <div class="field">
            <label>Time Format</label>
            <nz-radio-group [(ngModel)]="timeFormat">
              <label nz-radio nzValue="24h">24h</label>
              <label nz-radio nzValue="12h">12h (AM/PM)</label>
            </nz-radio-group>
          </div>
        </div>
      </nz-card>

      <!-- Theme -->
      <nz-card class="settings-card" nzTitle="Theme">
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

      <!-- Save -->
      <div class="save-bar">
        <button nz-button nzType="primary" class="btn-primary" (click)="saveSettings()">
          <span nz-icon nzType="save" nzTheme="outline"></span> Save Settings
        </button>
      </div>

    </div>
  `,
  styles: [`
    .settings-page {
      max-width: 800px; margin: 0 auto; padding: 24px;
      display: flex; flex-direction: column; gap: 20px;
    }
    .settings-card { border-radius: 2px; border: 1px solid #e0e0e0; }
    .settings-card ::ng-deep .ant-card-head {
      border-bottom: 1px solid #e0e0e0; padding: 12px 20px; min-height: auto;
    }
    .settings-card ::ng-deep .ant-card-head-title {
      font-size: 15px; font-weight: 600; color: #202124;
    }
    .settings-card ::ng-deep .ant-card-body { padding: 20px; }
    .field-row {
      display: flex; flex-wrap: wrap; gap: 16px;
    }
    .field {
      display: flex; flex-direction: column; gap: 6px; min-width: 180px; flex: 1;
    }
    .field label {
      font-size: 12px; font-weight: 600; color: #5f6368;
      text-transform: uppercase; letter-spacing: 0.03em;
    }
    .toggle-field {
      flex-direction: row; align-items: center; justify-content: space-between;
    }
    .toggle-field label { text-transform: none; letter-spacing: normal; font-size: 14px; color: #374151; }
    .toggle-label { display: flex; align-items: center; gap: 8px; }
    .toggle-label label { text-transform: none; letter-spacing: normal; font-size: 14px; color: #374151; }
    .label-icon { font-size: 18px; color: #1a73e8; }
    .save-bar {
      display: flex; justify-content: flex-end;
    }
    .btn-primary {
      height: 36px; border-radius: 2px; display: inline-flex; align-items: center; gap: 6px;
    }
  `]
})
export class SettingsComponent {
  companyName = 'ParkPlus';
  companyPhone = '+216 XX XXX XXX';
  companyEmail = 'contact@parkplus.com';
  companyAddress = 'Tunis, Tunisia';
  currency = 'TND';
  language = 'en';
  timeZone = 'Africa/Tunis';
  dateFormat = 'DD/MM/YYYY';
  timeFormat = '24h';

  constructor(public themeService: ThemeService) {}

  saveSettings(): void {
    console.log('Settings saved', {
      company: this.companyName,
      phone: this.companyPhone,
      email: this.companyEmail,
      address: this.companyAddress,
      currency: this.currency,
      language: this.language,
      timeZone: this.timeZone,
      dateFormat: this.dateFormat,
      timeFormat: this.timeFormat,
      theme: this.themeService.isDark ? 'dark' : 'light',
    });
  }
}
