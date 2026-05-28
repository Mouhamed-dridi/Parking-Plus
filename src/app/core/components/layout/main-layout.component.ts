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
      background: var(--bg-surface) !important;
      box-shadow: 1px 0 0 var(--border-muted);
      z-index: 10;
    }

    nz-header {
      background: var(--bg-surface) !important;
      padding: 0 24px;
      height: 64px;
      line-height: 64px;
      border-bottom: 1px solid var(--border-muted);
      z-index: 9;
    }

    nz-content {
      background: var(--bg-base);
      margin: 0;
      padding: 24px;
      overflow-y: auto;
    }

    .inner-content {
      min-height: calc(100vh - 112px);
    }

    ::ng-deep .ant-layout-sider-zero-width-trigger {
      display: none;
    }
  `]
})
export class MainLayoutComponent {
  isCollapsed = false;
}
