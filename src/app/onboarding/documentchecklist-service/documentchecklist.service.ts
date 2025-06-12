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
//  import {  ProdAllowedDocs } from '../../referencedata/prodAllowedDocs-input-grid/prodAllowedDocs-input-grid.model';
import { Documentchecklist, DocumentchecklistMaintanence } from './documentchecklist.model';
import { AppConfigService } from '@dep/services';
@Injectable()
export class DocumentchecklistService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService, private _appConfig: AppConfigService) { }
  create(payload: Documentchecklist,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/documentchecklist');
      httpRequest.setContextPath('Customers');
      let bodyContent = {"documentchecklist":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Documentchecklist,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Documentchecklist|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/documentchecklist/{productCode}');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.documentchecklist , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Documentchecklist,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/documentchecklist/{tenantId}');
      httpRequest.setContextPath('Customers');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"documentchecklist":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Documentchecklist,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/documentchecklist/{tenantId}');
      httpRequest.setContextPath('Customers');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"documentchecklist":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Documentchecklist,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/documentchecklist/{tenantId}');
      httpRequest.setContextPath('Customers');
       httpRequest.addPathParameter('tenantId', payload.tenantId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"documentchecklist":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DocumentchecklistMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/documentchecklist');
      httpRequest.setContextPath('Customers');
      httpRequest.setMethod('GET');
      
      // criteriaQuery.addFilterCritertia

      criteriaQuery.addFilterCritertia('prodId', 'String', 'equals', {
        searchText: this._appConfig.getData('cobproductdls').productId
      });
      criteriaQuery.addFilterCritertia('applnCode', 'String', 'equals', {
        searchText: 'DEPRETAIL'
      });
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DocumentchecklistMaintanence>) =>{
             return{
              data:res.body?.documentchecklist || [],
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
    httpRequest.setResource('/documentchecklist');
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
      httpRequest.setResource("/documentchecklist/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
