import { Injectable } from '@angular/core';

export interface Booking {
  id: string;
  refId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  purpose: string;
  vehicleName: string;
  vehicleType: string;
  hasLicense: boolean;
  hasShellCard: boolean;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  createdAt: Date;
}

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookings: Booking[] = [];

  addBooking(booking: Booking): void {
    this.bookings.unshift(booking);
  }

  getBookings(): Booking[] {
    return [...this.bookings];
  }

  generateRefId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
