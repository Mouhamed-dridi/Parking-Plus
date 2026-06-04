import { Injectable } from '@angular/core';

export interface CarFinanceRecord {
  carId: number;
  carName: string;
  price: number;
  achatDate: string;
  deliveryDate: string;
  insurance: string;
  insuranceMargin: string;
  vignetteTax: string;
  provider: string;
  immoId: string;
  carteGriseId: string;
  notes: string;
}

export const ASSURANCE_LIST = [
  'AXA Tunisie', 'COMAR', 'Maghrebia', 'GAT Assurances', 'STAR',
  'CARTE', 'BEST RE', 'AMI Assurances', 'SALIM Assurances', 'Hannibal Assurances',
];

export const PROVIDER_LIST = [
  'Volkswagen', 'Peugeot', 'Renault', 'Citroën', 'Toyota',
  'Hyundai', 'Kia', 'Ford', 'Fiat', 'Mercedes-Benz',
];

@Injectable({ providedIn: 'root' })
export class CarFinanceService {
  private records: CarFinanceRecord[] = [
    { carId: 1, carName: 'GWM Tank 300 HEV 2.0 L', price: 548.98, achatDate: '2024-01-15', deliveryDate: '2024-02-01', insurance: 'AXA Tunisie', insuranceMargin: '15%', vignetteTax: '320 TND', provider: 'GWM', immoId: '123 TU 1524', carteGriseId: 'CG-4521-A', notes: 'Main company vehicle' },
    { carId: 2, carName: 'Bentley', price: 789.345, achatDate: '2024-03-10', deliveryDate: '2024-03-28', insurance: 'COMAR', insuranceMargin: '12%', vignetteTax: '850 TND', provider: 'Bentley', immoId: '456 TU 7821', carteGriseId: 'CG-7823-B', notes: 'Executive car' },
    { carId: 3, carName: 'Porsche Tayce', price: 1234.70, achatDate: '2024-05-20', deliveryDate: '2024-06-10', insurance: 'Maghrebia', insuranceMargin: '10%', vignetteTax: '720 TND', provider: 'Porsche', immoId: '789 TU 3310', carteGriseId: 'CG-3345-C', notes: 'Sport utility' },
    { carId: 4, carName: 'Mercedes E Class', price: 908.234, achatDate: '2024-02-05', deliveryDate: '2024-02-20', insurance: 'GAT Assurances', insuranceMargin: '13%', vignetteTax: '580 TND', provider: 'Mercedes-Benz', immoId: '321 TU 6609', carteGriseId: 'CG-9987-D', notes: 'VIP transport' },
    { carId: 8, carName: 'VW Caddy', price: 80.00, achatDate: '2024-04-01', deliveryDate: '2024-04-15', insurance: 'AXA Tunisie', insuranceMargin: '10%', vignetteTax: '180 TND', provider: 'Volkswagen', immoId: '555 TU 1245', carteGriseId: 'CG-1122-E', notes: 'Delivery van' },
    { carId: 9, carName: 'Renault Dokker', price: 75.00, achatDate: '2024-06-10', deliveryDate: '2024-06-25', insurance: 'COMAR', insuranceMargin: '10%', vignetteTax: '150 TND', provider: 'Renault', immoId: '666 TU 3389', carteGriseId: 'CG-2233-F', notes: 'Light delivery' },
    { carId: 10, carName: 'Peugeot Partner', price: 85.00, achatDate: '2024-08-15', deliveryDate: '2024-09-01', insurance: 'Maghrebia', insuranceMargin: '11%', vignetteTax: '200 TND', provider: 'Peugeot', immoId: '777 TU 5490', carteGriseId: 'CG-4455-G', notes: 'Cargo van' },
    { carId: 11, carName: 'Peugeot Partner Pro', price: 90.00, achatDate: '2024-10-01', deliveryDate: '2024-10-18', insurance: 'GAT Assurances', insuranceMargin: '10%', vignetteTax: '220 TND', provider: 'Peugeot', immoId: '888 TU 7621', carteGriseId: 'CG-6677-H', notes: 'Heavy duty van' },
    { carId: 101, carName: 'Hyundai Elantra 2022', price: 18500, achatDate: '2024-06-01', deliveryDate: '2024-06-15', insurance: 'STAR', insuranceMargin: '8%', vignetteTax: '250 TND', provider: 'Hyundai', immoId: '901 TU 2356', carteGriseId: 'CG-7788-I', notes: 'Used car - single owner' },
    { carId: 102, carName: 'Kia Sportage 2023', price: 24000, achatDate: '2024-07-10', deliveryDate: '2024-07-25', insurance: 'CARTE', insuranceMargin: '9%', vignetteTax: '320 TND', provider: 'Kia', immoId: '902 TU 7890', carteGriseId: 'CG-8899-J', notes: 'Used SUV - low mileage' },
    { carId: 103, carName: 'VW Passat 2021', price: 21000, achatDate: '2024-05-20', deliveryDate: '2024-06-05', insurance: 'BEST RE', insuranceMargin: '7%', vignetteTax: '280 TND', provider: 'Volkswagen', immoId: '903 TU 4512', carteGriseId: 'CG-9900-K', notes: 'Used sedan - luxury trim' },
    { carId: 104, carName: 'Skoda Octavia 2022', price: 16500, achatDate: '2024-08-01', deliveryDate: '2024-08-18', insurance: 'SALIM Assurances', insuranceMargin: '8%', vignetteTax: '230 TND', provider: 'Skoda', immoId: '904 TU 6789', carteGriseId: 'CG-0011-L', notes: 'Used car - manual transmission' },
  ];

  getByCarId(carId: number): CarFinanceRecord | undefined {
    return this.records.find(r => r.carId === carId);
  }

  getAll(): CarFinanceRecord[] {
    return [...this.records];
  }

  save(record: CarFinanceRecord): void {
    const idx = this.records.findIndex(r => r.carId === record.carId);
    if (idx !== -1) {
      this.records[idx] = { ...record };
    } else {
      this.records.push({ ...record });
    }
  }

  delete(carId: number): void {
    this.records = this.records.filter(r => r.carId !== carId);
  }
}
