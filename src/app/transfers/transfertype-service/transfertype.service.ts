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
import { Transfertype } from './transfertype.model';

@Injectable({
  providedIn: 'root',
})
export class TransfertypeService  implements BaseFpxDataService<any> {
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

   findByKey(key: Transfertype,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Transfertype|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/transfertype/{lovId}/{code}');
       httpRequest.addPathParameter('lovId', key.lovId);
       httpRequest.addPathParameter('code', key.code);
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Payments');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.transfertype ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/transfertype');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setContextPath('Payments');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }
 

}
 

