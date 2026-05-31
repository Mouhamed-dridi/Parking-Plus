import { Injectable } from '@angular/core';

export interface TrashItem {
  id: string;
  type: 'driver' | 'car' | 'booking' | 'provider';
  name: string;
  data: any;
  deletedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class TrashService {
  private items: TrashItem[] = [];

  addItem(item: TrashItem): void {
    this.items.unshift(item);
  }

  getItems(): TrashItem[] {
    return [...this.items];
  }

  restoreItem(id: string): TrashItem | undefined {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  permanentDelete(id: string): void {
    this.items = this.items.filter(i => i.id !== id);
  }

  clearAll(): void {
    this.items = [];
  }
}
