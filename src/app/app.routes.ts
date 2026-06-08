import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

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
    canActivate: [authGuard],
    children: [
      {
        path: 'listing',
        loadComponent: () => import('./features/listing/listing.component').then(m => m.ListingComponent),
        data: { vehicleType: 'Car' }
      },
      {
        path: 'delivery-cars',
        loadComponent: () => import('./features/listing/listing.component').then(m => m.ListingComponent),
        data: { vehicleType: 'Delivery' }
      },
      {
        path: 'used-car',
        loadComponent: () => import('./features/listing/listing.component').then(m => m.ListingComponent),
        data: { vehicleType: 'Used' }
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
        path: 'booking-list',
        loadComponent: () => import('./features/booking-list/booking-list.component').then(m => m.BookingListComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
        canActivate: [authGuard]
      },
      {
        path: 'user-management',
        loadComponent: () => import('./features/user-management/user-management.component').then(m => m.UserManagementComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'repairs',
        loadComponent: () => import('./features/repairs/repairs.component').then(m => m.RepairsComponent)
      },
      {
        path: 'garage-crm',
        loadComponent: () => import('./features/garage-crm/garage-crm.component').then(m => m.GarageCrmComponent)
      },
      {
        path: 'lavage',
        loadComponent: () => import('./features/lavage/lavage.component').then(m => m.LavageComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard],
        data: { roles: ['admin'] }
      },
      {
        path: 'driver-dashboard',
        loadComponent: () => import('./features/driver-dashboard/driver-dashboard.component').then(m => m.DriverDashboardComponent)
      }
    ]
  }
];
