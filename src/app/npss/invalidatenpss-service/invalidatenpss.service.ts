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
 import { Invalidatenpss, InvalidatenpssMaintanence } from './invalidatenpss.model';
@Injectable()
export class InvalidatenpssService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Invalidatenpss,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/invalidatenpss');
      let bodyContent = {"invalidatenpss":payload};
      httpRequest.setContextPath("Payments");
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Invalidatenpss,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Invalidatenpss|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/invalidatenpss/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.invalidatenpss , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Invalidatenpss,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/invalidatenpss/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"invalidatenpss":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Invalidatenpss,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/invalidatenpss/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"invalidatenpss":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Invalidatenpss,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/invalidatenpss/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"invalidatenpss":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<InvalidatenpssMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/invalidatenpss');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<InvalidatenpssMaintanence>) =>{
             return{
              data:res.body?.invalidatenpss || [],
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
    httpRequest.setResource('/invalidatenpss');
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
      httpRequest.setResource("/invalidatenpss/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
