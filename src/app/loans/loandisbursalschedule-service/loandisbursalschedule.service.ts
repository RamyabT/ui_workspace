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
 import { Loandisbursalschedule, LoandisbursalscheduleMaintanence } from './loandisbursalschedule.model';
@Injectable()
export class LoandisbursalscheduleService implements BaseFpxDataService<any> {
  accountNumber: any;
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Loandisbursalschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/loandisbursalschedule');
      httpRequest.setContextPath('Loans');
      let bodyContent = {"loandisbursalschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Loandisbursalschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loandisbursalschedule|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loandisbursalschedule/{loanAccountNumber}');
      httpRequest.setContextPath('Loans');
       httpRequest.addPathParameter('loanAccountNumber', key.loanAccountNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loandisbursalschedule , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Loandisbursalschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loandisbursalschedule/{loanAccountNumber}');
      httpRequest.setContextPath('Loans');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"loandisbursalschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Loandisbursalschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loandisbursalschedule/{loanAccountNumber}');
      httpRequest.setContextPath('Loans');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"loandisbursalschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Loandisbursalschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loandisbursalschedule/{loanAccountNumber}');
      httpRequest.setContextPath('Loans');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"loandisbursalschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<LoandisbursalscheduleMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loandisbursalschedule');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Loans');
      httpRequest.addQueryParameter('loanAccountNumber',this.accountNumber);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANDISBURSALSCHEDULE')
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<LoandisbursalscheduleMaintanence>) =>{
             return{
              data:res.body?.loandisbursalschedule || [],
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
    httpRequest.setContextPath('Loans');
    httpRequest.setResource('/loandisbursalschedule');
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
      httpRequest.setResource("/loandisbursalschedule/statistics");
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
