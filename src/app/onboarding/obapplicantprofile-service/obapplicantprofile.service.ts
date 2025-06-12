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
//import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
 import { Obapplicantprofile, ObapplicantprofileMaintanence } from './obapplicantprofile.model';
import { AppConfigService } from '@dep/services';
@Injectable()
export class ObapplicantprofileService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService,private _appConfig : AppConfigService) { }
  create(payload: Obapplicantprofile,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      //let authToken = this._appConfig.getData('authToken');
      const httpRequest = new HttpRequest();
      if(payload.applicantId){
        httpRequest.setResource('/obapplicantprofile/{applicantId}');
        httpRequest.addPathParameter('applicantId', payload.applicantId);
        httpRequest.setMethod('PUT');
      }else{
        httpRequest.setMethod('POST');
        //httpRequest.addHeaderParamter('Authorization',"Bearer " + authToken)
        httpRequest.setResource('/obapplicantprofile');
      }

      let bodyContent = {"obapplicantprofile":payload};
      httpRequest.setContextPath('Customers');
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Obapplicantprofile,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Obapplicantprofile|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantprofile/{applicantId}');
       httpRequest.addPathParameter('applicantId', key.applicantId);
       httpRequest.setContextPath('Customers');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.obapplicantprofile ?? null),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Obapplicantprofile,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantprofile/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
       httpRequest.setContextPath('Customers');
     httpRequest.setMethod('PUT');
      let bodyContent = {"obapplicantprofile":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Obapplicantprofile,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantprofile/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"obapplicantprofile":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Obapplicantprofile,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantprofile/{applicantId}');
       httpRequest.addPathParameter('applicantId', payload.applicantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"obapplicantprofile":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ObapplicantprofileMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/obapplicantprofile');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ObapplicantprofileMaintanence>) =>{
             return{
              data:res.body?.obapplicantprofile || [],
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
    httpRequest.setResource('/obapplicantprofile');
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
      httpRequest.setResource("/obapplicantprofile/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
