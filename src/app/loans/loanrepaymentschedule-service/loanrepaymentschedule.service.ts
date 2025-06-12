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
import { Loanrepaymentschedule, LoanrepaymentscheduleMaintanence } from '../../loans/loanrepaymentschedule-service/loanrepaymentschedule.model';
@Injectable()
export class LoanrepaymentscheduleService implements BaseFpxDataService<any> {
  accountNumber: any;
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Loanrepaymentschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/loanrepaymentschedule');
      httpRequest.setContextPath('Loans');
      let bodyContent = {"loanrepaymentschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Loanrepaymentschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loanrepaymentschedule|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loanrepaymentschedule/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', key.loanAccountNumber);
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loanrepaymentschedule , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Loanrepaymentschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loanrepaymentschedule/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('PUT');
      let bodyContent = {"loanrepaymentschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Loanrepaymentschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loanrepaymentschedule/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('DELETE');
      let bodyContent = {"loanrepaymentschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Loanrepaymentschedule,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loanrepaymentschedule/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('PUT');
      let bodyContent = {"loanrepaymentschedule":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<LoanrepaymentscheduleMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loanrepaymentschedule');
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod('GET');
      httpRequest.addQueryParameter('loanAccountNumber',this.accountNumber);
      httpRequest.addHeaderParamter('serviceCode','RETAILLOANREPAYMENTSCHEDULE')
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<LoanrepaymentscheduleMaintanence>) =>{
             return{
              data:res.body?.loanrepaymentschedule || [],
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
    httpRequest.setResource('/loanrepaymentschedule');
      httpRequest.setContextPath('Loans');
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
      httpRequest.setResource("/loanrepaymentschedule/statistics");
      httpRequest.setContextPath('Loans');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
