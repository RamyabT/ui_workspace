import { Injectable, OnDestroy } from '@angular/core';
import { AppConfigService, CustomMenuService, UserAuthService } from '@dep/services';
import {
  BaseFpxDataService,
  CreateFn,
  CriteriaQuery,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  HttpProviderService,
  IHttpSuccessPayload,
  FpxModal,
  BaseFpxFunctionality,
  FpxModalAfterClosed
} from '@fpx/core';

import {
  map,
  Observable,
  repeatWhen,
  skip,
  Subject,
  takeUntil,
  tap,
  timer,
  BehaviorSubject
} from 'rxjs';
import { Router } from '@angular/router';
import { ActivityMonitor } from 'src/app/dep/services/activity-monitor/activity-monitor.manager';
import { MatDialog } from '@angular/material/dialog';
import { DepSessionAlertComponent } from 'src/app/dep/core/component/dep-session-alert/dep-session-alert.component';
import { CustomerService } from 'src/app/foundation/validator-service/customer.service';
import { APPCONSTANTS } from '@dep/constants';
import { SkinManager } from '@dep/ui';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TestLoginService extends BaseFpxFunctionality implements BaseFpxDataService<unknown>, OnDestroy {
  refreshTokenService!: RefreshTokenService;
  private _signoutCallback: Function | undefined;
  sessionForceCloseTimer!: RefreshTokenService;
  refreshOktaSession$: BehaviorSubject<any> = new BehaviorSubject(null);
  storeCustomerName$: BehaviorSubject<any> = new BehaviorSubject(null);
  public loginFormLoad$: BehaviorSubject<any> = new BehaviorSubject(null);

  
  constructor(
    private _httpProvider: HttpProviderService,
    private _userAuth: UserAuthService,
    private _router: Router,
    private _appConfig: AppConfigService,
    private _activityMonitor: ActivityMonitor,
    private _menuService: CustomMenuService,
    private _customerService: CustomerService,
    private _skinManager: SkinManager
  ) {
    super();
  }

  ngOnDestroy(): void {
    this.refreshTokenService?.stop();
    this.sessionForceCloseTimer?.stop();
  }

  findByKey(payload: unknown): FindByKeyFn<unknown> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery): FindAllFn<unknown> {
    throw new Error('Method not implemented.');
  }
  create(payload: unknown): CreateFn<unknown> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/retail/prelogin');
      httpRequest.setContextPath('IAM');
      httpRequest.setBody(payload);
      httpRequest.setAuthTokenRequired(false);
      httpRequest.addHeaderParamter('Application', 'BO');
      httpRequest.addHeaderParamter('serviceCode', "RETAILLOGIN");

      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          if (res?.body?.authToken) {
            this.onAuthTokenReceived(res?.body);
          }
          return res;
        })
      );
    };
  }
  lookup(key: unknown): LookUpFn<unknown> {
    throw new Error('Method not implemented.');
  }
  modify(payload: unknown): ModifyFn<unknown> {
    throw new Error('Method not implemented.');
  }
  logout(navToLogin: boolean = true, sessionTimOutFlag: boolean = false) {
    this.refreshTokenService?.stop();
    this.sessionForceCloseTimer?.stop();
    this._activityMonitor.stop();
    this._appConfig.clearData();
    this._matDialog.closeAll();

    if (sessionTimOutFlag) {
      this.showSessionTimeout();
    }
    else {
      this._appConfig.appSpinner$.next(true);
    }
    
    if(sessionStorage.getItem('isOktaLogin') == 'true') {
      // this._oktaAuthService.signOut();
      if (this._signoutCallback) this._signoutCallback(sessionTimOutFlag ? 0 : 1);
      navToLogin = false;
    } else if (this._userAuth?.userDetails?.ticket) {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/userLogOut');
      httpRequest.setContextPath('IAM');
      let payload = {
        "ticket": this._userAuth?.userDetails?.ticket
      }
      httpRequest.setBody(payload);
      this._httpProvider.invokeRestApi(httpRequest).subscribe({ next: (res: any) => { } });
    }

    this._userAuth.logout(navToLogin);
  }
  showSessionTimeout() {
    let modal = new FpxModal();
    modal.setComponent(DepSessionAlertComponent);
    modal.setPanelClass("dep-alert-popup");
    modal.setBackDropClass(["dep-popup-back-drop", "session-backdrop", 'bottom-transparent-overlay']);
    modal.setDisableClose(false);
    modal.setData({
      message: "DepSessionAlert.message",
      sessionTimeout: true
    });
    modal.setDisableClose(true);
    modal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(modal);
  }
  flashCardModelAfterClose: FpxModalAfterClosed = (
    payload: any,
    addtionalData: any
  ) => {
    // this._router.navigate(['home']);
    if (sessionStorage.getItem('isOktaLogin') == 'true') {
      this._appConfig.appSpinner$.next(true);
      if (this._signoutCallback) this._signoutCallback();
    }
  };
  clearUserActivity(navToLogin: boolean = true) {
    this._menuService.menuList = undefined;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this._activityMonitor.stop();
    try {
      this.refreshTokenService?.stop();
      this.sessionForceCloseTimer?.stop();
      this._activityMonitor?.stop();
    } catch (err: any) {
      console.error("...");
    }
    this._userAuth.logout(navToLogin);
  }

  onAuthTokenReceived(res: any, signoutCallback: any = undefined) {
    this._signoutCallback = signoutCallback;
    this._userAuth.setUserDetails(res);
    this.invokeRefreshTokenTimer(res?.accessTokenExpiresIn);
    this.sessionForceClose();
    this._activityMonitor.startSessionTime$.subscribe({
      next: () => {
        console.log("start session time")
        this.refreshTokenService.sessionStartTime = new Date().getTime();
      }
    })
    // Initiate session activity watch
    this._activityMonitor.setIdleConfiguration();
    this._activityMonitor.start();
    this.getCustomerDetails();
    this._appConfig.loadMerchant();
    this._appConfig.loadTransactionCat();
  }

  getCustomerDetails() {
    this._customerService.fetchCustomer(sessionStorage.getItem('customerCode'))
      .subscribe((res) => {
        if (res.organizationName) {
          APPCONSTANTS.showOrganizationName = true;
          this._userAuth.organizationName = res.organizationName;
        }
        this.storeCustomerName$.next(res);
        this._userAuth.setCustomerDetails(res);
      });
  }
  sessionForceClose(){
    if(!environment.sessionMaxTime) return;
    this.sessionForceCloseTimer = new RefreshTokenService(environment.sessionMaxTime * 1000);
    this.sessionForceCloseTimer.observable$.subscribe({
      next: () => {
        console.log("Force close session");
        this.sessionForceCloseTimer.stop();
        if (this._signoutCallback) this._signoutCallback(0);
          this.logout(false, true);
      }
    })
    this.sessionForceCloseTimer.start();
  }
  invokeRefreshTokenTimer(expires_in: number = 900) {
    expires_in = environment.IdleTime || 900;
    let refreshTime = (expires_in - 60) * 1000;;
    this.refreshTokenService = new RefreshTokenService(
      refreshTime
    );
    this.refreshTokenService?.observable$.subscribe({
      next: () => {
        if (sessionStorage.getItem('isOktaLogin') == 'true') {
          this.refreshOktaSession$.next(true);
        } else {
          if (this._userAuth.token) {
            this.refreshToken();
          } else {
            this.logout();
          }
        }
      },
    });
    this.refreshTokenService.start();
  }

  refreshToken(claims: any = undefined): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setContextPath('IAM');
    // httpRequest.setResource('/retail/refresh');
    httpRequest.setResource('/session/refresh-token');
    const payload = {
      username: claims.username,
      refreshToken: claims.refreshToken
    }
    httpRequest.setBody(payload);
    this.refreshTokenService?.stop();
    return this._httpProvider.invokeRestApi(httpRequest);
  }

  checkUserDevice(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/userdevice/{userId}/{deviceId}');
    httpRequest.addPathParameter("userId", payload.userId);
    httpRequest.addPathParameter("deviceId", payload.deviceId);
    httpRequest.setContextPath('IAM');

    httpRequest.setBody({});
    return this._httpProvider.invokeRestApi(httpRequest);
  }

}

export class RefreshTokenService {
  public observable$: Observable<any> = new Observable<any>();
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();
  sessionStartTime: number = 0;

  constructor(refreshTime: number = 300000) {
    this.observable$ = timer(refreshTime, refreshTime).pipe(
      map(() => { }),
      takeUntil(this._stop),
      repeatWhen(() => this._start)
    );
  }

  start(): void {
    this._start.next();
  }
  stop(): void {
    this._stop.next();
  }
}
