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
import { Notificationpref } from './notificationpref.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationprefService  implements BaseFpxDataService<any> {
  constructor(private _httpProvider : HttpProviderService) {}

  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/notificationpref');
      // httpRequest.setContextPath('')
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body?.notificationpref || [];
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

   findByKey(key: Notificationpref,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Notificationpref|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/notificationpref/{id}/{code}');
       httpRequest.addPathParameter('id', key.id);
       httpRequest.addPathParameter('code', key.code);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.notificationpref ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/notificationpref');
      // httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
 

}
 

