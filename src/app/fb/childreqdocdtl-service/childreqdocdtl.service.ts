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
 import { Childreqdocdtl, ChildreqdocdtlMaintanence } from './childreqdocdtl.model';
@Injectable()
export class ChildreqdocdtlService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Childreqdocdtl,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/childreqdocdtl');
      let bodyContent = {"childreqdocdtl":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Childreqdocdtl,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Childreqdocdtl|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/childreqdocdtl/{inventoryNumber}/{tenantId}/{serialNo}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('serialNo', key.serialNo);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.childreqdocdtl , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Childreqdocdtl,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/childreqdocdtl/{inventoryNumber}/{tenantId}/{serialNo}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('serialNo', payload.serialNo);
     httpRequest.setMethod('PUT');
      let bodyContent = {"childreqdocdtl":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Childreqdocdtl,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/childreqdocdtl/{inventoryNumber}/{tenantId}/{serialNo}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('serialNo', payload.serialNo);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"childreqdocdtl":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Childreqdocdtl,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/childreqdocdtl/{inventoryNumber}/{tenantId}/{serialNo}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('serialNo', payload.serialNo);
     httpRequest.setMethod('PUT');
      let bodyContent = {"childreqdocdtl":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ChildreqdocdtlMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/childreqdocdtl');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ChildreqdocdtlMaintanence>) =>{
             return{
              data:res.body?.childreqdocdtl || [],
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
    httpRequest.setResource('/childreqdocdtl');
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
      httpRequest.setResource("/childreqdocdtl/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
