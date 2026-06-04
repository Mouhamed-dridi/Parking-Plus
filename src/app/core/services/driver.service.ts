import { Injectable } from '@angular/core';

export interface Driver {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  region: string;
  subRegion: string;
  groups: string[];
  status: 'Active' | 'Inactive';
  carState: 'in road' | 'free' | 'apsnet' | 'blocked';
  phone: string;
  license: string;
  vehicle: string;
  carRefId: string;
  trips: number;
  rating: number;
  checked?: boolean;
}

@Injectable({ providedIn: 'root' })
export class DriverService {
  private drivers: Driver[] = [
    { id: 1, name: 'Ahmed Benali', email: 'ahmed.benali@parkplus.com', avatar: '/images/drivers/Ahmed.jpg', role: 'Super Admin', region: 'NewYork', subRegion: 'West Bay', groups: ['Falcons', 'Stallions'], status: 'Active', carState: 'in road', phone: '+1 555 001 002', license: 'DL-2024-NY-001', vehicle: 'Isuzu D-Max', carRefId: 'CAR-NY-0012', trips: 312, rating: 4.9 },
    { id: 2, name: 'Sami Khaled', email: 'sami.khaled@parkplus.com', avatar: '/images/drivers/Sami.jpg', role: 'Admin', region: 'California', subRegion: 'Delaware', groups: ['Falcons'], status: 'Inactive', carState: 'free', phone: '+1 555 002 003', license: 'DL-2024-CA-002', vehicle: 'Ford Ranger', carRefId: 'CAR-CA-0034', trips: 198, rating: 4.7 },
    { id: 3, name: 'Yassine Morati', email: 'yassine.morati@parkplus.com', avatar: '/images/drivers/Yassine.jpg', role: 'Supervisor', region: 'New Jersey', subRegion: 'Maryland', groups: ['Falcons', 'Stallions'], status: 'Active', carState: 'in road', phone: '+1 555 003 004', license: 'DL-2024-NJ-003', vehicle: 'Toyota Hilux', carRefId: 'CAR-NJ-0056', trips: 254, rating: 4.8 },
    { id: 4, name: 'Youssef Amrani', email: 'youssef.amrani@parkplus.com', avatar: '/images/drivers/Youssef.jpg', role: 'Regional Manager', region: 'Chicago', subRegion: 'West Bay', groups: ['Stallions'], status: 'Active', carState: 'apsnet', phone: '+1 555 004 005', license: 'DL-2024-IL-004', vehicle: 'Mercedes J Class', carRefId: 'CAR-IL-0078', trips: 421, rating: 4.95 },
    { id: 5, name: 'Ahmed El Fassi', email: 'ahmed.elfassi@parkplus.com', avatar: '/images/drivers/Ahmed.jpg', role: 'Contributor', region: 'Texas', subRegion: 'West Bay', groups: ['Falcons'], status: 'Active', carState: 'free', phone: '+1 555 005 006', license: 'DL-2024-TX-005', vehicle: 'Blue Audi (PSD)', carRefId: 'CAR-TX-0091', trips: 87, rating: 4.6 },
    { id: 6, name: 'Sami Driss', email: 'sami.driss@parkplus.com', avatar: '/images/drivers/Sami.jpg', role: 'Client', region: 'Washington', subRegion: 'Massachusetts', groups: ['Falcons', 'Stallions'], status: 'Inactive', carState: 'blocked', phone: '+1 555 006 007', license: 'DL-2024-WA-006', vehicle: 'Bentley', carRefId: 'CAR-WA-0103', trips: 44, rating: 4.3 },
    { id: 7, name: 'Yassine Tachfine', email: 'yassine.tach@parkplus.com', avatar: '/images/drivers/Yassine.jpg', role: 'Country Manager', region: 'Virginia', subRegion: 'West Virginia', groups: ['Stallions'], status: 'Inactive', carState: 'free', phone: '+1 555 007 008', license: 'DL-2024-VA-007', vehicle: 'Peugeot Partner', carRefId: 'CAR-VA-0117', trips: 163, rating: 4.5 },
    { id: 8, name: 'Youssef Bennis', email: 'youssef.bennis@parkplus.com', avatar: '/images/drivers/Youssef.jpg', role: 'Continent Manager', region: 'Alaska', subRegion: 'Alabama', groups: ['Falcons', 'Stallions'], status: 'Active', carState: 'in road', phone: '+1 555 008 009', license: 'DL-2024-AK-008', vehicle: 'VW Caddy', carRefId: 'CAR-AK-0129', trips: 509, rating: 4.85 },
  ];

  private nextId = 9;

  getAll(): Driver[] {
    return [...this.drivers];
  }

  getById(id: number): Driver | undefined {
    return this.drivers.find(d => d.id === id);
  }

  save(driver: Driver): void {
    const idx = this.drivers.findIndex(d => d.id === driver.id);
    if (idx !== -1) {
      this.drivers[idx] = { ...driver };
    } else {
      const newDriver = { ...driver, id: this.nextId };
      this.nextId++;
      this.drivers.push(newDriver);
    }
  }

  delete(id: number): void {
    this.drivers = this.drivers.filter(d => d.id !== id);
  }
}
