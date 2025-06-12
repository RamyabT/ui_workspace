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
 import { Tranhistory, TranhistoryMaintanence } from './tranhistory.model';
@Injectable()
export class TranhistoryService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Tranhistory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/tranhistory');
      let bodyContent = {"tranhistory":payload};
      httpRequest.setContextPath('Payments');
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Tranhistory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Tranhistory|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tranhistory/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', key.flowInstanceId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.tranhistory , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Tranhistory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tranhistory/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.flowInstanceId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tranhistory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Tranhistory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tranhistory/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.flowInstanceId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"tranhistory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Tranhistory,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tranhistory/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.flowInstanceId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tranhistory":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<TranhistoryMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tranhistory');
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<TranhistoryMaintanence>) =>{
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }
              
             return{
              data:res.body?.tranhistory || [],
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
    httpRequest.setResource('/tranhistory');
    httpRequest.setContextPath('Payments');
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
      httpRequest.setResource("/tranhistory/statistics");
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
