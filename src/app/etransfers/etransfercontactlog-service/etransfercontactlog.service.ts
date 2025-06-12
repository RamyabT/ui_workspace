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
import { map, Observable, of, catchError, Subject } from 'rxjs';
import { Etransfercontactlog, EtransfercontactlogMaintanence } from './etransfercontactlog.model';
@Injectable()
export class EtransfercontactlogService implements BaseFpxDataService<any> {
    manageBeneCount = new Subject<number>();
    favBeneCount: number = 0;
    beneCount: number = 0;
    refreshManageBeneSub$ = new EventEmitter<Etransfercontactlog | null>();
    
  constructor(private _httpProvider: HttpProviderService) { }
    setManageBeneCount(count: number){
      this.manageBeneCount.next(count); 
    }
    refreshManageBeneficiary(bene: Etransfercontactlog) {
      this.refreshManageBeneSub$.emit(bene);
    }
  create(payload: Etransfercontactlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/etransfercontactlog');
      httpRequest.setContextPath('Payments');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILETRANSFERMANAGECONTACT')
      let bodyContent = { "etransfercontactlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Etransfercontactlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Etransfercontactlog | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercontact/{beneId}');
      httpRequest.addPathParameter('beneId', key.beneId);
      httpRequest.addHeaderParamter('serviceCode', 'GETETRFCONTACTREG')
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Payments');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.etransfercontact, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }));

    };
  }
  modify(payload: Etransfercontactlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      //   const httpRequest = new HttpRequest();
      //   httpRequest.setResource('/etransfercontactlog/{tenantId}/{inventoryNumber}');
      //    httpRequest.addPathParameter('tenantId', payload.tenantId);
      //    httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      //  httpRequest.setMethod('PUT');
      //   httpRequest.setContextPath('Payments');
      //   let bodyContent = {"etransfercontactlog":payload};
      //   httpRequest.setBody(bodyContent);
      //   return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/etransfercontactlog');
      httpRequest.setContextPath('Payments');
      let bodyContent = { "etransfercontactlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Etransfercontactlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercontactlog/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('DELETE');
      httpRequest.setContextPath('Payments');
      let bodyContent = { "etransfercontactlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Etransfercontactlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercontactlog/{tenantId}/{inventoryNumber}');
      httpRequest.addPathParameter('tenantId', payload.tenantId);
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('PUT');
      httpRequest.setContextPath('Payments');
      let bodyContent = { "etransfercontactlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<EtransfercontactlogMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercontact');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'GETALLETRFCONTACTREG')
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Payments');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<EtransfercontactlogMaintanence>) => {
              this.beneCount = res.body?.etransfercontact?.length?res.body?.etransfercontact?.length: 0;
              this.favBeneCount = res.body?.etransfercontact?.filter(x=> x.isFavourite == '1')?.length || 0;
              return {
                data: res.body?.etransfercontact || [],
                totalRowCount: res.headers.get('Totalrowcount'),
                totalFavRowCount:res.headers.get('isfavtotalrowcount')
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
      httpRequest.setResource('/etransfercontactlog');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.addHeaderParamter('serviceCode', 'GETALLETRFCONTACTREG')
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Payments');
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
      httpRequest.setResource("/etransfercontactlog/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Payments');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
