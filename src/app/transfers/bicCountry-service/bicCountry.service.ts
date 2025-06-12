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
import { BicCountry } from './bicCountry.model';

@Injectable({
  providedIn: 'root',
})
export class BicCountryService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }

  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: BicCountry, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<BicCountry | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/bicCountry/{countryCode}');
      httpRequest.addPathParameter('countryCode', key.countryCode);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.bicCountry ?? null), catchError((err: any) => {
          return of(null)
        }));
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery | undefined = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/bicCountry');
      httpRequest.setContextPath('Payments');
      // httpRequest.addQueryParameter('lookup', 1);
      const httpCriteria = new CriteriaQuery();
      httpRequest.setCriteriaQuery(criteriaQuery);
      // httpRequest.setCriteriaQuery(httpCriteria);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body?.bicCountry || [];
        })
      );
    };
  }


}


