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
  FpxIHttpOption,
  BaseFpxFunctionality
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of, catchError } from 'rxjs';
import { Etransfercustomer } from './etransfercustomer.model';

@Injectable({
  providedIn: 'root',
})
export class EtransfercustomerService extends BaseFpxFunctionality implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) {
    super();
  }

  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: Etransfercustomer, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Etransfercustomer | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercustomer/{tenantId}/{customerCode}');
      httpRequest.addPathParameter('tenantId', key.tenantId);
      httpRequest.addPathParameter('customerCode', key.customerCode);
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.etransfercustomer ?? null), catchError((err: any) => {

          return of(null)
        }));
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/etransfercustomer');
      httpRequest.setContextPath('Payments');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }

  fetcheTransferCustomer() {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercustomer');
      httpRequest.setContextPath('Payments');
      httpRequest.addHeaderParamter('serviceCode', 'GETETRFREGISTRATION');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => {
          return res.body?.etransfercustomer ?? null
        }), catchError((err: any) => {
          return of(null)
        }));
    };
  }
  fetchPreferredAccount(): Observable<any[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/preferredaccount');
    httpRequest.setContextPath('Common');
    httpRequest.addHeaderParamter('serviceCode', 'INTERAC');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.preferredaccount;
      })
    );
  }
  postPreferredAccount(body: any): Observable<any[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/preferredaccount');
    httpRequest.setContextPath('Common');
    httpRequest.setBody(body)
    httpRequest.addHeaderParamter('serviceCode', 'INTERAC');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.preferredaccount;
      })
    );
  }

  postPreferredAccountForTransfers(body: any): Observable<any[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/preferredaccount');
    httpRequest.setContextPath('Common');
    httpRequest.setBody(body)
    httpRequest.addHeaderParamter('serviceCode', 'TRANSFERS');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.preferredaccount;
      })
    );
  }


  checkIsAutoDeposit(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/validate/etransferautodeposit');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILVALIDATEINTERACAUTODEPOSIT');
    httpRequest.setBody(payload);
    httpRequest.setMethod('POST');
    httpRequest.setContextPath('Payments');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: any) => {
        return res;
      }),
        catchError((err: any) => {
          return of(err.error);
        })
      );
  }
  
  sendRemainder(payload: any){
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/etransfersendreminder');
        httpRequest.setContextPath('Payments');
        let bodyContent = { "etransfersendreminder":  payload};
        httpRequest.setBody(bodyContent);
        httpRequest.addHeaderParamter('serviceCode','ETRANSFERSENDREMINDER');
        return this._httpProvider.invokeRestApi(httpRequest).pipe
        (map((res: IHttpSuccessPayload<any>) => {
          return res.body
        }));
      };
    }

    cancelETransfer(payload: any){
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/etrfcancelpayment');
        httpRequest.setContextPath('Payments');
        let bodyContent = { "etrfcancelpayment":  payload};
        httpRequest.setBody(bodyContent);
        httpRequest.addHeaderParamter('serviceCode','ETRANSFERCANCELPAYMENT');
        return this._httpProvider.invokeRestApi(httpRequest).pipe
        (map((res: IHttpSuccessPayload<any>) => {
          return res.body
        }));
      };
    }

    fetchEtransferSendLimits(): Observable<any[]> {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/etransendlimits');
      httpRequest.setContextPath('Payments');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILETRANSENDLIMITS');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res?.body?.etransendlimits;
        })
      );
    }

}


