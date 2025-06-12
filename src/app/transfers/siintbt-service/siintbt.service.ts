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
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of, catchError } from 'rxjs';
import { Siintbt, SiintbtMaintanence } from './siintbt.model';
@Injectable()
export class SiintbtService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: Siintbt, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt');
      let bodyContent = { "siintbt": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Siintbt, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Siintbt | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt/{paymentId}');
      httpRequest.addPathParameter('paymentId', key.paymentId);
      let criteriaQuery = new CriteriaQuery();
      criteriaQuery.setPaginationCriteria("1", 100);
      criteriaQuery.addSortCriteria("orderType", "asc", "String");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILGETWBTTRANSFER')
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.siintbt, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }), catchError((err: any) => {
          return of(null)
        }));

    };
  }
  modify(payload: Siintbt, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt/{paymentId}');
      httpRequest.addPathParameter('paymentId', payload.paymentId);
      httpRequest.setMethod('PUT');
      let bodyContent = { "siintbt": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Siintbt, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt/{paymentId}');
      httpRequest.addPathParameter('paymentId', payload.paymentId);
      httpRequest.setMethod('DELETE');
      let bodyContent = { "siintbt": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Siintbt, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt/{paymentId}');
      httpRequest.addPathParameter('paymentId', payload.paymentId);
      httpRequest.setMethod('PUT');
      let bodyContent = { "siintbt": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<SiintbtMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setResource('/siintbt');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<SiintbtMaintanence>) => {
              return {
                data: res.body?.siintbt || [],
                totalRowCount: res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('GET');
      httpRequest.setResource('/siintbt');
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
      httpRequest.setContextPath('Payments');
      httpRequest.setResource("/siintbt/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
