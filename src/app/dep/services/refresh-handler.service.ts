// src/app/services/refresh-handler.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class RefreshHandlerService {
  private lastRoute: string = '';

  constructor(private router: Router) {
    // Store the last route the user was on
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.lastRoute = event.url;
    });
  }

  handleRefresh(): void {
    if (window.performance && window.performance.navigation) {
      const navigationType = window.performance.navigation.type;
      let url:string = window?.cordova || window.location.hash ? window.location.hash.substring(1) : window.location.pathname.replace('/dit-dep24-retail', '') + window.location.search;
      if(url && url != "/"){
        sessionStorage.setItem('returnUrl', url);
      }

      switch (navigationType) {
        case PerformanceNavigation.TYPE_NAVIGATE:
          console.log("Page was navigated to.");
          
          break;
        case PerformanceNavigation.TYPE_RELOAD:
          console.log("Page was reloaded.");
          break;
        case PerformanceNavigation.TYPE_BACK_FORWARD:
          console.log("Page was accessed via back/forward history.");
          break;
        default:
          console.log("Unknown navigation type.");
      }
    } else {
      console.log("PerformanceNavigation API not supported.");
    }

    this.router.navigate(['app-launcher']);
  }
}
