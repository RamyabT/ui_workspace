import { HttpErrorResponse } from '@angular/common/http';
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
  FpxIHttpOption,
  IHttpErrorPayload
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';

import { map, Observable, of,catchError } from 'rxjs';

@Injectable()
export class DebitCardServices implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
 create(payload: any): CreateFn<any> {
  throw new Error('Method not implemented.');
}

  findByKey(key: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<|null> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   delete(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   patch(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    throw new Error('Method not implemented.');
  }

   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }

  fetchDebitCardLimits(productCode:any,cardRefNumber:any){
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("productcode",productCode)
    httpRequest.addPathParameter("cardref",cardRefNumber)
      httpRequest.setResource("/debitcard/{cardref}/product/{productcode}/limits");
     httpRequest.setMethod("GET");

      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
              return of(err ?? null)
            }));

  }
}
