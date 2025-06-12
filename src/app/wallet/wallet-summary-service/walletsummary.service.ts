import { Injectable, EventEmitter } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  PatchFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData,
  FpxIHttpOption,
  BaseFpxFunctionality
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of, catchError, BehaviorSubject } from 'rxjs';
// import { Casaaccount } from './casaaccount.model';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { APPCONSTANTS } from '@dep/constants';
 import { wallet, Walletsummary } from './walletsummary.model';


@Injectable({
  providedIn: 'root',
})
export class WalletsummaryService extends BaseFpxFunctionality implements BaseFpxDataService<any> {
  public walletSummaryLoad$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _httpProvider: HttpProviderService,
    private _shareInfo: ShareInfo,
    private _translate: TranslateService
  ) {
    super();
  }

  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/casaaccount');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCASACCOUNTSUMMARY');
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.casaaccount;
        })
      );
    };
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: wallet, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Walletsummary | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet/{accountNumber}');
     httpRequest.addPathParameter('accountNumber', key.walletAccountNumber);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILWALLET');
      httpRequest.setContextPath('Accounts');
      this.showSpinner();
      return this._httpProvider.invokeRestApi(httpRequest, httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          this.hideSpinner();
          return res.body?.wallet ?? null
        }),
      );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/casaaccount');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }

 


      fetchWalletSummary(): Observable<Walletsummary[]> {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/wallet');
      httpRequest.setContextPath('Accounts');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILWALLETSUMMARY');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.wallet ;
        })
      );
    }

   

}


