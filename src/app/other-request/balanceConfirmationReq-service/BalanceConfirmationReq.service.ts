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
 import { BalanceConfirmationReq, BalanceConfirmationReqMaintanence } from './BalanceConfirmationReq.model';
@Injectable()
export class BalanceConfirmationReqService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: BalanceConfirmationReq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/BalanceConfirmationReq');
      let bodyContent = {"BalanceConfirmationReq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: BalanceConfirmationReq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<BalanceConfirmationReq|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/BalanceConfirmationReq/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.BalanceConfirmationReq , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res} : null
        }));
        
    };
  }
  modify(payload: BalanceConfirmationReq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/BalanceConfirmationReq/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"BalanceConfirmationReq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: BalanceConfirmationReq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/BalanceConfirmationReq/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"BalanceConfirmationReq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: BalanceConfirmationReq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/BalanceConfirmationReq/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"BalanceConfirmationReq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<BalanceConfirmationReqMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/BalanceConfirmationReq');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BalanceConfirmationReqMaintanence>) =>{
             return{
              data:res.body?.BalanceConfirmationReq || [],
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
    httpRequest.setResource('/BalanceConfirmationReq');
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
      httpRequest.setResource("/BalanceConfirmationReq/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
