import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        loadComponent: () => import('./features/listing/listing.component').then(m => m.ListingComponent)
      },
      {
        path: 'drivers',
        loadComponent: () => import('./features/drivers/drivers.component').then(m => m.DriversComponent)
      },
      {
        path: 'drivers/:id',
        loadComponent: () => import('./features/driver-profile/driver-profile.component').then(m => m.DriverProfileComponent)
      },
      {
        path: 'parking-state',
        loadComponent: () => import('./features/parking-state/parking-state.component').then(m => m.ParkingStateComponent)
      },
      {
        path: 'gps',
        loadComponent: () => import('./features/gps/gps.component').then(m => m.GpsComponent)
      },
      {
        path: 'request-car',
        loadComponent: () => import('./features/request-car/request-car.component').then(m => m.RequestCarComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
