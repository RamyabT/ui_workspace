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
import { BicBranch } from './bicBranch.model';

@Injectable({
  providedIn: 'root',
})
export class BicBranchService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/bicBranch');
      httpRequest.setContextPath('Payments');
      // httpRequest.addQueryParameter('bankCode', criteriaQuery.getQueryparam('bankCode'));
      // httpRequest.addQueryParameter('countryCode', criteriaQuery.getQueryparam('countryCode'));
      httpRequest.setCriteriaQuery(criteriaQuery);
      const httpCriteria = new CriteriaQuery();
      httpRequest.setCriteriaQuery(httpCriteria);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body?.bicBranch || [];
        })
      );
    };
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: BicBranch, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<BicBranch | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/bicBranch/{branchCode}');
      httpRequest.addPathParameter('branchCode', key.branchCode);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.bicBranch ?? null), catchError((err: any) => {
          return of(null)
        }));
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: any): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/bicBranch');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      const httpCriteria = new CriteriaQuery();
      httpCriteria.setPaginationCriteria('1', 25);
      httpCriteria.addFilterCritertia('text', 'String', 'startsWith', {
        searchText: key.searchText ?? '',
      });
      httpRequest.setCriteriaQuery(httpCriteria);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }


}


