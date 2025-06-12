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
 

@Injectable({
  providedIn: 'root',
})
export class RewardsDetailService extends BaseFpxFunctionality implements BaseFpxDataService<any> {
  public walletSummaryLoad$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _httpProvider: HttpProviderService,
    private _shareInfo: ShareInfo,
    private _translate: TranslateService
  ) {
    super();
  }


  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(  httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<any | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('reward');
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
      httpRequest.setResource('/reward');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }

 
  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/reward');
      // httpRequest.addHeaderParamter('serviceCode', 'RETAILCASACCOUNTSUMMARY');
      // httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.reward;
        })
      );
    };
  }



   

}


