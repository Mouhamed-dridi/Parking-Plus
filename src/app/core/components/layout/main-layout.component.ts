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
      <!-- Sidebar -->
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

      <!-- Main Content Area -->
      <nz-layout>
        <!-- Header -->
        <nz-header>
          <app-header 
            [isCollapsed]="isCollapsed" 
            (toggle)="isCollapsed = !isCollapsed">
          </app-header>
        </nz-header>

        <!-- Dynamic Content -->
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
      background: white;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
      z-index: 10;
    }

    nz-header {
      background: white;
      padding: 0 24px;
      height: 72px;
      line-height: 72px;
      border-bottom: 1px solid var(--border-color);
      z-index: 9;
    }

    nz-content {
      background: var(--bg-color);
      margin: 24px;
      overflow-y: auto;
    }

    .inner-content {
      min-height: calc(100vh - 120px);
    }
  `]
})
export class MainLayoutComponent {
  isCollapsed = false;
}
