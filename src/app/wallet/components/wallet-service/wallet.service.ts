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
 import { Wallet, WalletMaintanence } from './wallet.model';
@Injectable()
export class WalletService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Wallet,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/wallet');
      httpRequest.setContextPath('Accounts');
      let bodyContent = {"wallet":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Wallet,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Wallet|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet/{walletId}');
       httpRequest.addPathParameter('walletId', key.walletId);
       httpRequest.addHeaderParamter('serviceCode', 'RETAILWALLET');
       httpRequest.setContextPath('Accounts');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.wallet , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Wallet,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet/{tenantId}/{customerCode}/{walletId}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.setContextPath('Accounts');
       httpRequest.addPathParameter('walletId', payload.walletId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallet":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Wallet,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet/{tenantId}/{customerCode}/{walletId}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('walletId', payload.walletId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"wallet":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Wallet,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet/{tenantId}/{customerCode}/{walletId}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('walletId', payload.walletId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallet":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<WalletMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode', 'RETAILWALLETSUMMARY');
      httpRequest.setContextPath('Accounts');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<WalletMaintanence>) =>{
             return{
              data:res.body?.wallet || [],
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
    httpRequest.setResource('/wallet');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Accounts');
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
      httpRequest.setResource("/wallet/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

  downloadWalletSummaryPDF(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadWalletSummary");
    httpRequest.setContextPath('Wallet');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILDWNLDWALLETSUMMARY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadWalletSummaryCSV(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadWalletSummary");
    httpRequest.setContextPath('Wallet');
    httpRequest.addQueryParameter('fileType', 'CSV');
    httpRequest.addHeaderParamter('serviceCode','RETAILDWNLDWALLETSUMMARY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  fetchWallets(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallet');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILWALLETSUMMARY');
      httpRequest.setContextPath('Accounts');
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(
          map(
            (res: IHttpSuccessPayload<any>) => {
              return res.body?.wallet
            }
          )
        );
    };
  }
  
}
