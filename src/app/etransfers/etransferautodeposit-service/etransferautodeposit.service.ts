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
 import { Etransferautodeposit, EtransferautodepositMaintanence } from './etransferautodeposit.model';
@Injectable()
export class EtransferautodepositService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Etransferautodeposit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/etransferautodeposit');
      httpRequest.setContextPath('Payments');
      let bodyContent = {"etransferautodeposit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Etransferautodeposit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Etransferautodeposit|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransferautodeposit/{tenantId}/{customerCode}');
       httpRequest.addPathParameter('tenantId', key.tenantId);
       httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('customerCode', key.customerCode);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.etransferautodeposit , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
          return res ? {...res,  depositAccount:res.depositAccount?.tenantId,} : null
        }));
        
    };
  }
  modify(payload: Etransferautodeposit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransferautodeposit/{tenantId}/{customerCode}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('customerCode', payload.customerCode);
     httpRequest.setMethod('PUT');
      let bodyContent = {"etransferautodeposit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Etransferautodeposit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransferautodeposit/{tenantId}/{customerCode}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('customerCode', payload.customerCode);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"etransferautodeposit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Etransferautodeposit,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransferautodeposit/{tenantId}/{customerCode}');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
       httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('customerCode', payload.customerCode);
     httpRequest.setMethod('PUT');
      let bodyContent = {"etransferautodeposit":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<EtransferautodepositMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransferautodeposit');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode','GETETRFAUTODEPOSIT');
      httpRequest.setContextPath('Payments');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<EtransferautodepositMaintanence>) =>{
             return{
              data:res.body?.etransferautodeposit || [],
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
    httpRequest.setResource('/etransferautodeposit');
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
      httpRequest.setResource("/etransferautodeposit/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
