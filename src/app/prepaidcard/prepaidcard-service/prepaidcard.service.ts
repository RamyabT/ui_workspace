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
import { Prepaidcard } from './prepaidcard.model';
import { Creditcard } from 'src/app/credit-cards/creditcard-service/creditcard.model';

@Injectable({
  providedIn: 'root',
})
export class PrepaidcardService  implements BaseFpxDataService<any> {
  prepaidCard: Prepaidcard[] = [];
  onChangePrepaidCard$ = new EventEmitter<Prepaidcard | null>();

  updatePrepaidcard(prepaidcard: Prepaidcard | undefined){
    this.onChangePrepaidCard$.emit(prepaidcard); 
  }
  constructor(private _httpProvider : HttpProviderService) {}

  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

   findByKey(key: Prepaidcard,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Prepaidcard|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/ppCard/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', key.cardRefNumber);
       httpRequest.addHeaderParamter('serviceCode', 'RETAILPCDETAILS');
       httpRequest.setContextPath('PrepaidCards');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.prepaidcard ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/ppCard');
      httpRequest.setContextPath('PrepaidCards');
      httpRequest.addQueryParameter('lookup', 1);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }

  fetchPrepaidardSummary(): Observable<Prepaidcard[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/ppCard');
    httpRequest.setContextPath('PrepaidCards');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILPCSUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        this.prepaidCard = res.body?.prepaidcard;
        return res.body?.prepaidcard;
      })
    );
  }

  fetchPrepaidcardInsights(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');

    httpRequest.setResource('/prepaidcard/trends');
    httpRequest.addHeaderParamter('serviceCode','RETAILPPTRENDS');
    httpRequest.addQueryParameter('fromDate', payload.fromDate);
    httpRequest.addQueryParameter('toDate', payload.toDate);
    httpRequest.addQueryParameter('accountnumber', payload.accountNumber);
    httpRequest.addQueryParameter('currencycode', payload.currencycode);
    httpRequest.setContextPath('PrepaidCards');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.prepaidcardtrends;
      })
    )}
   
    fetchPrepaidCardLimits(productCode:any,cardRefNumber:any){
      const httpRequest = new HttpRequest();
      httpRequest.addPathParameter("productcode",productCode);
      httpRequest.addPathParameter("cardref",cardRefNumber);
      httpRequest.addHeaderParamter('serviceCode','RETAILPCPRODLIMIT');
      httpRequest.setContextPath('PrepaidCards')
        httpRequest.setResource("/prepaidcard/{cardref}/product/{productcode}/limits");
       httpRequest.setMethod("GET");
  
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
                return of(err ?? null)
              }));
  
    }

}
 

