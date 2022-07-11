import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, public router: RouterService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.authService.isValidUser$().pipe(
      tap((isActive) => {
        // console.log('AuthGuard canActivate: ' + isActive);
        if (!isActive) {
          this.router.navigateToLogin();
        }
      })
    );
  }
}
