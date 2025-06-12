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
import { Loans } from './loans.model';
import { APPCONSTANTS } from '@dep/constants';
import { TranslateService } from '@ngx-translate/core';
import { ShareInfo } from '@dep/native';

@Injectable({
  providedIn: 'root',
})
export class LoansService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService,
  private _shareInfo: ShareInfo,
  private _translate: TranslateService
 ) { }
  create(payload: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/loans');
      let bodyContent = {"loans":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Loans');
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  fetchLoansInsights(accountNumber:string):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/assets/account/{accountNumber}/summary');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTINSIGHTS');
    httpRequest.addPathParameter('accountNumber', accountNumber);
    httpRequest.addQueryParameter('fromDate', '2023-01-01');
    httpRequest.addQueryParameter('toDate', '2024-01-31');
    httpRequest.addQueryParameter('direction', 'I');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.accountinsights;
      })
    );
  }
  fetchLoans(): Observable<Loans[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/loans');
    httpRequest.setContextPath('Loans');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANSUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.loans;
      })
    );
  }
  findByKey(key: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loans|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loans/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', key.loanAccountNumber);
      httpRequest.setContextPath('Loans');
       httpRequest.addHeaderParamter('serviceCode','RETAILLOANDETAILS')
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loans , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loans/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
     httpRequest.setMethod('PUT');
      let bodyContent = {"loans":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loans/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"loans":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loans/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', payload.loanAccountNumber);
      httpRequest.setContextPath('Loans');
     httpRequest.setMethod('PUT');
      let bodyContent = {"loans":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/loans');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Loans');
    httpRequest.setContextPath('Loans');
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
      httpRequest.setResource("/loans/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Loans');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

  //Loan Closure Simulation
  fetchLoanClosureDetails(loanAccountNumber:any,closureDate:any){
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/loan/closure/simulation/{loanAccountNumber}');
    httpRequest.addPathParameter('loanAccountNumber', loanAccountNumber);
    httpRequest.addQueryParameter('closureDate',closureDate);
    httpRequest.setContextPath('Loans');
    httpRequest.setMethod("GET");
    return this._httpProvider
        .invokeRestApi(httpRequest) 
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body.loan));
  }

  shareAccountInfo(cardData: Loans,  doShowToast = true) {
    let loanInfo: string = APPCONSTANTS.shareLoanInfoData(cardData);
    this._shareInfo.shareInfo(loanInfo, this._translate.instant('CASASUMMARYCARD.shareSuccess'), doShowToast);
  }

  loanDetails(key: Loans,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Loans|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/loans/{loanAccountNumber}');
       httpRequest.addPathParameter('loanAccountNumber', key);
      httpRequest.setContextPath('Loans');
       httpRequest.addHeaderParamter('serviceCode','RETAILLOANDETAILS')
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.loans , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
}
