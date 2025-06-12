import { Injectable, OnDestroy } from '@angular/core';
import { UserAuthService } from '@dep/services';
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
  IHttpSuccessPayload
} from '@fpx/core';

import {
  catchError,
  map,
  Observable,
  of,
  repeatWhen,
  skip,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NPSSLoginService implements BaseFpxDataService<unknown>, OnDestroy {
  refreshTokenService!: RefreshTokenService;
  constructor(
    private _httpProvider: HttpProviderService,
    private _userAuth: UserAuthService
  ) {}

  ngOnDestroy(): void {
    this.refreshTokenService.stop();
  }

  refreshToken() {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setContextPath('retail_defaultContext');
    httpRequest.setResource('/iams/refresh');
    const payload = {
      iamrefresh: {
        userName: sessionStorage.getItem('username'),
        refreshToken: this._userAuth.userDetails.refreshToken
      }
    }
    httpRequest.setBody(payload);
    this._httpProvider.invokeRestApi(httpRequest).subscribe({
      next: (res: IHttpSuccessPayload<any>) => {
        this._userAuth.setUserDetails({
          ...this._userAuth.userDetails,
          authToken: res.body.authToken,
          refreshToken: res.body.refreshToken
        });
      },
    });
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
      httpRequest.setResource('/npss/login');
      httpRequest.setContextPath('IAM');
      httpRequest.setBody(payload);
      httpRequest.setAuthTokenRequired(false);
      httpRequest.addHeaderParamter('Application','BO');
      httpRequest.addHeaderParamter('serviceCode', "RETAILNPSSLOGIN");

      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        tap((res: IHttpSuccessPayload<any>) => {
          this._userAuth.setUserDetails(res.body);
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

  logout() {
    this.refreshTokenService?.stop();
    this._userAuth.logout();
  }

  validateNPSSCustomer(clientId: any, token: any, response_type: any, redirect_uri: any,scope:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/SCAvalidateCustomer");
    httpRequest.setContextPath('IAM');
    httpRequest.addHeaderParamter("serviceCode","RETAILSCAVALIDCUST");
    httpRequest.setMethod("POST");
    let bodyContent = {
      "verifyToken": {
        "clientId": clientId,
        "token": token,
        "response_type": response_type,
        "redirect_uri": redirect_uri,
        "scope":scope

      }


    };
    httpRequest.setBody(bodyContent);
    // return this._httpProvider.invokeRestApi(httpRequest).pipe(
    //   tap((res: IHttpSuccessPayload<any>) => {
    //     this._userAuth.setUserDetails(res.body);
    //     // this.invokeRefreshTokenTimer(res.body?.loginauth.expires_in);
    //   })
    // );
    return this._httpProvider
    .invokeRestApi(httpRequest)
    .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
      return of(err ?? null)
    }));
  }


  invokeRefreshTokenTimer(expires_in: number) {
    this.refreshTokenService = new RefreshTokenService(
      50000
    );
    this.refreshTokenService?.observable$.subscribe({
      next: () => {
        if (this._userAuth.token) {
          this.refreshToken();
        } else {
          this.refreshTokenService.stop();
        }
      },
    });
  }
}

export class RefreshTokenService {
  public observable$: Observable<any> = new Observable<any>();
  private readonly _stop = new Subject<void>();
  private readonly _start = new Subject<void>();

  constructor(refreshTime: number = 300000) {
    this.observable$ = timer(refreshTime, refreshTime).pipe(
      map(() => {}),
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
