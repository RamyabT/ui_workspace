import { Injectable, OnDestroy } from '@angular/core';
import { UserAuthService } from '@dep/services';
import {
  BaseFpxDataService,
  CreateFn,
  CriteriaQuery,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  HttpProviderService,
  IHttpSuccessPayload,
  FpxIHttpOption
} from '@fpx/core';

import {
  map,
  Observable,
  repeatWhen,
  skip,
  Subject,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RetailForgotpasswordService implements BaseFpxDataService<unknown>, OnDestroy {
  constructor(
    private _httpProvider: HttpProviderService,
    private _userAuth: UserAuthService
  ) {}

  ngOnDestroy(): void {
  }

  findByKey(payload: unknown): FindByKeyFn<unknown> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery): FindAllFn<unknown> {
    throw new Error('Method not implemented.');
  }
  // validateuser(payload: unknown,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
  //   return () => {
  //       const httpRequest = new HttpRequest();
  //       httpRequest.setContextPath('IAM');
  //       httpRequest.setMethod('POST');
  //       httpRequest.setResource('/depvalidateuser');
  //       httpRequest.setAuthTokenRequired(false);
  //       httpRequest.setBody(payload);
  //       return this._httpProvider.invokeRestApi(httpRequest,httpOption);
  //     };
  // }
  create(payload: unknown,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('IAM');
        httpRequest.setMethod('POST');
        httpRequest.setResource('/retail/forgotpassword');
        httpRequest.setAuthTokenRequired(false);
        httpRequest.setBody(payload);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
  }
  lookup(key: unknown): LookUpFn<unknown> {
    throw new Error('Method not implemented.');
  }

  modify(payload: unknown): ModifyFn<unknown> {
    throw new Error('Method not implemented.');
  }


}


