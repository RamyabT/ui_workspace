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
import { BillRequest, BillRequestMaintanence } from './billRequest.model';
@Injectable()
export class BillRequestService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: BillRequest, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/multibillrequest');
      let bodyContent = { "multibillrequest": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: BillRequest, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<BillRequest | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billRequest/{tranRef}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('tranRef', key.tranRef);
      httpRequest.setMethod('GET');

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.billRequest ?? null), map((res: any) => {
          return res ? { ...res, currencyCode: res.currencyCode.currencyCode, billerBeneficiaryId: res.billerBeneficiaryId?.billerBeneficiaryId, billerIdDetail: res.billerBeneficiaryId } : null
        }));

    };
  }
  modify(payload: BillRequest, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billRequest/{tranRef}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('tranRef', payload.tranRef);
      httpRequest.setMethod('PUT');
      let bodyContent = { "billRequest": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: BillRequest, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billRequest/{tranRef}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('tranRef', payload.tranRef);
      httpRequest.setMethod('DELETE');

      let bodyContent = { "billRequest": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: BillRequest, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billRequest/{tranRef}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('tranRef', payload.tranRef);
      httpRequest.setMethod('PUT');

      let bodyContent = { "billRequest": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<BillRequestMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/billRequest');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BillRequestMaintanence>) => {
              return {
                data: res.body?.billRequest || [],
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
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/billRequest');
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
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource("/billRequest/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
