import { RoutingService } from '../../services/routing/routing.service';
import { AuthService } from '../../services/auth/auth.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const routingService = inject(RoutingService);

  const isUserLoggedIn = authService.isLoggedIn();

  if (isUserLoggedIn) {
    return true; // allow navigation
  }

  routingService.goToLoginPage(); // Send user to login page.

  return false;
};