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
 import { EmploymentInfo, EmploymentInfoMaintanence } from './employmentInfo.model';
@Injectable()
export class EmploymentInfoService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: EmploymentInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('Customers'); 
      httpRequest.setResource('/employmentInfo');
      httpRequest.addHeaderParamter("serviceCode", "RETAILEMPLOYMENTINFO");
      let bodyContent = {"employmentInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: EmploymentInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<EmploymentInfo|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/employmentInfo/{applicantId}');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Customers'); 
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.employmentInfo , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,  employmentType:res.employmentType?.code, subemptype:res.subemptype?.subEmpTypeCode, empstatus:res.empstatus?.code, occupationType:res.occupationType?.code, designation:res.designation?.code, empsoi:res.empsoi?.code,} : null
        }));
        
    };
  }
  modify(payload: EmploymentInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/employmentInfo/{applicantId}');
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Customers'); 
      let bodyContent = {"employmentInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: EmploymentInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/employmentInfo/{tenantId}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('Customers'); 
      let bodyContent = {"employmentInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: EmploymentInfo,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/employmentInfo/{applicantId}');
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Customers'); 
      let bodyContent = {"employmentInfo":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<EmploymentInfoMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/employmentInfo');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Customers'); 
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<EmploymentInfoMaintanence>) =>{
             return{
              data:res.body?.employmentInfo || [],
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
    httpRequest.setContextPath('Customers'); 
    httpRequest.setResource('/employmentInfo');
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
      httpRequest.setResource("/employmentInfo/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Customers'); 
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
