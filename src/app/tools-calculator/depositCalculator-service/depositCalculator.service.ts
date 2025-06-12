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
 import { DepositCalculator, DepositCalculatorMaintanence } from './depositCalculator.model';
@Injectable()
export class DepositCalculatorService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: DepositCalculator,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('Deposits');
      httpRequest.setResource('/depositCalculator');
      let bodyContent = {"depositCalculator":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: DepositCalculator,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<DepositCalculator|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/depositCalculator/{depositProducts}');
       httpRequest.addPathParameter('depositProducts', key.depositProducts);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.depositCalculator , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,  interestpaymentfrequency:res.interestpaymentfrequency?.id,} : null
        }));
        
    };
  }
  modify(payload: DepositCalculator,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/depositCalculator/{depositProducts}');
       httpRequest.addPathParameter('depositProducts', payload.depositProducts);
      httpRequest.setContextPath('Deposits');
     httpRequest.setMethod('PUT');
      let bodyContent = {"depositCalculator":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: DepositCalculator,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/depositCalculator/{depositProducts}');
       httpRequest.addPathParameter('depositProducts', payload.depositProducts);
     httpRequest.setMethod('DELETE');
     httpRequest.setContextPath('Deposits');
      let bodyContent = {"depositCalculator":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: DepositCalculator,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/depositCalculator/{depositProducts}');
       httpRequest.addPathParameter('depositProducts', payload.depositProducts);
     httpRequest.setMethod('PUT');
     httpRequest.setContextPath('Deposits');
      let bodyContent = {"depositCalculator":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DepositCalculatorMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/depositCalculator');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DepositCalculatorMaintanence>) =>{
             return{
              data:res.body?.depositCalculator || [],
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
    httpRequest.setResource('/depositCalculator');
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
      httpRequest.setResource("/depositCalculator/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Deposits');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
