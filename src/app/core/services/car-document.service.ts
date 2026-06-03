import { Injectable } from '@angular/core';

export interface CarDocument {
  id: number;
  carId: number;
  fileName: string;
  documentType: string;
  notes: string;
  uploadDate: string;
}

export const DOCUMENT_TYPE_LIST = [
  'Assurance',
  'Carte Grise',
  'Taxe / Vignette',
  'Facture',
  'BL',
  'Contrat',
  'Maintenance',
  'Autre',
];

let nextDocId = 100;

@Injectable({ providedIn: 'root' })
export class CarDocumentService {
  private records: CarDocument[] = [
    { id: 1, carId: 1, fileName: 'assurance_2025.pdf', documentType: 'Assurance', notes: 'Assurance AXA 2025', uploadDate: '2025-01-10' },
    { id: 2, carId: 1, fileName: 'carte_grise.jpg', documentType: 'Carte Grise', notes: 'Scan carte grise', uploadDate: '2024-02-01' },
    { id: 3, carId: 1, fileName: 'facture_achat.pdf', documentType: 'Facture', notes: 'Facture d\'achat originale', uploadDate: '2024-01-15' },
    { id: 4, carId: 2, fileName: 'contrat_location.pdf', documentType: 'Contrat', notes: 'Contrat location Bentley', uploadDate: '2024-03-10' },
    { id: 5, carId: 2, fileName: 'vignette_2025.pdf', documentType: 'Taxe / Vignette', notes: 'Vignette 2025', uploadDate: '2025-01-05' },
    { id: 6, carId: 3, fileName: 'maintenance_porsche.pdf', documentType: 'Maintenance', notes: 'Révision 20000 km', uploadDate: '2024-08-15' },
    { id: 7, carId: 4, fileName: 'assurance_gat.pdf', documentType: 'Assurance', notes: 'Assurance GAT 2025', uploadDate: '2025-02-20' },
    { id: 8, carId: 8, fileName: 'bl_livraison.pdf', documentType: 'BL', notes: 'BL livraison VW Caddy', uploadDate: '2024-04-15' },
    { id: 9, carId: 9, fileName: 'facture_renault.pdf', documentType: 'Facture', notes: 'Facture Renault Dokker', uploadDate: '2024-06-25' },
    { id: 10, carId: 10, fileName: 'carte_grise_partner.jpg', documentType: 'Carte Grise', notes: 'Carte grise Partner', uploadDate: '2024-09-01' },
  ];

  getByCarId(carId: number): CarDocument[] {
    return this.records.filter(r => r.carId === carId);
  }

  getAll(): CarDocument[] {
    return [...this.records];
  }

  save(doc: CarDocument): void {
    const idx = this.records.findIndex(r => r.id === doc.id);
    if (idx !== -1) {
      this.records[idx] = { ...doc };
    } else {
      const newDoc = { ...doc, id: nextDocId };
      nextDocId++;
      this.records.push(newDoc);
    }
  }

  delete(id: number): void {
    this.records = this.records.filter(r => r.id !== id);
  }
}
