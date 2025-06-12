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
 import { Pctransactiondtls, PctransactiondtlsMaintanence } from './pctransactiondtls.model';
@Injectable()
export class PctransactiondtlsService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Pctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('PrepaidCards');
      httpRequest.setResource('/pctransactiondtls');
      let bodyContent = {"pctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Pctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Pctransactiondtls|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pctransactiondtls/{transactionReference}');
      httpRequest.setContextPath('PrepaidCards');
       httpRequest.addPathParameter('transactionReference', key.transactionReference);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.pctransactiondtls , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Pctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pctransactiondtls/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"pctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Pctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pctransactiondtls/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"pctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Pctransactiondtls,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pctransactiondtls/{transactionReference}');
       httpRequest.addPathParameter('transactionReference', payload.transactionReference);
     httpRequest.setMethod('PUT');
      let bodyContent = {"pctransactiondtls":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pctransactiondtls');
      httpRequest.setContextPath('PrepaidCards');
      httpRequest.addHeaderParamter('serviceCode','RETAILPCTRANSACTIONHISTORY');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<any>) =>{
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }
              
             return{
              data:res.body?.pctransactiondtls || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )??null,catchError((res:any) => {
            return of({
              data:res?.error
            } ?? null)
          }));
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/pctransactiondtls');
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
      httpRequest.setResource("/pctransactiondtls/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
