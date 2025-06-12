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

@Injectable()
export class DepositService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
 create(payload: any): CreateFn<any> {
  throw new Error('Method not implemented.');
}

  findByKey(key: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<|null> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   delete(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   patch(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    throw new Error('Method not implemented.');
  }

   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }

  fetchMaturityAmount(depositAmount:any,depositDate:any,productCode:any,depositMonths:any,interestPayFreq:any):Observable<any> {
    const httpRequest = new HttpRequest();
      httpRequest.setResource("/deposit/calculate/maturity");
      httpRequest.addQueryParameter("depositAmount", depositAmount);
      httpRequest.addQueryParameter("depositDate", depositDate);
      httpRequest.addQueryParameter("productCode", productCode);
      httpRequest.addQueryParameter("interestPayFreq", interestPayFreq);
      httpRequest.addQueryParameter("month", depositMonths);


      httpRequest.setMethod("GET");
       httpRequest.setContextPath('Deposits');
      // httpRequest.setServerContext(environment.Deposits);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => res.body?.depositscalculator ?? null)
      );
  }

  downloadDetails(accountNumber:any,customerCode:any){
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/depositreceipt");
    httpRequest.addQueryParameter('accountNumber', accountNumber);
    httpRequest.addQueryParameter('customerCode', customerCode);
    httpRequest.setMethod("GET");
    // httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider
      .invokeDownloadApi(httpRequest)
  }

}
