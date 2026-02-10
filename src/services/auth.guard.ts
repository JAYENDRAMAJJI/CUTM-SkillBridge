import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { StoreService } from './store.service';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private auth: AuthService, private store: StoreService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated() || this.store.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeService = inject(StoreService);
  const router = inject(Router);

  if (authService.isAuthenticated() || !!storeService.currentUser()) {
    return true;
  }
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeService = inject(StoreService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated() || !!storeService.currentUser();
  const role = authService.getCurrentUser()?.role || storeService.userRole();
  
  if (!isAuth) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  if (role === 'admin') {
    return true;
  }
  router.navigate(['/']);
  return false;
};

export const trainerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeService = inject(StoreService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated() || !!storeService.currentUser();
  const role = authService.getCurrentUser()?.role || storeService.userRole();
  
  if (!isAuth) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  if (role === 'trainer') {
    return true;
  }
  router.navigate(['/']);
  return false;
};

export const recruiterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeService = inject(StoreService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated() || !!storeService.currentUser();
  const role = authService.getCurrentUser()?.role || storeService.userRole();
  
  if (!isAuth) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  if (role === 'recruiter') {
    return true;
  }
  router.navigate(['/']);
  return false;
};

export const studentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeService = inject(StoreService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated() || !!storeService.currentUser();
  const role = authService.getCurrentUser()?.role || storeService.userRole();
  
  if (!isAuth) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  if (role === 'student') {
    return true;
  }
  router.navigate(['/']);
  return false;
};
