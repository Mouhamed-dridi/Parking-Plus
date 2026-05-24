import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

export interface CarData {
  id: number;
  name: string;
  image: string;
  driver: {
    name: string;
    avatar: string;
  };
  type: string;
  transmission: string;
  fuel: string;
  price: number;
}

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzAvatarModule, NzIconModule, NzTagModule, NzTypographyModule],
  template: `
    <div class="car-card-wrapper">
      <div class="card-content">
        <!-- Left: Image -->
        <div class="image-section">
          <img [src]="car.image" [alt]="car.name" />
        </div>

        <!-- Right: Details -->
        <div class="details-section">
          
          <div class="driver-info">
            <div class="driver">
              <span class="driver-name">{{ car.driver.name }}</span>
            </div>
            <span nz-icon nzType="book" nzTheme="outline" class="bookmark-icon"></span>
          </div>

          <h3 class="car-name">{{ car.name }}</h3>

          <div class="tags-row">
            <span class="tag"><span nz-icon nzType="car" nzTheme="outline"></span> {{ car.type }}</span>
            <span class="tag"><span nz-icon nzType="interaction" nzTheme="outline"></span> {{ car.transmission }}</span>
            <span class="tag"><span nz-icon nzType="dashboard" nzTheme="outline"></span> {{ car.fuel }}</span>
          </div>



        </div>
      </div>
    </div>
  `,
  styles: [`
    .car-card-wrapper {
      border: 1px solid #f1f5f9;
      border-radius: 12px;
      padding: 20px;
      background: white;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
    }
    
    .car-card-wrapper:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
      border-color: #e2e8f0;
      transform: translateY(-2px);
    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .image-section {
      flex: 0 0 160px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .image-section img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .details-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .driver-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .driver {
      display: flex;
      align-items: center;
      gap: 10px;
    }


    .driver-name {
      font-weight: 600;
      color: var(--text-dark);
      font-size: 13px;
    }

    .bookmark-icon {
      color: #94a3b8;
      cursor: pointer;
      font-size: 14px;
    }

    .bookmark-icon:hover {
      color: var(--text-dark);
    }

    .car-name {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-dark);
      margin: 0 0 10px 0;
      letter-spacing: -0.3px;
    }

    .tags-row {
      display: flex;
      gap: 14px;
      margin-bottom: 14px;
    }

    .tag {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .tag span.anticon {
      color: var(--primary-color);
      font-size: 12px;
    }

  `]
})
export class CarCardComponent {
  @Input() car!: CarData;
}
