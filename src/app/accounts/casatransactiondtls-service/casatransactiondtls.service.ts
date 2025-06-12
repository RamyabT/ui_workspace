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
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of, catchError } from 'rxjs';
import { Casatransactiondtls, CasatransactiondtlsMaintanence } from './casatransactiondtls.model';
@Injectable()
export class CasatransactiondtlsService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: Casatransactiondtls, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/casatransactiondtls');
      let bodyContent = { "casatransactiondtls": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Casatransactiondtls, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Casatransactiondtls | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casatransactiondtls/{transactionReference}');
      httpRequest.addPathParameter('transactionReference', key.transactionReference);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.casatransactiondtls ?? null), catchError((err: any) => {
          return of(null)
        }));

    };
  }
  modify(payload: Casatransactiondtls, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casatransactiondtls/{transactionReference}');
      httpRequest.addPathParameter('transactionReference', payload.transactionReference);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Accounts');
      let bodyContent = { "casatransactiondtls": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Casatransactiondtls, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casatransactiondtls/{transactionReference}');
      httpRequest.addPathParameter('transactionReference', payload.transactionReference);
      httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('Accounts');
      let bodyContent = { "casatransactiondtls": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Casatransactiondtls, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casatransactiondtls/{transactionReference}');
      httpRequest.addPathParameter('transactionReference', payload.transactionReference);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Accounts');
      let bodyContent = { "casatransactiondtls": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CasatransactiondtlsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casatransactiondtls');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Accounts');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILVIEWCASATRANSACTION');
      httpRequest.setCriteriaQuery(criteriaQuery);

      if(this._correlationId){
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CasatransactiondtlsMaintanence>) => {
              this._correlationId = '';
              if (res?.headers?.get('correlationId') || res?.headers?.get('correlationid')) {
                this._correlationId = res.headers.get('correlationId') || res?.headers?.get('correlationid');
              }
              
              return {
                data: res.body?.casatransactiondtls || [],
                totalRowCount: res.headers.get('Totalrowcount') || res.headers.get('totalrowcount')
              }
            }
          ), catchError((res: any) => {
            return of({
              data: res.error
            })
          }));
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/casatransactiondtls');
      httpRequest.setContextPath('Accounts');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/casatransactiondtls/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setContextPath('Accounts');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

  fetchChequeImage(data: any) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/transaction/cheque');
    httpRequest.addQueryParameter('accountNumber', data?.accountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILTRANCHQ');
    httpRequest.setContextPath('Accounts');
    httpRequest.setBody({
      'instrumentId': data?.chequeNumber,
      'debitCreditFlag': data?.debitCreditFlag
    });
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res?.body?.chequeImage || [];
      })
    );
  };
  fetchChequeImageTran(instrumentId:string,accountNumber:any,debitCreditFlag:any) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/transaction/cheque');
    httpRequest.addQueryParameter('accountNumber', accountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILTRANCHQ');
    httpRequest.setContextPath('Accounts');
    httpRequest.setBody({
      'instrumentId': instrumentId,
      'debitCreditFlag': debitCreditFlag
    });
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res?.body?.chequeImage || [];
      })
    );
  };

  resetCorrelationId(){
    this._correlationId = '';
  }

}
