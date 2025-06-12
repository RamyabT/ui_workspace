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
import { map, Observable, of,catchError, Subject } from 'rxjs';
 import { TempScheduleRep, TempScheduleRepMaintanence } from './tempScheduleRep.model';
@Injectable({
  providedIn: 'root'
})
export class TempScheduleRepService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
  
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: TempScheduleRep,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep');
      let bodyContent = {"tempScheduleRep":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: TempScheduleRep,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<TempScheduleRep|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep/{paymentId}');
       httpRequest.addPathParameter('paymentId', key.paymentId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.tempScheduleRep , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: TempScheduleRep,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tempScheduleRep":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: TempScheduleRep,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"tempScheduleRep":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: TempScheduleRep,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep/{paymentId}');
       httpRequest.addPathParameter('paymentId', payload.paymentId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tempScheduleRep":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<TempScheduleRepMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/tempScheduleRep');
      httpRequest.setMethod('GET');
      criteriaQuery.addSortCriteria("paymentDate", "desc", "String");
      criteriaQuery.setPageOffset(Math.ceil(Number(criteriaQuery.getPageOffset()) / criteriaQuery.getPageCount()) + "");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode','RETAILVIEWSCHEDULETRANSFER');

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<TempScheduleRepMaintanence>) =>{
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }

              return {
                data: res.body?.tempScheduleRep || [],
                totalRowCount: res.headers.get('Totalrowcount'),
                status: 200
              }
            }

          ) ?? null, catchError((res: any) => {
            return of({
              data: res,
              status: res.status
            });
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
    httpRequest.setResource('/tempScheduleRep');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.addHeaderParamter('serviceCode','RETAILVIEWSCHEDULETRANSFER');
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
      httpRequest.setResource("/tempScheduleRep/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
