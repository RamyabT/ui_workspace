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
 import { Wallettranlimit, WallettranlimitMaintanence } from './wallettranlimit.model';
@Injectable()
export class WallettranlimitService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Wallettranlimit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/wallettranlimit');
      httpRequest.setContextPath('Accounts');
      httpRequest.addHeaderParamter('serviceCode','RETAILWALLETLIMIT')
      let bodyContent = {"wallettranlimit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Wallettranlimit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Wallettranlimit|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettranlimit/{tenantId}/{inventoryNumber}');
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.wallettranlimit , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Wallettranlimit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettranlimit/{tenantId}/{inventoryNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallettranlimit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Wallettranlimit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettranlimit/{tenantId}/{inventoryNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"wallettranlimit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Wallettranlimit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettranlimit/{tenantId}/{inventoryNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallettranlimit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<WallettranlimitMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettranlimit');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<WallettranlimitMaintanence>) =>{
             return{
              data:res.body?.wallettranlimit || [],
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
    httpRequest.setResource('/wallettranlimit');
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
      httpRequest.setResource("/wallettranlimit/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  

  fetchWalletLimits(productCode:any){
    const httpRequest = new HttpRequest();
   httpRequest.addPathParameter("productcode",'056')
   httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter('serviceCode','RETAILWALLETPARAM')
      httpRequest.setResource("/walletparams");
     httpRequest.setMethod("GET");

      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
              return of(err ?? null)
            }));

  }



  
}
