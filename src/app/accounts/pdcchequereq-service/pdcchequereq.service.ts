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
 import { Pdcchequereq, PdcchequereqMaintanence } from './pdcchequereq.model';
@Injectable()
export class PdcchequereqService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Pdcchequereq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/pdcchequereq');
      httpRequest.setContextPath('Accounts');
      let bodyContent = {"pdcchequereq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Pdcchequereq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Pdcchequereq|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pdcchequereq/{accountNumber}/{chequeNumber}');
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
       httpRequest.addPathParameter('chequeNumber', key.chequeNumber);
       httpRequest.setContextPath('Accounts');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.pdcchequereq ?? null),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Pdcchequereq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pdcchequereq/{accountNumber}/{chequeNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
       httpRequest.addPathParameter('chequeNumber', payload.chequeNumber);
       httpRequest.setContextPath('Accounts');
     httpRequest.setMethod('PUT');
      let bodyContent = {"pdcchequereq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Pdcchequereq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pdcchequereq/{accountNumber}/{chequeNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
       httpRequest.addPathParameter('chequeNumber', payload.chequeNumber);
       httpRequest.setContextPath('Accounts');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"pdcchequereq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Pdcchequereq,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pdcchequereq/{accountNumber}/{chequeNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
       httpRequest.addPathParameter('chequeNumber', payload.chequeNumber);
       httpRequest.setContextPath('Accounts');
     httpRequest.setMethod('PUT');
      let bodyContent = {"pdcchequereq":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<PdcchequereqMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/pdcchequereq');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Accounts');
      // httpRequest.addQueryParameter('accountNumber',criteriaQuery.getQueryparam('accountNumber'));
      httpRequest.addHeaderParamter('serviceCode', 'RETAILINQPDCCHQSTATUS');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<PdcchequereqMaintanence>) =>{
             return{
              data:res.body?.pdcchequereq || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )??null,catchError((res:any) => {
            return of({
              data:res.error
            } ?? null)
          }));



      // return this._httpProvider
      // .invokeRestApi(httpRequest)
      // .pipe(map((res: IHttpSuccessPayload<any>) =>  ?? null),catchError((err:any) => {
      //       return of(err ?? null)
      //     }));
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/pdcchequereq');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Accounts');
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('accountNumber.accountNumber', key['accountNumber']);
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
      httpRequest.setResource("/pdcchequereq/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Accounts');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
