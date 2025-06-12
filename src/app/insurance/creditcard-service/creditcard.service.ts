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
 import { Creditcard, CreditcardMaintanence } from './creditcard.model';
@Injectable({
  providedIn: 'root'
})
export class CreditcardService implements BaseFpxDataService<any> {
  creditCard: Creditcard[] = [];
  onChangeCreditCard$ = new EventEmitter<Creditcard | null>();

 constructor(private _httpProvider : HttpProviderService) { }

  updateCreditcard(creditCard: Creditcard){
    this.onChangeCreditCard$.emit(creditCard); 
  }

  create(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/flashcreditcardrequest');
      // httpRequest.addHeaderParamter('serviceCode','RETAILFLASHCREDITCARD');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = {"flashcreditcardrequest":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Creditcard|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/creditcard/{cardRefNumber}');
       httpRequest.setContextPath('CreditCards');
       httpRequest.addHeaderParamter('serviceCode','RETAILCCDETAILS');
       httpRequest.addPathParameter('cardRefNumber', key);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.creditcard ?? null),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/creditcard/{cardRefNumber}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"creditcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/creditcard/{cardRefNumber}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('cardRefNumber', payload.cardRefNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"creditcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Creditcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/creditcard/{cardRefNumber}');
      httpRequest.setContextPath('CreditCards');
       httpRequest.addPathParameter('cardRefNumber', payload.creditCardRefNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"creditcard":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CreditcardMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/creditcard');
      httpRequest.setContextPath('CreditCards');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CreditcardMaintanence>) =>{
             return{
              data:res.body?.creditcard || [],
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
    httpRequest.setResource('/creditcard');
    httpRequest.setContextPath('CreditCards');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('customerCode', key['customerCode']);
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
      httpRequest.setResource("/creditcard/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  fetchCreditCardLimits(productCode:any,cardRefNumber:any){
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("productcode",productCode)
    httpRequest.addPathParameter("cardref",cardRefNumber)
    httpRequest.setContextPath('CreditCards');
    httpRequest.addHeaderParamter('serviceCode','RETAILCCPRODLIMIT')
      httpRequest.setResource("/creditcard/{cardref}/product/{productcode}/limits");
     httpRequest.setMethod("GET");

      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
              return of(err ?? null)
            }));

  }
  CreditCardPinValidator(payload:any,cardnumber:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/creditcard/{cardreference}/pin');
    httpRequest.addHeaderParamter('serviceCode','RETAILCCCURRENTPIN');
    httpRequest.setContextPath('CreditCards');
    httpRequest.addPathParameter('cardreference', cardnumber);
    // let bodyContent ={
      

    // };
    httpRequest.setBody(payload);
    httpRequest.setMethod('POST');
    // httpRequest.setContextPath('Accounts');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: any) => {
        return null;
      }), 
        catchError((err: any) => {
          return of(err.error);
        })
      );
    }
    fetchCreditcardSummary(): Observable<Creditcard[]> {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/creditcard');
      httpRequest.setContextPath('CreditCards');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCCSUMMARY');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          this.creditCard = res.body?.creditcard
          return res.body?.creditcard;
        })
      );
    }
  
    fetchCreditCardInsights(payload:any):Observable<any>{
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/creditcard/trends');
      httpRequest.addHeaderParamter('serviceCode','RETAILCCTRENDS');
      httpRequest.addQueryParameter('fromDate', payload.fromDate);
      httpRequest.addQueryParameter('toDate', payload.toDate);
      httpRequest.addQueryParameter('accountnumber', payload.accountNumber);
      httpRequest.setContextPath('CreditCards');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body?.creditcardtrends;
        })
      );
    }
  
}
