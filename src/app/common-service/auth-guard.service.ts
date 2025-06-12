import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { UserAuthService } from '../dep/services/user-auth/user-auth.service';
import { Observable } from 'rxjs';
import { APPCONSTANTS } from '@dep/constants';
import { DepOktaAuthGuard } from '../okta-integration/guard/dep-okta-auth.guard';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isOktaLogin: boolean = false;
  constructor(private router:Router, private authService: AuthService ,
    private userAuthService : UserAuthService,
    private depOktaAuthGuard: DepOktaAuthGuard
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    if(sessionStorage.getItem('isOktaLogin') == 'true') {
      return this.depOktaAuthGuard.canActivate(route, state);
    } else {
      if (!this.userAuthService.isLoggedIn || this.userAuthService.accessDenied) {
        this.router.navigate(APPCONSTANTS.redirectOnAuthFailure);
      }
      return this.userAuthService.isLoggedIn;
    }
    
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
