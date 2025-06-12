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
 import { Schedulebillpayment, SchedulebillpaymentMaintanence } from './schedulebillpayment.model';
@Injectable({
  providedIn: 'root'
})
export class SchedulebillpaymentService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Schedulebillpayment,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/schedulebillpaymentslog');
      httpRequest.addHeaderParamter('serviceCode','RETAILSCHBILLPAYMENTS');
      httpRequest.setContextPath('BillPayments');
      let bodyContent = {"schedulebillpaymentslog":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Schedulebillpayment,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Schedulebillpayment|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/schedulebillpayment/{billRef}');
       httpRequest.addPathParameter('billRef', key.billRef);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.schedulebillpayment , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Schedulebillpayment,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/schedulebillpayment/{billRef}');
       httpRequest.addPathParameter('billRef', payload.billRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"schedulebillpayment":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Schedulebillpayment,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/schedulebillpayment/{billRef}');
       httpRequest.addPathParameter('billRef', payload.billRef);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"schedulebillpayment":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Schedulebillpayment,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/schedulebillpayment/{billRef}');
       httpRequest.addPathParameter('billRef', payload.billRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"schedulebillpayment":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<SchedulebillpaymentMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewscheduledbills');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('BillPayments')
      // httpRequest.addHeaderParamter('serviceCode', 'RETAILSCHBILLPAYMENT');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<SchedulebillpaymentMaintanence>) =>{
             return{
              data:res.body?.viewscheduledbills || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          ) ?? null, catchError((res: any) => {
            return of({
              data: res.error
            } ?? null)
          }
          ));
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/schedulebillpayment');
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
      httpRequest.setResource("/schedulebillpayment/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
