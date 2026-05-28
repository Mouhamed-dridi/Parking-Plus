import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'listing',
        loadComponent: () => import('./features/listing/listing.component').then(m => m.ListingComponent)
      },
      {
        path: 'listing/:id',
        loadComponent: () => import('./features/car-details/car-details.component').then(m => m.CarDetailsComponent)
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
        path: 'request-car',
        loadComponent: () => import('./features/request-car/request-car.component').then(m => m.RequestCarComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'repairs',
        loadComponent: () => import('./features/repairs/repairs.component').then(m => m.RepairsComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
