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
 import { ChequeStatusInquiry, ChequeStatusInquiryMaintanence } from './chequeStatusInquiry.model';
@Injectable()
export class ChequeStatusInquiryService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: ChequeStatusInquiry,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/chequeStatusInquiry');
      let bodyContent = {"chequeStatusInquiry":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: ChequeStatusInquiry,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<ChequeStatusInquiry|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/chequeStatusInquiry/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.chequeStatusInquiry ?? null),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: ChequeStatusInquiry,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/chequeStatusInquiry/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"chequeStatusInquiry":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: ChequeStatusInquiry,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/chequeStatusInquiry/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"chequeStatusInquiry":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: ChequeStatusInquiry,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/chequeStatusInquiry/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"chequeStatusInquiry":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ChequeStatusInquiryMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/chequeStatusInquiry');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode','RETAILINQCHQSTATUS');
      // httpRequest.addQueryParameter('accountNumber', criteriaQuery.getQueryparam('accountNumber'));
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Accounts');
      // return this._httpProvider
      //   .invokeRestApi(httpRequest,httpOption)
      //   .pipe(
      //     map(
      //       (res: IHttpSuccessPayload<ChequeStatusInquiryMaintanence>) =>{
      //        return{
      //         data:res.body?.chequeStatusInquiry || [],
      //         totalRowCount:res.headers.get('Totalrowcount')
      //         }
      //       }
      //     )
      //   );


      return this._httpProvider
      .invokeRestApi(httpRequest,httpOption)
      .pipe(
        map(
          (res: IHttpSuccessPayload<ChequeStatusInquiryMaintanence>) =>{
           return{
            data:res.body?.chequeStatusInquiry || [],
            totalRowCount:res.headers.get('Totalrowcount')
            }
          }
        )??null,catchError((res:any) => {
          return of({
            data:res.error
          })
        }));
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/chequeStatusInquiry');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.setContextPath('Accounts');
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
      httpRequest.setResource("/chequeStatusInquiry/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
