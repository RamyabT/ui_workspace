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
 import { Delegateuser, DelegateuserMaintanence } from './delegateuser.model';
@Injectable()
export class DelegateuserService implements BaseFpxDataService<any> {
    refreshManageDeleSub$ = new EventEmitter<Delegateuser | null>();
  
 constructor(private _httpProvider : HttpProviderService) { }

 refreshManageDelegate(dele: Delegateuser) {
     this.refreshManageDeleSub$.emit(dele);
   }

  create(payload: Delegateuser,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/delegateuser');
      let bodyContent = {"delegateuser":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Delegateuser,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Delegateuser|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/delegateuser/{tenantId}/{userName}');
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.addPathParameter('userName', key.userName);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.delegateuser , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,} : null
        }));
        
    };
  }
  modify(payload: Delegateuser,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/delegateuser/{tenantId}/{userName}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userName', payload.userName);
     httpRequest.setMethod('PUT');
      let bodyContent = {"delegateuser":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Delegateuser,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/delegateuser/{tenantId}/{userName}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userName', payload.userName);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"delegateuser":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Delegateuser,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/delegateuser/{tenantId}/{userName}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.addPathParameter('userName', payload.userName);
     httpRequest.setMethod('PUT');
      let bodyContent = {"delegateuser":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DelegateuserMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/delegateuser');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DelegateuserMaintanence>) =>{
             return{
              data:res.body?.delegateuser || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/delegateuser');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/delegateuser/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  deleteDelegate(payload:any): Observable<any> {
    //   let userName = this.selectedData.userName;
    const httpRequest = new HttpRequest();
    httpRequest.setContextPath('Common');
    httpRequest.setResource('/delegateuser');
    //  httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
    httpRequest.setMethod('POST');
    let bodyContent = { "delegateuser": payload };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest);
  }  

  getSystemAdminToken(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setContextPath('Common');
    httpRequest.setResource('/systemadmintoken');
    httpRequest.setMethod('GET');
    return this._httpProvider.invokeRestApi(httpRequest);
  }  

  
}
