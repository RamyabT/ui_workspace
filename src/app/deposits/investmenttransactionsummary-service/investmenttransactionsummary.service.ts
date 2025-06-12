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
 import { Investmenttransactionsummary, InvestmenttransactionsummaryMaintanence } from './investmenttransactionsummary.model';
@Injectable()
export class InvestmenttransactionsummaryService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Investmenttransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('Deposits');
      httpRequest.setResource('/investmenttransactionsummary');
      let bodyContent = {"investmenttransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Investmenttransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Investmenttransactionsummary|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/investmenttransactionsummary/{accountNumber}');
      httpRequest.addHeaderParamter('serviceCode','RETAILINVESTMENTTRANSUMMARY');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.investmenttransactionsummary , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Investmenttransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/investmenttransactionsummary/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Deposits');
      let bodyContent = {"investmenttransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Investmenttransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/investmenttransactionsummary/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('Deposits');
      let bodyContent = {"investmenttransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Investmenttransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/investmenttransactionsummary/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Deposits');
      let bodyContent = {"investmenttransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<InvestmenttransactionsummaryMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/investmenttransactionsummary');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      httpRequest.addHeaderParamter('serviceCode','RETAILINVESTMENTTRANSUMMARY');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<InvestmenttransactionsummaryMaintanence>) =>{
             return{
              data:res.body?.investmenttransactionsummary || [],
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
    httpRequest.setContextPath('Deposits');
    httpRequest.setResource('/investmenttransactionsummary');
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
      httpRequest.setResource("/investmenttransactionsummary/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Deposits');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
