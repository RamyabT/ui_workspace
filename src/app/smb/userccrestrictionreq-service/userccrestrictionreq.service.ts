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
 import { Userccrestrictionreq, UserccrestrictionreqMaintanence } from './userccrestrictionreq.model';
@Injectable()
export class UserccrestrictionreqService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Userccrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/userccrestrictionreq');
      let bodyContent = {"userccrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Userccrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Userccrestrictionreq|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userccrestrictionreq/{tenantId}/{userId}/{customerCode}/{cardRef}');
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('userId', key.userId);
       httpRequest.addPathParameter('customerCode', key.customerCode);
       httpRequest.addPathParameter('cardRef', key.cardRef);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.userccrestrictionreq , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Userccrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userccrestrictionreq/{tenantId}/{userId}/{customerCode}/{cardRef}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('cardRef', payload.cardRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"userccrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Userccrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userccrestrictionreq/{tenantId}/{userId}/{customerCode}/{cardRef}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('cardRef', payload.cardRef);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"userccrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Userccrestrictionreq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userccrestrictionreq/{tenantId}/{userId}/{customerCode}/{cardRef}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('customerCode', payload.customerCode);
       httpRequest.addPathParameter('cardRef', payload.cardRef);
     httpRequest.setMethod('PUT');
      let bodyContent = {"userccrestrictionreq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<UserccrestrictionreqMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userccrestrictionreq');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<UserccrestrictionreqMaintanence>) =>{
             return{
              data:res.body?.userccrestrictionreq || [],
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
    httpRequest.setResource('/userccrestrictionreq');
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
      httpRequest.setResource("/userccrestrictionreq/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
