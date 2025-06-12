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
 import { Loancalc, LoancalcMaintanence } from './loancalc.model';
@Injectable()
export class LoancalcService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Loancalc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/loancalc');
      httpRequest.setContextPath('Loans');
      let bodyContent = {"loancalc":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Loancalc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loancalc|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loancalc/{inventoryNumber}');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Loans');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loancalc , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Loancalc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loancalc/{inventoryNumber}');
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Loans');
      let bodyContent = {"loancalc":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Loancalc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loancalc/{loanType}');
      httpRequest.setContextPath('Loans');
       httpRequest.addPathParameter('loanType', payload.loanType);
       httpRequest.setContextPath('Loans');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"loancalc":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Loancalc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loancalc/{inventoryNumber}');
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Loans');
      let bodyContent = {"loancalc":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<LoancalcMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loancalc');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Loans');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<LoancalcMaintanence>) =>{
             return{
              data:res.body?.loancalc || [],
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
    httpRequest.setResource('/loancalc');
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Loans');
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }


  loanTypelookup(id:string) {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Loans');
      httpRequest.setResource('/loanproducts/'+id);
      httpRequest.addQueryParameter('lookup', 1);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }


  
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/loancalc/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Loans');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
