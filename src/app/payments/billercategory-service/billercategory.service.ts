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
 import { Billercategory, BillercategoryMaintanence } from './billercategory.model';
@Injectable()
export class BillercategoryService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Billercategory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/billercategory');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"billercategory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Billercategory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Billercategory|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billercategory/{categoryCode}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('categoryCode', key.categoryCode);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.billercategory , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Billercategory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billercategory/{categoryCode}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('categoryCode', payload.categoryCode);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"billercategory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Billercategory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billercategory/{categoryCode}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('categoryCode', payload.categoryCode);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('BillPayments');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"billercategory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Billercategory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billercategory/{categoryCode}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('categoryCode', payload.categoryCode);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"billercategory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<BillercategoryMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billercategory');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      // httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BillercategoryMaintanence>) =>{
             return{
              data:res.body?.billercategory || [],
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
    httpRequest.setResource('/billercategory');
    httpRequest.setContextPath('BillPayments');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.setContextPath('OliveHttpEndPoint');
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
      httpRequest.setResource("/billercategory/statistics");
      httpRequest.setContextPath('BillPayments');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
