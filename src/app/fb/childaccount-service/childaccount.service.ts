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
import { Childaccount } from './childaccount.model';

@Injectable({
  providedIn: 'root',
})
export class ChildaccountService  implements BaseFpxDataService<any> {
  constructor(private _httpProvider : HttpProviderService) {}

  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/childaccount');
      // httpRequest.addHeaderParamter('serviceCode', 'RETAILCASACCOUNTSUMMARY');
      // httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.childAccount;
        })
      );
    };
  }

   findByKey(key: Childaccount,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Childaccount|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/childaccount/{accountNumber}');
      //  httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setMethod('GET');
      // httpRequest.addHeaderParamter('serviceCode', 'RETAILACCOUNT');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ 
          return res.body?.childaccount ?? null}
        ),catchError((err:any) => {
              return of(null)
            }));

      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/childaccount');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
 

}
 

