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
import { Membership } from './membership.model';

@Injectable()
export class MembershipService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/membership');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      httpRequest.setContextPath('Membership');
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Membership|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setContextPath('Membership');
       httpRequest.addHeaderParamter('serviceCode','RETAILLOANDETAILS')
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.membership , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Membership');
     httpRequest.setMethod('PUT');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Membership');
     httpRequest.setMethod('DELETE');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Membership,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/membership/{accountNumber}');
       httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Membership');
     httpRequest.setMethod('PUT');
      let bodyContent = {"membership":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/membership');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Membership');
    httpRequest.setContextPath('Membership');
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }

  fetchMembership(): Observable<Membership[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/membership');
    httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILMEMBERSHIPSUMM');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.membership;
      })
    );
  }
  
}
