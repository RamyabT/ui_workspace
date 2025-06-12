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
 import { Biller, BillerMaintanence } from './biller.model';
@Injectable()
export class BillerService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Biller,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/biller');
      let bodyContent = {"biller":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Biller,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Biller|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/biller/{billerId}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('billerId', key.billerId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.biller , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Biller,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/biller/{billerId}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('billerId', payload.billerId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"biller":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Biller,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/biller/{billerId}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('billerId', payload.billerId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"biller":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Biller,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/biller/{billerId}');
      httpRequest.setContextPath('BillPayments');
       httpRequest.addPathParameter('billerId', payload.billerId);
     httpRequest.setMethod('PUT');
      let bodyContent = {"biller":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<BillerMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/biller');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BillerMaintanence>) =>{
             return{
              data:res.body?.biller || [],
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
    httpRequest.setResource('/biller');
    httpRequest.setContextPath('BillPayments');
    // httpRequest.addQueryParameter('lookup', 1);
    
    criteriaQuery.removeFilterCriteria('text');

    criteriaQuery.addFilterCritertia('category:groupCode', 'String', 'equals',{
      searchText : 'ALLBILLS'
    });

    if(key.searchText){
      criteriaQuery.addFilterCritertia('shortName','String','contains',{
        searchText : key.searchText
      })
    }

    // criteriaQuery.addFilterCritertia('category:groupCode','String','equals',{
    //   'searchText':'VANCITYBILLERS'
    // })

    // criteriaQuery.removeFilterCriteria('id');
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          res.body?.biller?.map((item:any) => item.id = item.billerId);
          return res.body?.biller || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource("/biller/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
