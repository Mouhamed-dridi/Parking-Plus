import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && !allowedRoles.includes(authService.getRole())) {
    return router.createUrlTree(['/listing']);
  }

  return true;
};
