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
 import { Cctransactionsummary, CctransactionsummaryMaintanence } from './cctransactionsummary.model';
@Injectable()
export class CctransactionsummaryService implements BaseFpxDataService<any> {
  private _correlationId: string = '';

 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Cctransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/cctransactionsummary');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = {"cctransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Cctransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Cctransactionsummary|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cctransactionsummary/{transactionReference}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('transactionReference', key.transactionReference);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.cctransactionsummary , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Cctransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cctransactionsummary/{transactionReference}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"cctransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Cctransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cctransactionsummary/{transactionReference}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"cctransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Cctransactionsummary,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cctransactionsummary/{transactionReference}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"cctransactionsummary":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CctransactionsummaryMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cctransactionsummary');
      httpRequest.setContextPath('CreditCards');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCCTRANSACTION');
      // httpRequest.addQueryParameter('cardRefNumber', 'RETAILCCTRANSACTION');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CctransactionsummaryMaintanence>) =>{
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }

             return{
              data:res.body?.cctransactionsummary || [],
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
    httpRequest.setResource('/cctransactionsummary');
    httpRequest.setContextPath('CreditCards');
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
      httpRequest.setResource("/cctransactionsummary/statistics");
      httpRequest.setContextPath('CreditCards');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
