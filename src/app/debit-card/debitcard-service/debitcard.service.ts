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
 import { Debitcard, DebitcardMaintanence } from './debitcard.model';
@Injectable({
  providedIn: 'root'
})
export class DebitcardService implements BaseFpxDataService<any> {
  debitCard: Debitcard[] = [];
  onChangeDebitCard$ = new EventEmitter<Debitcard | null>();

 constructor(private _httpProvider : HttpProviderService) { }

  updateDebitcard(debitcard: Debitcard | undefined){
    this.onChangeDebitCard$.emit(debitcard); 
  }
  create(payload: Debitcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/debitcard');
      let bodyContent = {"debitcard":payload};
      httpRequest.setContextPath('DebitCards');
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Debitcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Debitcard|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/debitcard/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', key.cardRefNumber);
       httpRequest.addHeaderParamter('serviceCode','RETAILDCDETAILS')
       httpRequest.setContextPath('DebitCards');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{
          return  res.body ?{  ...res.body.debitcard ,
             unauthRecordFlag: res.headers.get('unauthRecordFlag')
             } : null}),
             catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Debitcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/debitcard/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"debitcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Debitcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/debitcard/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"debitcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Debitcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/debitcard/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"debitcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DebitcardMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/debitcard');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('DebitCards');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DebitcardMaintanence>) =>{
             return{
              data:res.body?.debitcard || [],
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
    httpRequest.setResource('/debitcard');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.setContextPath('DebitCards');
    httpRequest.addQueryParameter('customerCode', key['CUSTOMER_CODE']);
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
      httpRequest.setResource("/debitcard/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
  fetchDebitCardLimits(productCode:any,cardRefNumber:any){
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("productcode",productCode)
    httpRequest.addPathParameter("cardref",cardRefNumber)
    httpRequest.addHeaderParamter('serviceCode','RETAILDCPRODLIMIT');
    httpRequest.setContextPath('DebitCards')
      httpRequest.setResource("/debitcard/{cardref}/product/{productcode}/limits");
     httpRequest.setMethod("GET");

      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
              return of(err ?? null)
            }));

  }

  fetchDebitcardSummary(): Observable<Debitcard[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/debitcard');
    httpRequest.setContextPath('DebitCards');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILDCSUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        this.debitCard = res.body?.debitcard;
        return res.body?.debitcard;
      })
    );
  }

  fetchDebitCardInsights(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/debitcard/trends');
    httpRequest.addHeaderParamter('serviceCode','CORPDEBITCARDTRENDS');
    // httpRequest.addQueryParameter('type', 'CATEGORY');
    httpRequest.addQueryParameter('fromDate', payload.fromDate);
    httpRequest.addQueryParameter('toDate', payload.toDate);
    httpRequest.addQueryParameter('accountnumber', payload.accountNumber);
    httpRequest.setContextPath('DebitCards');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.debitcardtrends;
      })
    );
  }
}
