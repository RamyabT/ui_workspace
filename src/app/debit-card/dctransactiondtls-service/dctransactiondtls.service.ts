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
 import { Dctransactiondtls, DctransactiondtlsMaintanence } from './dctransactiondtls.model';
@Injectable()
export class DctransactiondtlsService implements BaseFpxDataService<any> {
  private _correlationId: string = '';

 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Dctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/dctransactiondtls');
      httpRequest.setContextPath('DebitCards')
      let bodyContent = {"dctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Dctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Dctransactiondtls|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/dctransactiondtls/{transactionReference}');
      httpRequest.addHeaderParamter('serviceCode','RETAILDCTRANSACTIONDTLS')
      httpRequest.setContextPath('DebitCards')
       httpRequest.addPathParameter('transactionReference', key.transactionReference);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.dctransactiondtls , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Dctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/dctransactiondtls/{transactionReference}');
      httpRequest.setContextPath('DebitCards')
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"dctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Dctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/dctransactiondtls/{transactionReference}');
      httpRequest.setContextPath('DebitCards')
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"dctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Dctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/dctransactiondtls/{transactionReference}');
      httpRequest.setContextPath('DebitCards')
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"dctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DctransactiondtlsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/dctransactiondtls');
      httpRequest.setContextPath('DebitCards');
      httpRequest.addHeaderParamter('serviceCode','RETAILDCTRANSACTIONSUMMARY')
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DctransactiondtlsMaintanence>) =>{
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }
              
             return{
              data:res.body?.dctransactiondtls || [],
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
    httpRequest.setResource('/dctransactiondtls');
    httpRequest.setContextPath('DebitCards')
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
      httpRequest.setResource("/dctransactiondtls/statistics");
      httpRequest.setContextPath('DebitCards')
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
