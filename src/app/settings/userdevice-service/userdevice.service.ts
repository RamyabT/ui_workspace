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
 import { Userdevice, UserdeviceMaintanence } from './userdevice.model';
@Injectable()
export class UserdeviceService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Userdevice,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/userdevice');
      let bodyContent = {"userdevice":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Userdevice,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Userdevice|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice/{userId}/{deviceId}');
       httpRequest.addPathParameter('userId', key.userId);
       httpRequest.addPathParameter('deviceId', key.deviceId);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('IAM');

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.userdevice , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Userdevice,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice/{userId}/{deviceId}');
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('deviceId', payload.deviceId);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('IAM');

      let bodyContent = {"userdevice":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Userdevice,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice/{userId}/{deviceId}');
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('deviceId', payload.deviceId);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('IAM');

      let bodyContent = {"userdevice":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Userdevice,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice/{userId}/{deviceId}');
       httpRequest.addPathParameter('userId', payload.userId);
       httpRequest.addPathParameter('deviceId', payload.deviceId);
       httpRequest.setContextPath('IAM');
     httpRequest.setMethod('PUT');
      let bodyContent = {"userdevice":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<UserdeviceMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/userdevice');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('IAM');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<UserdeviceMaintanence>) =>{
             return{
              data:res.body?.userdevice || [],
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
    httpRequest.setResource('/userdevice');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('IAM');

    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('userId', key['userId']);
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
      httpRequest.setResource("/userdevice/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('IAM');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
