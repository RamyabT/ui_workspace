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
import { Cobtaxdetails, CobtaxdetailsMaintanence } from './cobtaxdetails.model';
@Injectable()
export class CobtaxdetailsService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Cobtaxdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/cobtaxdetails');
      httpRequest.setContextPath('Customers');
      let bodyContent = {"cobtaxdetails":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Cobtaxdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Cobtaxdetails|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobtaxdetails/{applicantId}/{tenantId}');
       httpRequest.addPathParameter('applicantId', key.applicantId);
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.setContextPath('Customers');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.cobtaxdetails , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,  reasonForNoTin:res.reasonForNoTin?.code,} : null
        }));
        
    };
  }
  modify(payload: Cobtaxdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobtaxdetails/{applicantId}/{tenantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Customers');
     httpRequest.setMethod('PUT');
      let bodyContent = {"cobtaxdetails":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Cobtaxdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobtaxdetails/{applicantId}/{tenantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Customers');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"cobtaxdetails":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Cobtaxdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobtaxdetails/{applicantId}/{tenantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Customers');
     httpRequest.setMethod('PUT');
      let bodyContent = {"cobtaxdetails":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CobtaxdetailsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobtaxdetails');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CobtaxdetailsMaintanence>) =>{
             return{
              data:res.body?.cobtaxdetails || [],
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
    httpRequest.setResource('/cobtaxdetails');
    httpRequest.setContextPath('Customers');
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
      httpRequest.setResource("/cobtaxdetails/statistics");
      httpRequest.setContextPath('Customers');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
