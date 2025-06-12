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
 import { IntlSchedule, IntlScheduleMaintanence } from './intlSchedule.model';
@Injectable()
export class IntlScheduleService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: IntlSchedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('POST');
      httpRequest.setResource('/intlSchedule');
      let bodyContent = {"intlSchedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: IntlSchedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<IntlSchedule|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/intlSchedule/{paymentId}');
       httpRequest.addPathParameter('paymentId', key.paymentId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.intlSchedule , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: IntlSchedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/intlSchedule/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"intlSchedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: IntlSchedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/intlSchedule/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"intlSchedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: IntlSchedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/intlSchedule/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"intlSchedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<IntlScheduleMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/intlSchedule');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<IntlScheduleMaintanence>) =>{
             return{
              data:res.body?.intlSchedule || [],
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
    httpRequest.setContextPath('Payments');
    httpRequest.setMethod('GET');
    httpRequest.setResource('/intlSchedule');
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
      httpRequest.setContextPath('Payments');
      httpRequest.setResource("/intlSchedule/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
