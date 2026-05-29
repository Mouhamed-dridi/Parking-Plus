import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzAvatarModule],
  template: `
    <div class="h-full flex items-center justify-between w-full gap-4 px-4">
      <!-- Left -->
      <div class="flex items-center gap-3"></div>

      <!-- Right -->
      <div class="flex items-center gap-2">
        <!-- User -->
        <div class="flex items-center gap-2.5 pl-2 border-l border-[#e0e0e0]">
          <div class="flex flex-col items-end leading-tight">
            <span class="text-[13px] font-medium text-[#202124]">John Doe</span>
            <span class="text-[11px] text-[#5f6368]">Admin</span>
          </div>
          <nz-avatar nzSrc="https://randomuser.me/api/portraits/men/32.jpg" class="cursor-pointer" [nzSize]="32"></nz-avatar>
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class HeaderComponent {
  @Input() isCollapsed = false;
  @Output() toggle = new EventEmitter<void>();

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }
}
