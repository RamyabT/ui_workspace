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
 import { Benedomestic, BenedomesticMaintanence } from './benedomestic.model';
@Injectable()
export class BenedomesticService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Benedomestic,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/benedomestic');
      httpRequest.setContextPath('Payments');
      let bodyContent = {"benedomestic":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Benedomestic,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Benedomestic|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/benedomestic/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode','RETAILBENEDOMESTICFETCHID')
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.benedomestic ?? null), map((res:any) => {
          return res ? {...res,  confirmAccountNumber:res.accountNumber} : null
            }));
      };
  }
  modify(payload: Benedomestic,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/benedomestic/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"benedomestic":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Benedomestic,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/benedomestic/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"benedomestic":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Benedomestic,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/benedomestic/{inventoryNumber}');
      httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"benedomestic":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(): FindAllFn<BenedomesticMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/benedomestic');
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('GET');
      // httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode','RETAILBENEDOMESTICFETCH')
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BenedomesticMaintanence>) =>{
             return{
              data:res.body?.benedomestic || [],
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
    httpRequest.setResource('/benedomestic');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setContextPath('Payments');
    httpRequest.setCriteriaQuery(criteriaQuery);
    httpRequest.addQueryParameter('customerCode', key['customerCode']);
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
      httpRequest.setResource("/benedomestic/statistics");
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
