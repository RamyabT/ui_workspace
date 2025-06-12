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
import { ResetPassword, ResetPasswordMaintanence } from './ResetPassword.model';
import { AppConfigService } from '@dep/services';

@Injectable()
export class ResetPasswordService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService,
  private _appConfig : AppConfigService) { }
  create(payload: ResetPassword,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      let ticket = this._appConfig.getData('ticket');
      const httpRequest = new HttpRequest();
      // httpRequest.setContextPath('iamPublisher');
      httpRequest.setContextPath('IAM');
      httpRequest.setMethod('POST');
      httpRequest.setResource('/reset/password');
      httpRequest.addHeaderParamter('Authorization',ticket);
      let bodyContent = payload
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: ResetPassword,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<ResetPassword|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setContextPath('IAM');
      httpRequest.setResource('/reset/password');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.resetPassword , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: ResetPassword,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setContextPath('IAM');
      httpRequest.setResource('/reset/password');
     httpRequest.setMethod('PUT');
      let bodyContent = {"ResetPassword":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: ResetPassword,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setResource('/reset/password');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"ResetPassword":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: ResetPassword,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setResource('/reset/password');
     httpRequest.setMethod('PUT');
      let bodyContent = {"ResetPassword":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ResetPasswordMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setResource('/reset/password');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ResetPasswordMaintanence>) =>{
             return{
              data:res.body?.ResetPassword || [],
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
    httpRequest.setContextPath('iamPublisher');
    httpRequest.setMethod('GET');
    httpRequest.setResource('/reset/password');
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
      httpRequest.setContextPath('iamPublisher');
      httpRequest.setResource("/reset/password/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
