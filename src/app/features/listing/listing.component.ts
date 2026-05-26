import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CarCardComponent, CarData } from '../../shared/components/car-card/car-card.component';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, NzGridModule, NzButtonModule, NzIconModule, CarCardComponent, NzTypographyModule],
  template: `
    <div class="page-header">
      <div class="header-titles">
        <h1 nz-typography>Listing</h1>
        <p nz-typography class="subtitle">Get you latest update for the last 7 days</p>
      </div>
      <button nz-button nzType="primary" class="export-btn">
        <span nz-icon nzType="export" nzTheme="outline"></span>
        Export
      </button>
    </div>

    <div class="listing-content">
      <div class="section-header">
        <h2 nz-typography>Available Cars</h2>
        <button nz-button nzType="default" class="filter-btn">
          <span nz-icon nzType="filter" nzTheme="outline"></span>
          Filter by
        </button>
      </div>

      <div nz-row [nzGutter]="[24, 24]" class="car-grid">
        <div nz-col nzXs="24" nzSm="24" nzMd="12" nzLg="12" nzXl="12" *ngFor="let car of cars">
          <app-car-card [car]="car"></app-car-card>
        </div>
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

    .export-btn {
      background-color: var(--primary-color);
      border-radius: 8px;
      height: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .listing-content {
      background: white;
      border-radius: 16px;
      padding: 32px;
      padding-bottom: 48px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
    }

    h2 {
      font-size: 20px;
      margin: 0;
      font-weight: 600;
      color: var(--text-dark);
    }

    .filter-btn {
      border-radius: 8px;
      color: var(--primary-color);
      border-color: #cbd5e1;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .filter-btn:hover {
      border-color: var(--primary-color);
    }
  `]
})
export class ListingComponent implements OnInit {
  private route = inject(ActivatedRoute);

  cars: CarData[] = [];

  allCars: CarData[] = [
    {
      id: 1,
      name: 'Blue Audi (PSD)',
      type: 'Car',
      transmission: 'Auto',
      fuel: 'Diesel',
      price: 348.98,
      image: '/images/cars/DGcars/a5 audi.png',
      driver: { name: 'Mulika lelia', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' }
    },
    {
      id: 2,
      name: 'Bentley',
      type: 'Car',
      transmission: 'Auto',
      fuel: 'Diesel',
      price: 789.345,
      image: '/images/cars/DGcars/bdw.avif',
      driver: { name: 'Rabin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' }
    },
    {
      id: 3,
      name: 'Porsche Tayce',
      type: 'Car',
      transmission: 'Auto',
      fuel: 'Diesel',
      price: 1234.70,
      image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif',
      driver: { name: 'Israt tuli', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
    },
    {
      id: 4,
      name: 'Mercedes E Class',
      type: 'Car',
      transmission: 'Auto',
      fuel: 'Diesel',
      price: 908.234,
      image: '/images/cars/DGcars/jclass.png',
      driver: { name: 'Zahidul', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' }
    },
    {
      id: 8,
      name: 'VW Caddy',
      type: 'Delivery',
      transmission: 'Manual',
      fuel: 'Diesel',
      price: 80.00,
      image: '/images/cars/deliver/caddy.webp',
      driver: { name: '', avatar: '' }
    },
    {
      id: 9,
      name: 'Renault Dokker',
      type: 'Delivery',
      transmission: 'Manual',
      fuel: 'Diesel',
      price: 75.00,
      image: '/images/cars/deliver/docker.webp',
      driver: { name: '', avatar: '' }
    },
    {
      id: 10,
      name: 'Peugeot Partner',
      type: 'Delivery',
      transmission: 'Manual',
      fuel: 'Diesel',
      price: 85.00,
      image: '/images/cars/deliver/partiner.webp',
      driver: { name: '', avatar: '' }
    },
    {
      id: 11,
      name: 'Peugeot Partner Pro',
      type: 'Delivery',
      transmission: 'Manual',
      fuel: 'Diesel',
      price: 90.00,
      image: '/images/cars/deliver/partnier.avif',
      driver: { name: '', avatar: '' }
    }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.cars = this.allCars.filter(c => c.type.toLowerCase() === category.toLowerCase());
      } else {
        this.cars = this.allCars;
      }
    });
  }
}
