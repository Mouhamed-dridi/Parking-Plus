import { Injectable } from '@angular/core';
import { CarData } from '../../shared/components/car-card/car-card.component';

export interface CarSpecs {
  caracteristiques: { label: string; value: string }[];
  motorisation: { label: string; value: string }[];
  transmission: { label: string; value: string }[];
  dimensions: { label: string; value: string }[];
  performances: { label: string; value: string }[];
  consommation: { label: string; value: string }[];
  securite: { label: string; value: string }[];
  aidesConduite: { label: string; value: string }[];
  exterieur: { label: string; value: string }[];
  audio: { label: string; value: string }[];
  interieur: { label: string; value: string }[];
  fonctionnels: { label: string; value: string }[];
}

export interface CarDetail extends CarData {
  specs: CarSpecs;
}

@Injectable({ providedIn: 'root' })
export class CarService {
  private nextId = 12;

  private allCars: CarDetail[] = [
    {
      id: 1, name: 'GWM Tank 300 HEV 2.0 L', type: 'Car', transmission: 'Auto', fuel: 'Hybrid', price: 548.98,
      image: '/images/cars/DGcars/gwm-tank-300.jpg',
      driver: { name: 'Mulika lelia', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
      specs: {
        caracteristiques: [
          { label: 'Marque', value: 'GWM (Great Wall Motors)' },
          { label: 'Modèle', value: 'Tank 300 HEV' },
          { label: 'Année', value: '2025' },
          { label: 'Type de carrosserie', value: 'SUV' },
          { label: 'Places', value: '5' },
          { label: 'Portes', value: '5' },
        ],
        motorisation: [
          { label: 'Motorisation', value: 'Hybride essence / électrique' },
          { label: 'Cylindrée', value: '1 998 cm³ (2.0 L)' },
          { label: 'Type moteur', value: '4 cylindres en ligne turbo' },
          { label: 'Puissance combinée', value: '255 ch (188 kW)' },
          { label: 'Couple maxi', value: '380 Nm' },
          { label: 'Batterie', value: 'Lithium-ion 1.7 kWh' },
        ],
        transmission: [
          { label: 'Transmission', value: 'Automatique' },
          { label: 'Nombre de rapports', value: '9' },
          { label: 'Type de boîte', value: '9G-TRONIC' },
          { label: 'Roues motrices', value: '4 roues motrices (AWD)' },
        ],
        dimensions: [
          { label: 'Longueur', value: '4 760 mm' },
          { label: 'Largeur', value: '1 930 mm' },
          { label: 'Hauteur', value: '1 903 mm' },
          { label: 'Empattement', value: '2 750 mm' },
          { label: 'Garde au sol', value: '224 mm' },
          { label: 'Poids à vide', value: '2 135 kg' },
          { label: 'Capacité du réservoir', value: '80 L' },
          { label: 'Volume du coffre', value: '410 L' },
        ],
        performances: [
          { label: 'Vitesse maxi', value: '175 km/h' },
          { label: '0-100 km/h', value: '9.5 s' },
          { label: 'Puissance fiscale', value: '13 CV' },
          { label: 'Pente maxi franchissable', value: '70 %' },
        ],
        consommation: [
          { label: 'Consommation mixte', value: '8.5 L/100 km' },
          { label: 'Consommation urbaine', value: '9.2 L/100 km' },
          { label: 'Consommation extra-urbaine', value: '7.8 L/100 km' },
          { label: 'Émissions CO₂', value: '195 g/km' },
          { label: 'Norme euro', value: 'Euro 6' },
          { label: 'Autonomie électrique', value: '~50 km' },
        ],
        securite: [
          { label: 'Freins avant', value: 'Disques ventilés' },
          { label: 'Freins arrière', value: 'Disques ventilés' },
          { label: 'ABS', value: 'Oui' },
          { label: 'ESP', value: 'Oui' },
          { label: 'Airbags frontaux', value: '2' },
          { label: 'Airbags latéraux', value: '2' },
          { label: 'Airbags rideaux', value: '2' },
          { label: 'Contrôle de traction', value: 'Oui' },
          { label: 'Caméra de recul', value: 'Oui' },
          { label: 'Radar de stationnement avant/arrière', value: 'Oui' },
        ],
        aidesConduite: [
          { label: 'Régulateur de vitesse adaptatif', value: 'Oui' },
          { label: 'Maintien dans la voie', value: 'Oui' },
          { label: 'Freinage d\'urgence automatique', value: 'Oui' },
          { label: 'Reconnaissance des panneaux', value: 'Oui' },
          { label: 'Détecteur d\'angle mort', value: 'Oui' },
          { label: 'Aide au stationnement automatique', value: 'Oui' },
          { label: 'Affichage tête haute', value: 'Oui' },
        ],
        exterieur: [
          { label: 'Jantes', value: 'Alliage 18 pouces' },
          { label: 'Pneus', value: '265/65 R18' },
          { label: 'Phares LED', value: 'Oui' },
          { label: 'Feux arrière LED', value: 'Oui' },
          { label: 'Toit ouvrant panoramique', value: 'Oui' },
          { label: 'Barres de toit', value: 'Oui' },
          { label: 'Rétroviseurs électriques rabattables', value: 'Oui' },
        ],
        audio: [
          { label: 'Système audio', value: 'Infinity 9 haut-parleurs' },
          { label: 'Écran central', value: '12.3 pouces tactile' },
          { label: 'Apple CarPlay', value: 'Oui' },
          { label: 'Android Auto', value: 'Oui' },
          { label: 'GPS / Navigation', value: 'Oui' },
          { label: 'Prise USB avant', value: '2' },
          { label: 'Prise USB arrière', value: '2' },
          { label: 'Bluetooth', value: 'Oui' },
        ],
        interieur: [
          { label: 'Sellerie', value: 'Cuir Nappa' },
          { label: 'Sièges avant électriques', value: 'Oui avec mémoire' },
          { label: 'Sièges avant chauffants', value: 'Oui' },
          { label: 'Sièges avant ventilés', value: 'Oui' },
          { label: 'Volant cuir multifonction', value: 'Oui' },
          { label: 'Climatisation automatique', value: 'Bizone' },
          { label: 'Éclairage d\'ambiance', value: 'LED 64 couleurs' },
        ],
        fonctionnels: [
          { label: 'Démarrage sans clé', value: 'Oui' },
          { label: 'Hayon électrique', value: 'Oui' },
          { label: 'Mode tout-terrain', value: 'Oui (Sable, Boue, Roche, Neige)' },
          { label: 'Blocage de différentiel', value: 'Oui' },
          { label: 'Pédales sport', value: 'Aluminium' },
          { label: 'Capteurs de pluie', value: 'Oui' },
        ],
      }
    },
    {
      id: 2, name: 'Bentley', type: 'Car', transmission: 'Auto', fuel: 'Diesel', price: 789.345,
      image: '/images/cars/DGcars/bdw.avif',
      driver: { name: 'Rabin', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
      specs: this.defaultSpecs('Bentley', 'Continental GT', '2024', 'Diesel', '8.0 L', 'Auto', 'Coupé')
    },
    {
      id: 3, name: 'Porsche Tayce', type: 'Car', transmission: 'Auto', fuel: 'Diesel', price: 1234.70,
      image: '/images/cars/DGcars/2019-Audi-A4-MLP-Hero.avif',
      driver: { name: 'Israt tuli', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
      specs: this.defaultSpecs('Porsche', 'Taycan', '2024', 'Diesel', '4.0 L', 'Auto', 'Berline')
    },
    {
      id: 4, name: 'Mercedes E Class', type: 'Car', transmission: 'Auto', fuel: 'Diesel', price: 908.234,
      image: '/images/cars/DGcars/jclass.png',
      driver: { name: 'Zahidul', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
      specs: this.defaultSpecs('Mercedes-Benz', 'E 220 d', '2024', 'Diesel', '2.0 L', 'Auto', 'Berline')
    },
    {
      id: 8, name: 'VW Caddy', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', price: 80.00,
      image: '/images/cars/deliver/caddy.webp',
      driver: { name: '', avatar: '' },
      specs: this.defaultSpecs('Volkswagen', 'Caddy Maxi', '2023', 'Diesel', '2.0 L', 'Manuelle', 'Utilitaire')
    },
    {
      id: 9, name: 'Renault Dokker', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', price: 75.00,
      image: '/images/cars/deliver/docker.webp',
      driver: { name: '', avatar: '' },
      specs: this.defaultSpecs('Renault', 'Dokker Van', '2023', 'Diesel', '1.5 L', 'Manuelle', 'Utilitaire')
    },
    {
      id: 10, name: 'Peugeot Partner', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', price: 85.00,
      image: '/images/cars/deliver/partiner.webp',
      driver: { name: '', avatar: '' },
      specs: this.defaultSpecs('Peugeot', 'Partner', '2024', 'Diesel', '1.5 L', 'Manuelle', 'Utilitaire')
    },
    {
      id: 11, name: 'Peugeot Partner Pro', type: 'Delivery', transmission: 'Manual', fuel: 'Diesel', price: 90.00,
      image: '/images/cars/deliver/partnier.avif',
      driver: { name: '', avatar: '' },
      specs: this.defaultSpecs('Peugeot', 'Partner Pro', '2024', 'Diesel', '1.5 L', 'Manuelle', 'Utilitaire')
    }
  ];

  defaultSpecs(brand: string, model: string, year: string, fuel: string, engine: string, transmission: string, body: string): CarSpecs {
    return {
      caracteristiques: [
        { label: 'Marque', value: brand },
        { label: 'Modèle', value: model },
        { label: 'Année', value: year },
        { label: 'Type de carrosserie', value: body },
        { label: 'Places', value: '5' },
        { label: 'Portes', value: '5' },
      ],
      motorisation: [
        { label: 'Motorisation', value: fuel },
        { label: 'Cylindrée', value: engine },
        { label: 'Type moteur', value: '4 cylindres en ligne turbo' },
        { label: 'Puissance', value: '190 ch (140 kW)' },
        { label: 'Couple maxi', value: '320 Nm' },
      ],
      transmission: [
        { label: 'Transmission', value: transmission },
        { label: 'Nombre de rapports', value: '8' },
        { label: 'Roues motrices', value: 'Traction avant' },
      ],
      dimensions: [
        { label: 'Longueur', value: '4 800 mm' },
        { label: 'Largeur', value: '1 850 mm' },
        { label: 'Hauteur', value: '1 500 mm' },
        { label: 'Empattement', value: '2 800 mm' },
        { label: 'Poids à vide', value: '1 800 kg' },
        { label: 'Capacité du réservoir', value: '60 L' },
        { label: 'Volume du coffre', value: '450 L' },
      ],
      performances: [
        { label: 'Vitesse maxi', value: '220 km/h' },
        { label: '0-100 km/h', value: '8.5 s' },
        { label: 'Puissance fiscale', value: '10 CV' },
      ],
      consommation: [
        { label: 'Consommation mixte', value: '6.5 L/100 km' },
        { label: 'Consommation urbaine', value: '7.2 L/100 km' },
        { label: 'Consommation extra-urbaine', value: '5.8 L/100 km' },
        { label: 'Émissions CO₂', value: '155 g/km' },
        { label: 'Norme euro', value: 'Euro 6' },
      ],
      securite: [
        { label: 'Freins avant', value: 'Disques ventilés' },
        { label: 'Freins arrière', value: 'Disques' },
        { label: 'ABS', value: 'Oui' },
        { label: 'ESP', value: 'Oui' },
        { label: 'Airbags frontaux', value: '2' },
        { label: 'Airbags latéraux', value: '2' },
        { label: 'Airbags rideaux', value: '2' },
        { label: 'Caméra de recul', value: 'Oui' },
      ],
      aidesConduite: [
        { label: 'Régulateur de vitesse', value: 'Oui' },
        { label: 'Limiteur de vitesse', value: 'Oui' },
        { label: 'Radar de stationnement', value: 'Avant/Arrière' },
        { label: 'Freinage d\'urgence', value: 'Oui' },
      ],
      exterieur: [
        { label: 'Jantes', value: 'Alliage 17 pouces' },
        { label: 'Phares LED', value: 'Oui' },
        { label: 'Feux arrière LED', value: 'Oui' },
        { label: 'Rétroviseurs électriques', value: 'Oui' },
      ],
      audio: [
        { label: 'Système audio', value: '6 Haut-parleurs' },
        { label: 'Écran central', value: '8 pouces tactile' },
        { label: 'Apple CarPlay', value: 'Oui' },
        { label: 'Android Auto', value: 'Oui' },
        { label: 'Bluetooth', value: 'Oui' },
        { label: 'Prise USB', value: '4' },
      ],
      interieur: [
        { label: 'Sellerie', value: 'Tissu / Cuir' },
        { label: 'Sièges avant réglables', value: 'Oui' },
        { label: 'Volant cuir', value: 'Oui' },
        { label: 'Climatisation automatique', value: 'Oui' },
      ],
      fonctionnels: [
        { label: 'Démarrage sans clé', value: 'Oui' },
        { label: 'Capteurs de pluie', value: 'Oui' },
        { label: 'Allumage automatique des phares', value: 'Oui' },
      ],
    };
  }

  getCars(): CarDetail[] {
    return [...this.allCars];
  }

  getCarsByType(type: string): CarDetail[] {
    return this.allCars.filter(c => c.type.toLowerCase() === type.toLowerCase());
  }

  getCarById(id: number): CarDetail | undefined {
    return this.allCars.find(c => c.id === id);
  }

  addCar(car: CarDetail): void {
    car.id = this.nextId++;
    this.allCars.unshift(car);
  }
}