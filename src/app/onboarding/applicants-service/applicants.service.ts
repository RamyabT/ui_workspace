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
 import { Applicants, ApplicantsMaintanence } from './applicants.model';
import { environment } from 'src/environments/environment';
@Injectable()
export class ApplicantsService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Applicants,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
     httpRequest.setResource('/casa/onboarding/initiate');
      httpRequest.addHeaderParamter('version','24.2');
      let bodyContent = {"applicants":payload};
      //  httpRequest.setResource('/applicants');
      httpRequest.setContextPath('Customers');
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Applicants,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Applicants|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/applicants/{applicantId}');
       httpRequest.addPathParameter('applicantId', key.applicantId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.applicants , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,  maritalStatus:res.maritalStatus?.code, channel:res.channel?.code, residentstatus:res.residentstatus?.lovCode,} : null
        }));
        
    };
  }
  modify(payload: Applicants,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/applicants/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"applicants":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Applicants,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/applicants/{tenantId}/{applicantId}');
      httpRequest.setResource('/applicants/{applicantId}');
      //  httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"applicants":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Applicants,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/applicants/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"applicants":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ApplicantsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/applicants');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ApplicantsMaintanence>) =>{
             return{
              data:res.body?.applicants || [],
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
    httpRequest.setResource('/applicants');
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
      httpRequest.setResource("/applicants/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  // mobile(key: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
  //   return () => {

  //     const httpRequest = new HttpRequest();
  // httpRequest.setMethod('POST');
  // httpRequest.setResource('/dedupe');
  // httpRequest.setContextPath('Customers');
  // let bodyContent = {"mobileNumber":key['mobileNumber'],"emailAddress":key['emailAddress'] };
  // httpRequest.setBody(bodyContent);
  // return this._httpProvider.invokeRestApi(httpRequest,httpOption);
  //   };
  // }


}
