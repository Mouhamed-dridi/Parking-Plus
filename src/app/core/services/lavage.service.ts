import { Injectable } from '@angular/core';

export type LavageServiceType = 'Extérieur' | 'Intérieur' | 'Complet' | 'Standard';
export type LavageStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
export type LavageVehicleType = 'Car' | 'Delivery' | 'Used';

export interface LavageRequest {
  id: string;
  refId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  vehicleName: string;
  vehiclePlate: string;
  vehicleType: LavageVehicleType;
  serviceType: LavageServiceType;
  scheduledDate: string;
  location: string;
  notes: string;
  hasLicense: boolean;
  status: LavageStatus;
  createdAt: Date;
}

export const LAVAGE_SERVICE_TYPES: LavageServiceType[] = [
  'Extérieur',
  'Intérieur',
  'Complet',
  'Standard',
];

export const LAVAGE_VEHICLE_TYPES: LavageVehicleType[] = [
  'Car',
  'Delivery',
  'Used',
];

@Injectable({ providedIn: 'root' })
export class LavageService {
  private requests: LavageRequest[] = [
    {
      id: 'lv-1',
      refId: 'LV000001',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@parkplus.com',
      phone: '+216 55 123 456',
      department: 'Logistics',
      vehicleName: 'Renault Dokker',
      vehiclePlate: '666 TU 3389',
      vehicleType: 'Delivery',
      serviceType: 'Complet',
      scheduledDate: this.todayAt(10, 0),
      location: 'Tunis',
      notes: 'Please wash before the 14:00 trip.',
      hasLicense: true,
      status: 'Pending',
      createdAt: new Date(),
    },
    {
      id: 'lv-2',
      refId: 'LV000002',
      name: 'Sami Khaled',
      email: 'sami.khaled@parkplus.com',
      phone: '+216 22 987 654',
      department: 'Operations',
      vehicleName: 'VW Caddy',
      vehiclePlate: '555 TU 1245',
      vehicleType: 'Delivery',
      serviceType: 'Extérieur',
      scheduledDate: this.todayAt(15, 30),
      location: 'Sousse',
      notes: '',
      hasLicense: true,
      status: 'In Progress',
      createdAt: new Date(),
    },
    {
      id: 'lv-3',
      refId: 'LV000003',
      name: 'Yassine Morati',
      email: 'yassine.morati@parkplus.com',
      phone: '+216 50 111 222',
      department: 'Sales',
      vehicleName: 'Hyundai Elantra 2022',
      vehiclePlate: '901 TU 2356',
      vehicleType: 'Used',
      serviceType: 'Standard',
      scheduledDate: this.daysFromNow(2, 9, 0),
      location: 'Sfax',
      notes: 'Quick wash only.',
      hasLicense: true,
      status: 'Pending',
      createdAt: new Date(),
    },
    {
      id: 'lv-4',
      refId: 'LV000004',
      name: 'Youssef Amrani',
      email: 'youssef.amrani@parkplus.com',
      phone: '+216 98 333 444',
      department: 'DG',
      vehicleName: 'Bentley',
      vehiclePlate: '456 TU 7821',
      vehicleType: 'Car',
      serviceType: 'Intérieur',
      scheduledDate: this.daysFromNow(-1, 11, 0),
      location: 'Tunis',
      notes: 'VIP treatment required.',
      hasLicense: true,
      status: 'Completed',
      createdAt: new Date(),
    },
  ];

  private counter = 5;

  getRequests(): LavageRequest[] {
    return [...this.requests];
  }

  getById(id: string): LavageRequest | undefined {
    return this.requests.find(r => r.id === id);
  }

  addRequest(req: Omit<LavageRequest, 'id' | 'refId' | 'createdAt' | 'status'>): LavageRequest {
    const newReq: LavageRequest = {
      ...req,
      id: 'lv-' + Date.now(),
      refId: this.generateRefId(),
      createdAt: new Date(),
      status: 'Pending',
    };
    this.requests.unshift(newReq);
    return newReq;
  }

  updateStatus(id: string, status: LavageStatus): void {
    const r = this.requests.find(x => x.id === id);
    if (r) r.status = status;
  }

  delete(id: string): void {
    this.requests = this.requests.filter(r => r.id !== id);
  }

  generateRefId(): string {
    this.counter++;
    return 'LV' + String(this.counter).padStart(6, '0');
  }

  private todayAt(hour: number, minute: number): string {
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return this.toLocalIso(d);
  }

  private daysFromNow(days: number, hour: number, minute: number): string {
    const d = new Date();
    d.setDate(d.getDate() + days);
    d.setHours(hour, minute, 0, 0);
    return this.toLocalIso(d);
  }

  private toLocalIso(d: Date): string {
    const tz = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tz).toISOString().slice(0, 16);
  }
}
