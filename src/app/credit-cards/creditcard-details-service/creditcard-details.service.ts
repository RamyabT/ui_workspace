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
import { Creditcard } from '../creditcard-service/creditcard.model';
import { CreditcardMaintanence } from './creditcard-details.model';
@Injectable()
export class CreditcardDetailsService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/flashdebitcardrequest');
      httpRequest.setContextPath('DebitCards');
      let bodyContent = {"flashdebitcardrequest":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Creditcard|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/flashdebitcardrequest/{cardRefNumber}');
      httpRequest.setContextPath('DebitCards');
       httpRequest.addPathParameter('cardRefNumber', key.cardRefNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{
          return  res.body ?{  ...res.body.flashdebitcardrequest ,
             unauthRecordFlag: res.headers.get('unauthRecordFlag')
             } : null}),
             catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/flashdebitcardrequest/{cardRefNumber}');
      httpRequest.setContextPath('DebitCards');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"flashdebitcardrequest":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/flashdebitcardrequest/{cardRefNumber}');
      httpRequest.setContextPath('DebitCards');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"flashdebitcardrequest":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/flashdebitcardrequest/{cardRefNumber}');
      httpRequest.setContextPath('DebitCards');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"flashdebitcardrequest":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CreditcardMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/Creditcard');
      httpRequest.setContextPath('DebitCards');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CreditcardMaintanence>) =>{
             return{
              data:res.body?.Creditcard || [],
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
    httpRequest.setResource('/Creditcard');
    httpRequest.setContextPath('DebitCards');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('customerCode', key['CUSTOMER_CODE']);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }

  fetchCreditcardDetails(cardRefNumber:string):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/dcflashrequest/{cardRefNumber}');
    httpRequest.addHeaderParamter('serviceCode','RETAILDCFLASH')
    httpRequest.setContextPath('DebitCards');
    httpRequest.addPathParameter('cardRefNumber', cardRefNumber);
    httpRequest.setContextPath('DebitCards');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.dcflashrequest;
      })
    );
  }

  getFlashCardDetails(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/flashcreditcardrequest/{inventoryNumber}');
    httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
    httpRequest.addHeaderParamter('serviceCode','RETAILFLASHCREDITCARD');
    httpRequest.setContextPath('CreditCards');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.ccflashrequest;
      })
    );
  }
}
