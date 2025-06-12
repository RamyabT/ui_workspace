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
  CriteriaQuery,
  HttpProviderService,
  FpxIHttpOption
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { Observable, catchError, map, of } from 'rxjs';
import { RetailProductSelection } from './retail-product-selection-service.model';
import { RetailProductInfoMaintanence } from './retailProductInfo.model';
@Injectable()
export class RetailProductSelectionService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<RetailProductInfoMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/productInfo');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<RetailProductInfoMaintanence>) => {
              return {
                data: res.body?.productInfo || [],
                totalRowCount: res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }
  lookup(key: unknown): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: RetailProductSelection): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/cobaccountproduct');
      httpRequest.setAuthTokenRequired(false);
      let bodyContent = { "cobaccountproduct": payload };
      httpRequest.setBody(bodyContent);
      // httpRequest.setServerContext(environment.Customers);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }

  findByKey(key: RetailProductSelection): FindByKeyFn<RetailProductSelection> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/productselection/{sourceReference}');
      httpRequest.addPathParameter('sourceReference', key.processId);
      httpRequest.setAuthTokenRequired(false);
      httpRequest.setMethod('GET');
      // httpRequest.setServerContext(environment.Customers);
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.productselection ?? null));

    };
  }

  modify(payload: RetailProductSelection): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/cobaccountproduct/{sourceReference}');
      httpRequest.addPathParameter('sourceReference', payload.processId);
      httpRequest.setMethod('PUT');
      httpRequest.setAuthTokenRequired(false);
      let bodyContent = { "cobaccountproduct": payload };
      httpRequest.setBody(bodyContent);
      // httpRequest.setServerContext(environment.Customers);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }

  getProductSegment(criteriaQuery: CriteriaQuery): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/productsegment');
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.setContextPath('Customers');
    httpRequest.setAuthTokenRequired(false);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body.productsegment;
      },
        catchError((err: any) => {
          return of(null)
        }))
    );
  }
}
