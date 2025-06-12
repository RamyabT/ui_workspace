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
 import { Changempin, ChangempinMaintanence } from './changempin.model';
@Injectable()
export class ChangempinService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Changempin,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/changeMpin');
      httpRequest.setContextPath('Common');
      let bodyContent = {"changeMpin":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Changempin,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Changempin|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/changeMpin/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.changempin , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Changempin,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/changeMpin/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"changeMpin":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Changempin,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/changeMpin/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"changeMpin":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Changempin,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/changeMpin/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('OliveHttpEndPoint');
      let bodyContent = {"changeMpin":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ChangempinMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/changeMpin');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ChangempinMaintanence>) =>{
             return{
              data:res.body?.changempin || [],
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
    httpRequest.setResource('/changeMpin');
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
      httpRequest.setResource("/changeMpin/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('OliveHttpEndPoint');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
