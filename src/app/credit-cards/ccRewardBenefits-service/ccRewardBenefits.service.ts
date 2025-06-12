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
import { CcRewardBenefits, CcRewardBenefitsMaintanence } from './ccRewardBenefits.model';
@Injectable()
export class CcRewardBenefitsService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: CcRewardBenefits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/ccRewardBenefits');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = { "ccRewardBenefits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: CcRewardBenefits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<CcRewardBenefits | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/ccRewardBenefits/{prodCode}');
      httpRequest.addPathParameter('prodCode', key.prodCode);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('CreditCards');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.ccRewardBenefits, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }));

    };
  }
  modify(payload: CcRewardBenefits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/ccRewardBenefits/{tenantId}/{prodCode}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('prodCode', payload.prodCode);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = { "ccRewardBenefits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: CcRewardBenefits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/ccRewardBenefits/{tenantId}/{prodCode}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('prodCode', payload.prodCode);
      httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = { "ccRewardBenefits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: CcRewardBenefits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/ccRewardBenefits/{tenantId}/{prodCode}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('prodCode', payload.prodCode);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('CreditCards');
      let bodyContent = { "ccRewardBenefits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<CcRewardBenefitsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/ccRewardBenefits');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('CreditCards');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<CcRewardBenefitsMaintanence>) => {
              return {
                data: res.body?.ccRewardBenefits || [],
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
      httpRequest.setResource('/ccRewardBenefits');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('CreditCards');
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
      httpRequest.setResource("/ccRewardBenefits/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('CreditCards');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
