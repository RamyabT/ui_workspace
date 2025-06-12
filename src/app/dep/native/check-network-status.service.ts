import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, fromEvent, map, merge, mergeMap, observable, of } from 'rxjs';
declare let window: any;
declare let cordova: any;

@Injectable({
  providedIn: 'root'
})
export class CheckNetworkStatusService {
    networkStatus: any;
    // networkStatus$: Subscription = Subscription.EMPTY;

  constructor(){}

  checkNetworkStatus():Observable<any> {
      this.networkStatus = navigator.onLine;
    return merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map((status) => {
        this.networkStatus = status;
        return navigator.onLine
      }));
  }
}
