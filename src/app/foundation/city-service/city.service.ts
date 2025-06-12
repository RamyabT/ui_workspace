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

import { map, Observable, of,catchError } from 'rxjs';
import { City } from './city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService  implements BaseFpxDataService<any> {
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

   findByKey(key: City,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<City|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/city/{countryCode}/{stateCode}/{cityCode}');
       httpRequest.addPathParameter('countryCode', key.countryCode);
       httpRequest.addPathParameter('stateCode', key.stateCode);
       httpRequest.addPathParameter('cityCode', key.cityCode);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.city ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/city');
      httpRequest.addQueryParameter('lookup', 1);
      const httpCriteria = new CriteriaQuery();
      httpCriteria.setPaginationCriteria('1', 25);
      httpCriteria.addFilterCritertia('text', 'String', 'startsWith', {
        searchText: key.searchText ?? '',
      });
      httpRequest.setCriteriaQuery(httpCriteria);
      httpRequest.addQueryParameter('countryCode', key['countryCode']);
      if(key['stateCode']){
        httpRequest.addQueryParameter('stateCode', key['stateCode']);
      }
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }
 

}
 

