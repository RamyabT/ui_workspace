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
  FpxIHttpOption
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import { map, Observable, of,catchError } from 'rxjs';
 import { Membership, MembershipMaintanence } from './membership.model';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { APPCONSTANTS } from '@dep/constants';
@Injectable()
export class MembershipService implements BaseFpxDataService<any> {
 constructor(
  private _httpProvider : HttpProviderService,
  private _shareInfo: ShareInfo,
  private _translate: TranslateService
) { }
  create(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/membership');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Membership|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
      httpRequest.setContextPath('Accounts');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILMEMBERSHIP');
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.membership , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<MembershipMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILMEMBERSHIPSUMM');
      httpRequest.setContextPath('Accounts');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<MembershipMaintanence>) =>{
             return{
              data:res.body?.membership || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/membership');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/membership/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  shareAccountInfo(cardData: Membership, doShowToast = true) {
    let accountInfo: string = APPCONSTANTS.shareAccountInfoData(cardData);
    this._shareInfo.shareInfo(accountInfo, this._translate.instant('CASASUMMARYCARD.shareSuccess'), doShowToast);
  }

  fetchMemberShipAccounts(): Observable<Membership[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/membership');
    httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILMEMBERSHIPSUMM');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.membership;
      })
    );
  }
  
}
