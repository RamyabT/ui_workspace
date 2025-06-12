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
import { Rpcontributionreq, RpcontributionreqMaintanence } from './rpcontributionreq.model';
@Injectable()
export class RpcontributionreqService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: Rpcontributionreq, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/rpcontributionreq');
      httpRequest.setContextPath('Deposits');
      let bodyContent = { "rpcontributionreq": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Rpcontributionreq, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Rpcontributionreq | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/rpcontributionreq/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', key.tenantId);
      httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.rpcontributionreq, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }), map((res: any) => {
          return res ? { ...res, creditAccount: res.creditAccount?.accountNumber, } : null
        }));

    };
  }
  modify(payload: Rpcontributionreq, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/rpcontributionreq/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Deposits');
      let bodyContent = { "rpcontributionreq": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Rpcontributionreq, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/rpcontributionreq/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('Deposits');
      let bodyContent = { "rpcontributionreq": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Rpcontributionreq, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/rpcontributionreq/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Deposits');
      let bodyContent = { "rpcontributionreq": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<RpcontributionreqMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/rpcontributionreq');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<RpcontributionreqMaintanence>) => {
              return {
                data: res.body?.rpcontributionreq || [],
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
      httpRequest.setMethod('GET');
      httpRequest.setResource('/rpcontributionreq');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Deposits');
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
      httpRequest.setResource("/rpcontributionreq/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Deposits');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
