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
import { Tasklog, TasklogMaintanence } from '../tasklog-service/tasklog.model';
import { Fbchoresdetails } from './fbchoresdetails.model';
import { Tasks } from '../tasks-service/tasks.model';
@Injectable({
  providedIn: 'root'
})
export class FbchoresdetailsService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
    create(payload: Fbchoresdetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/tasks');
        let bodyContent = {"tasks":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
 
  findByKey(key: Tasklog,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Tasklog|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tasklog/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.tasklog , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Tasklog,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tasklog/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tasklog":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Tasklog,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tasklog/{inventoryNumber}/{tenantId}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.addPathParameter('tenantId', payload.tenantId);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"tasklog":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Tasklog,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/tasklog/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
     httpRequest.setMethod('PUT');
      let bodyContent = {"tasklog":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
        return () => {
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/tasks');
          httpRequest.setMethod('GET');
          //httpRequest.addQueryParameter('childAccNo', 202500001985);
          httpRequest.setContextPath("Accounts");
          httpRequest.addHeaderParamter('serviceCode', 'RETAILTASKINFO');
          httpRequest.setCriteriaQuery(criteriaQuery);
          return this._httpProvider
            .invokeRestApi(httpRequest,httpOption)
            .pipe(
              map(
                (res: IHttpSuccessPayload<Fbchoresdetails>) =>{
                 return{
                  data:res.body.tasks || [],
                  totalRowCount:'30'
                  }
                }
              )
            );
        };
      }
  
  //  findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<Fbchoresdetails> {
  //   return () => {
  //     const httpRequest = new HttpRequest();
  //     httpRequest.setResource('/tasks');
  //     httpRequest.setMethod('GET');
  //     httpRequest.setCriteriaQuery(criteriaQuery);
  //     return this._httpProvider
  //       .invokeRestApi(httpRequest,httpOption)
  //       .pipe(
  //         map(
  //           (res: IHttpSuccessPayload<Fbchoresdetails>) =>{
  //            return{
  //             data:res.body.tasks || [],
  //             totalRowCount:res.headers.get('Totalrowcount')
  //             }
  //           }
  //         )
  //       );
  //   };
  // }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/tasklog');
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
      httpRequest.setResource("/tasklog/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
