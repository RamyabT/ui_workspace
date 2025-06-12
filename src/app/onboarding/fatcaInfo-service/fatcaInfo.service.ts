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
import { FatcaInfo, FatcaInfoMaintanence } from './fatcaInfo.model';
@Injectable()
export class FatcaInfoService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: FatcaInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/fatcaInfo');
      let bodyContent = {"fatcaInfo":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Customers');
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: FatcaInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<FatcaInfo|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/fatcaInfo/{applicantId}');
       httpRequest.addPathParameter('applicantId', key.applicantId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.fatcaInfo ?? null), map((res:any) => {
          return res ? {...res,  countryOfBirth:res.countryOfBirth?.countryCode, countryOfTax:res.countryOfTax?.countryCode,} : null
        }),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: FatcaInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/fatcaInfo/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"fatcaInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: FatcaInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/fatcaInfo/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"fatcaInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: FatcaInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/fatcaInfo/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"fatcaInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<FatcaInfoMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/fatcaInfo');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<FatcaInfoMaintanence>) =>{
             return{
              data:res.body?.fatcaInfo || [],
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
    httpRequest.setResource('/fatcaInfo');
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
      httpRequest.setResource("/fatcaInfo/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
