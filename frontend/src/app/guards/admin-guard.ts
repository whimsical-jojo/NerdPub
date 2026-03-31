import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) {
    router.navigate(['/homepage']);
    return false;
  }

  if (auth.currentUser()!.role !== 'ADMIN') {
    router.navigate(['/homepage']);
    return false;
  }

  return true;
};
