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
import { map, Observable, of, catchError, tap } from 'rxjs';
import { Preloginverifytfa, PreloginverifytfaMaintanence } from './preloginverifytfa.model';
import { UserAuthService } from '@dep/services';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';

@Injectable()
export class PreloginverifytfaService implements BaseFpxDataService<any> {
  constructor(
    private _httpProvider: HttpProviderService,
    private _userAuth: UserAuthService,
    private _testLoginService: TestLoginService
  ) { }
  create(payload: Preloginverifytfa, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/preloginverifytfa');
      let bodyContent = { "preloginverifytfa": payload };
      httpRequest.setContextPath('IAM');
      httpRequest.setBody(bodyContent);
      // return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }

  findByKey(key: Preloginverifytfa, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Preloginverifytfa | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/preloginverifytfa');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.preloginverifytfa, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }), catchError((err: any) => {
          return of(null)
        }));

    };
  }
  modify(payload: Preloginverifytfa, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/preloginverifytfa');
      httpRequest.setMethod('PUT');
      let bodyContent = { "preloginverifytfa": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Preloginverifytfa, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/preloginverifytfa');
      httpRequest.setMethod('DELETE');
      let bodyContent = { "preloginverifytfa": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Preloginverifytfa, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/preloginverifytfa');
      httpRequest.setMethod('PUT');
      let bodyContent = { "preloginverifytfa": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<PreloginverifytfaMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/preloginverifytfa');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<PreloginverifytfaMaintanence>) => {
              return {
                data: res.body?.preloginverifytfa || [],
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
      httpRequest.setResource('/preloginverifytfa');
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
      httpRequest.setResource("/preloginverifytfa/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
