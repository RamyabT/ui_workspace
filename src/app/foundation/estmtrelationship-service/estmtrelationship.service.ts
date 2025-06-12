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
import { Estmtrelationship } from './estmtrelationship.model';

@Injectable({
  providedIn: 'root',
})
export class EstmtrelationshipService  implements BaseFpxDataService<any> {
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

   findByKey(key: Estmtrelationship,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<string|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/estmtrelationship/{relationshipCode}');
       httpRequest.addPathParameter('relationshipCode', key.relationshipCode);
       httpRequest.setContextPath('Accounts');
       httpRequest.addHeaderParamter('serviceCode', 'RETAILESTMTRELATIONSHIPDTL');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
     .pipe(
        map((res: IHttpSuccessPayload<any>) =>
        res.body ?? null)
      );
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/estmtrelationship');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.addHeaderParamter('serviceCode', 'RETAILESTMTRELATIONSHIP');
      httpRequest.setContextPath('Accounts');
      // httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
 

}
 

