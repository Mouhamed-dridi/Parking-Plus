import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, SidebarComponent, HeaderComponent],
  template: `
    <nz-layout class="app-layout">
      <nz-sider
        class="menu-sidebar"
        nzCollapsible
        nzWidth="256px"
        nzBreakpoint="md"
        [(nzCollapsed)]="isCollapsed"
        [nzTrigger]="null"
      >
        <app-sidebar [isCollapsed]="isCollapsed"></app-sidebar>
      </nz-sider>

      <nz-layout>
        <nz-header>
          <app-header [isCollapsed]="isCollapsed" (toggle)="isCollapsed = !isCollapsed"></app-header>
        </nz-header>

        <nz-content>
          <div class="inner-content">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [`
    .app-layout {
      height: 100vh;
    }
    .menu-sidebar {
      background: #fff !important;
      border-right: 1px solid #e0e0e0;
      z-index: 10;
    }
    nz-header {
      background: #fff !important;
      padding: 0 16px;
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid #e0e0e0;
      z-index: 9;
    }
    nz-content {
      background: #f8f9fa;
      margin: 0;
      padding: 0;
      overflow-y: auto;
    }
    .inner-content {
      min-height: calc(100vh - 56px);
    }
    ::ng-deep .ant-layout-sider-zero-width-trigger {
      display: none;
    }
  `]
})
export class MainLayoutComponent {
  isCollapsed = false;
}
