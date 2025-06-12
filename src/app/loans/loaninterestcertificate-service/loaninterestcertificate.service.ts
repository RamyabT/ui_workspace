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
 import { Loaninterestcertificate, LoaninterestcertificateMaintanence } from './loaninterestcertificate.model';
@Injectable()
export class LoaninterestcertificateService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Loaninterestcertificate,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/loaninterestcertificate');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANINTERESTCERTIFICATE');
      let bodyContent = {"loaninterestcertificate":payload};
      httpRequest.setContextPath('Loans');
      httpRequest.setBody(bodyContent);
      // return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      return this._httpProvider.invokeDownloadApi(httpRequest)
    };
  }
 
  findByKey(key: Loaninterestcertificate,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loaninterestcertificate|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loaninterestcertificate/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', key.loanAccountNumber);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Loans');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loaninterestcertificate , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Loaninterestcertificate,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loaninterestcertificate/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"loaninterestcertificate":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Loaninterestcertificate,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loaninterestcertificate/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"loaninterestcertificate":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Loaninterestcertificate,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loaninterestcertificate/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"loaninterestcertificate":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<LoaninterestcertificateMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loaninterestcertificate');
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<LoaninterestcertificateMaintanence>) =>{
             return{
              data:res.body?.loaninterestcertificate || [],
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
    httpRequest.setResource('/loaninterestcertificate');
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
      httpRequest.setResource("/loaninterestcertificate/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
