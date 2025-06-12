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
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
 import { Stopcheque, StopchequeMaintanence } from './stopcheque.model';
@Injectable()
export class StopchequeService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Stopcheque,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/stopcheque');
      httpRequest.setContextPath('Accounts');
      let bodyContent = {"stopcheque":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Stopcheque,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Stopcheque|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/stopcheque/{relatedReference}');
      httpRequest.setContextPath('Accounts');
      httpRequest.addPathParameter('relatedReference', key.relatedReference);
      httpRequest.addHeaderParamter('serviceCode','RETAILSTOPCHEQUEDETAILS');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.stopcheque , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Stopcheque,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/stopcheque/{relatedReference}/{accountNumber}');
      httpRequest.setContextPath('Accounts');
       httpRequest.addPathParameter('relatedReference', payload.relatedReference);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"stopcheque":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Stopcheque,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/stopcheque/{relatedReference}/{accountNumber}');
      httpRequest.setContextPath('Accounts');
       httpRequest.addPathParameter('relatedReference', payload.relatedReference);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"stopcheque":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Stopcheque,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/stopcheque/{relatedReference}/{accountNumber}');
      httpRequest.setContextPath('Accounts');
       httpRequest.addPathParameter('relatedReference', payload.relatedReference);
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"stopcheque":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<StopchequeMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/stopcheque');
      httpRequest.setContextPath('Accounts');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode','RETAILSTOPCHEQUESUMMARY');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<StopchequeMaintanence>) =>{
             return{
              data:res.body?.stopcheque || [],
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
    httpRequest.setResource('/stopcheque');
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('accountNumber', key['accountNumber']);
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
      httpRequest.setResource("/stopcheque/statistics");
      httpRequest.setContextPath('Accounts');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
