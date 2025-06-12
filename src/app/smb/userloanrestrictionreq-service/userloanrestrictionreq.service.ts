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
 import { Userloanrestrictionreq, UserloanrestrictionreqMaintanence } from './userloanrestrictionreq.model';
@Injectable()
export class UserloanrestrictionreqService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Userloanrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/userloanrestrictionreq');
      let bodyContent = {"userloanrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Userloanrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Userloanrestrictionreq|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userloanrestrictionreq/{tenantId}/{userId}/{customerCode}/{accountNumber}');
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('userId', key.userId);
       httpRequest.addPathParameter('customerCode', key.customerCode);
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.userloanrestrictionreq , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Userloanrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userloanrestrictionreq/{tenantId}/{userId}/{customerCode}/{accountNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"userloanrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Userloanrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userloanrestrictionreq/{tenantId}/{userId}/{customerCode}/{accountNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"userloanrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Userloanrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userloanrestrictionreq/{tenantId}/{userId}/{customerCode}/{accountNumber}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"userloanrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<UserloanrestrictionreqMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userloanrestrictionreq');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<UserloanrestrictionreqMaintanence>) =>{
             return{
              data:res.body?.userloanrestrictionreq || [],
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
    httpRequest.setResource('/userloanrestrictionreq');
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
      httpRequest.setResource("/userloanrestrictionreq/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
