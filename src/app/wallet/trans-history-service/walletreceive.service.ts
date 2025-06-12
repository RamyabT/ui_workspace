 


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
import { Transactionhistorymaintainence, wallettransactiondtls } from './transactionhistory.model';
import { Transactionreceivemaintainence, walletreceivedinfo } from './walletreceive.model';
import { AppConfigService } from '@dep/services';
@Injectable({
  providedIn: 'root'
})

export class WalletreceiveService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
 constructor(private _httpProvider : HttpProviderService , private _appConfig : AppConfigService) { }
  create(payload: wallettransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/wallettransactiondtls');
      let bodyContent = {"wallettransactiondtls":payload};
      httpRequest.setContextPath('Payments');
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: wallettransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<wallettransactiondtls|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/walletreceivedinfo/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', key.transactionReference);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.wallettransactiondtls , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: wallettransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettransactiondtls/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallettransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: wallettransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettransactiondtls/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.transactionReference);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"wallettransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: wallettransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/wallettransactiondtls/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"wallettransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
  findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/walletreceivedinfo');
        httpRequest.setMethod('GET');
       httpRequest.addQueryParameter('walletId', this._appConfig.getData('walletID'));
         httpRequest.setContextPath('Accounts');
        // criteriaQuery.setPageCount(1000)
         // httpRequest.setCriteriaQuery(criteriaQuery);
        return this._httpProvider
          .invokeRestApi(httpRequest,httpOption)
          .pipe(
            map(
              (res: IHttpSuccessPayload<Transactionreceivemaintainence>) =>{
               return{
                data:res.body.walletreceivedinfo?.walletreceivedinfo || [],
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
    httpRequest.setResource('/wallettransactiondtls');
    httpRequest.setContextPath('Payments');
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
      httpRequest.setResource("/wallettransactiondtls/statistics");
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
