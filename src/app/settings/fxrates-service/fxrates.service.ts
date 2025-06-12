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
 import { Fxrates, FxratesMaintanence } from './fxrates.model';
@Injectable()
export class FxratesService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Fxrates,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/viewfxrate');
      httpRequest.setContextPath('Common');
      let bodyContent = {"fxrates":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Fxrates,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Fxrates|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewfxrate/{fromCurrency}/{toCurrency}');
       httpRequest.addPathParameter('fromCurrency', key.fromCurrency);
       httpRequest.addPathParameter('toCurrency', key.toCurrency);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Common');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.fxrates , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Fxrates,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewfxrate/{fromCurrency}/{toCurrency}');
       httpRequest.addPathParameter('fromCurrency', payload.fromCurrency);
       httpRequest.addPathParameter('toCurrency', payload.toCurrency);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Common');
      let bodyContent = {"fxrates":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Fxrates,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewfxrate/{fromCurrency}/{toCurrency}');
       httpRequest.addPathParameter('fromCurrency', payload.fromCurrency);
       httpRequest.addPathParameter('toCurrency', payload.toCurrency);
     httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('Common');
      let bodyContent = {"fxrates":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Fxrates,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewfxrate/{fromCurrency}/{toCurrency}');
       httpRequest.addPathParameter('fromCurrency', payload.fromCurrency);
       httpRequest.addPathParameter('toCurrency', payload.toCurrency);
     httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Common');
      let bodyContent = {"fxrates":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<FxratesMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/viewfxrate');
      httpRequest.setMethod('GET');
      // httpRequest.addQueryParameter('fromCurrency',criteriaQuery.getQueryparam('fromCurrency'));
      httpRequest.addHeaderParamter('serviceCode','DEPVIEWFXRATE');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Common');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<FxratesMaintanence>) =>{
             return{
              data:res.body?.viewfxrate || [],
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
    httpRequest.setResource('/fxrates');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.setContextPath('defaultPublisher');
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
      httpRequest.setResource("/fxrates/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('defaultPublisher');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
